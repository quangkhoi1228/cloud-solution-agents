# TradingAgents/graph/setup.py

from typing import Dict, Any
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph, START
from langgraph.prebuilt import ToolNode, tools_condition

from tradingagents.agents import *
from tradingagents.agents.delivery.pre_sale import create_pre_sale

from tradingagents.agents.delivery.project_manager import create_project_manager
from tradingagents.agents.delivery.sale import create_sale
from tradingagents.agents.delivery.solution_architect import create_solution_architect
from tradingagents.agents.utils.agent_utils import Toolkit
from tradingagents.agents.utils.cloud_solution_agent_states import CloudSolutionAgentState
from tradingagents.agents.utils.cloud_solution_agents_memory import CloudSolutionAgentsMemory
from tradingagents.dataflows.interface import create_project_folder, get_user_info
from tradingagents.graph.cloud_solution_agent_conditional_logic import CloudSolutionAgentConditionalLogic

from .conditional_logic import ConditionalLogic


class GraphSetup:
    """Handles the setup and configuration of the agent graph."""

    def __init__(
        self,
        quick_thinking_llm: ChatOpenAI,
        deep_thinking_llm: ChatOpenAI,
        toolkit: Toolkit,
        tool_nodes: Dict[str, ToolNode],
        pre_sale_memory,
        conditional_logic: CloudSolutionAgentConditionalLogic,
    ):
        """Initialize with required components."""
        self.quick_thinking_llm = quick_thinking_llm
        self.deep_thinking_llm = deep_thinking_llm
        self.toolkit = toolkit
        self.tool_nodes = tool_nodes
        self.pre_sale_memory = pre_sale_memory
        self.conditional_logic = conditional_logic

    def setup_graph(
        self
    ):
        """Set up and compile the agent workflow graph.

        Args:
            selected_analysts (list): List of analyst types to include. Options are:

        """

        # Create researcher and manager nodes
        pre_sale_node = create_pre_sale(
            self.quick_thinking_llm, self.toolkit
        )

        solution_architect_node = create_solution_architect(
            self.quick_thinking_llm, self.toolkit
        )
        
        project_manager_node = create_project_manager(
            self.quick_thinking_llm, self.toolkit
        )
        
        sale_node = create_sale(
            self.quick_thinking_llm, self.toolkit
        )

        # Create workflow
        workflow = StateGraph(CloudSolutionAgentState)

        # Add analyst nodes to the graph
        workflow.add_edge(START, "Pre-Sale")
        workflow.add_node("Pre-Sale", pre_sale_node)
        workflow.add_node("Solution-Architect", solution_architect_node)
        workflow.add_node("Project-Manager", project_manager_node)
        workflow.add_node("Sale", sale_node)
        
        workflow.add_node("create_project_folder", create_project_folder)
        workflow.add_conditional_edges(
            "Pre-Sale",
            self.conditional_logic.should_continue_pre_sale,
            {
                "create_project_folder": "create_project_folder",
                "Solution-Architect": "Solution-Architect"
            }
        )
        workflow.add_edge("create_project_folder", "Pre-Sale")
        workflow.add_edge("Solution-Architect", "Project-Manager")
        workflow.add_edge("Project-Manager", "Sale")
        
        workflow.add_edge("Sale", END)

        # Define edges

        # Compile and return
        return workflow.compile()
