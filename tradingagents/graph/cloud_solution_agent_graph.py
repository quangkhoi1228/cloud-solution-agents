# TradingAgents/graph/trading_graph.py

import os
from pathlib import Path
import json
from datetime import date
from typing import Dict, Any, Tuple, List, Optional

from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI

from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage
from langchain_core.messages import HumanMessage, AIMessage, messages_to_dict, messages_from_dict

from tradingagents.agents import *
from tradingagents.agents.utils.cloud_solution_agents_memory import CloudSolutionAgentsMemory
from tradingagents.default_config import DEFAULT_CONFIG
from tradingagents.agents.utils.memory import FinancialSituationMemory
from tradingagents.agents.utils.agent_states import (
    AgentState,
    InvestDebateState,
    RiskDebateState,
)
from tradingagents.dataflows.interface import set_config
from tradingagents.graph.cloud_solution_agent_conditional_logic import CloudSolutionAgentConditionalLogic

from .conditional_logic import ConditionalLogic
from .setup import GraphSetup
from .propagation import Propagator
from .reflection import Reflector
from .signal_processing import SignalProcessor


class CloudSolutionAgentsGraph:
    """Main class that orchestrates the trading agents framework."""

    def __init__(
        self,
        debug=False,
        config: Dict[str, Any] = None,
    ):
        """Initialize the trading agents graph and components.

        Args:
            debug: Whether to run in debug mode
            config: Configuration dictionary. If None, uses default config
        """
        self.debug = debug
        self.config = config or DEFAULT_CONFIG

        # Update the interface's config
        set_config(self.config)

        # Create necessary directories
        os.makedirs(
            os.path.join(self.config["project_dir"], "dataflows/data_cache"),
            exist_ok=True,
        )

        # Initialize LLMs
        if self.config["llm_provider"].lower() == "openai" or self.config["llm_provider"] == "ollama" or self.config["llm_provider"] == "openrouter":
            self.deep_thinking_llm = ChatOpenAI(
                model=self.config["deep_think_llm"], base_url=self.config["backend_url"])
            self.quick_thinking_llm = ChatOpenAI(
                model=self.config["quick_think_llm"], base_url=self.config["backend_url"])
        elif self.config["llm_provider"].lower() == "anthropic":
            self.deep_thinking_llm = ChatAnthropic(
                model=self.config["deep_think_llm"], base_url=self.config["backend_url"])
            self.quick_thinking_llm = ChatAnthropic(
                model=self.config["quick_think_llm"], base_url=self.config["backend_url"])
        elif self.config["llm_provider"].lower() == "google":
            self.deep_thinking_llm = ChatGoogleGenerativeAI(
                model=self.config["deep_think_llm"])
            self.quick_thinking_llm = ChatGoogleGenerativeAI(
                model=self.config["quick_think_llm"])
        else:
            raise ValueError(
                f"Unsupported LLM provider: {self.config['llm_provider']}")

        self.toolkit = Toolkit(config=self.config)

        # Initialize memories
        self.pre_sale_memory = CloudSolutionAgentsMemory(
            "pre_sale_memory", self.config)

        # Create tool nodes
        self.tool_nodes = self._create_tool_nodes()

        # Initialize components
        self.conditional_logic = CloudSolutionAgentConditionalLogic()
        self.graph_setup = GraphSetup(
            self.quick_thinking_llm,
            self.deep_thinking_llm,
            self.toolkit,
            self.tool_nodes,
            self.pre_sale_memory,
            self.conditional_logic,
        )

        self.propagator = Propagator()
        # self.reflector = Reflector(self.quick_thinking_llm)
        self.signal_processor = SignalProcessor(self.quick_thinking_llm)

        # State tracking
        self.curr_state = None
        self.log_states_dict = {}  # date to full state dict

        # Set up the graph
        self.graph = self.graph_setup.setup_graph()

    def _create_tool_nodes(self) -> Dict[str, ToolNode]:
        """Create tool nodes for different data sources."""
        return {
            "market": ToolNode(
                [
                    # online tools
                    self.toolkit.get_YFin_data_online,
                    self.toolkit.get_stockstats_indicators_report_online,
                    # offline tools
                    self.toolkit.get_YFin_data,
                    self.toolkit.get_stockstats_indicators_report,
                ]
            ),
            "social": ToolNode(
                [
                    # online tools
                    self.toolkit.get_stock_news_openai,
                    # offline tools
                    self.toolkit.get_reddit_stock_info,
                ]
            ),
            "news": ToolNode(
                [
                    # online tools
                    self.toolkit.get_global_news_openai,
                    self.toolkit.get_google_news,
                    # offline tools
                    self.toolkit.get_finnhub_news,
                    self.toolkit.get_reddit_news,
                ]
            ),
            "fundamentals": ToolNode(
                [
                    # online tools
                    self.toolkit.get_fundamentals_openai,
                    # offline tools
                    self.toolkit.get_finnhub_company_insider_sentiment,
                    self.toolkit.get_finnhub_company_insider_transactions,
                    self.toolkit.get_simfin_balance_sheet,
                    self.toolkit.get_simfin_cashflow,
                    self.toolkit.get_simfin_income_stmt,
                ]
            ),
            "pre_sale": ToolNode(
                [
                ]
            ),
        }

    def propagate(self, user_requirements, store_state=None):
        """Run the trading agents graph for a company on a specific date."""

        self.user_requirements = user_requirements

        # Initialize state
        if store_state:
            # Decode
            with open(f"eval_results/cloud-solution-agents/{store_state}", "r", encoding="utf-8") as f:
                data = json.load(f)
            
            data['messages'] = messages_from_dict(data['messages'])
            init_agent_state = data
        else:
            init_agent_state = self.propagator.create_initial_state(
                user_requirements)
        args = self.propagator.get_graph_args()

        if self.debug:
            # Debug mode with tracing
            trace = []
            for chunk in self.graph.stream(init_agent_state, **args):

                if len(chunk["messages"]) == 0:
                    pass
                else:
                    chunk["messages"][-1].pretty_print()
                    trace.append(chunk)
                    print("chunk: ", chunk)
                    print("state: ", init_agent_state)

            final_state = trace[-1]
        else:
            # Standard mode without tracing
            final_state = self.graph.invoke(init_agent_state, **args)

        # Store current state for reflection
        self.curr_state = final_state

        # Log state
        self._log_state(final_state)

        # Return decision and processed signal
        return final_state

    def _log_state(self, final_state):
        """Log the final state to a JSON file."""
        print("final_state: ", final_state)
        encoded_messages = messages_to_dict(final_state["messages"])

        self.log_states_dict = {
            # "max_user_question": final_state["max_user_question"] if "max_user_question" in final_state else 1,
            # "current_user_question": final_state["current_user_question"] if "current_user_question" in final_state else 0,
            "user_requirements": final_state["user_requirements"] if "user_requirements" in final_state else "",
            "folder_path": final_state["folder_path"] if "folder_path" in final_state else "",
            "messages": encoded_messages,
             # "pre_sale_report": final_state["pre_sale_report"],
        }

        # Save to file
        directory = Path(
            f"eval_results/cloud-solution-agents/")
        directory.mkdir(parents=True, exist_ok=True)

        with open(
            f"eval_results/cloud-solution-agents/full_states_log_{date.today()}.json",
            "w", encoding="utf-8"
        ) as f:
            json.dump(self.log_states_dict, f, ensure_ascii=False, indent=4)

    def reflect_and_remember(self):
        """Reflect on decisions and update memory based on returns."""

    def process_signal(self, full_signal):
        """Process a signal to extract the core decision."""
        return self.signal_processor.process_signal(full_signal)
