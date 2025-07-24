# TradingAgents/graph/propagation.py

from datetime import datetime
from typing import Dict, Any
from tradingagents.agents.utils.agent_states import (
    AgentState,
    InvestDebateState,
    RiskDebateState,
)


class Propagator:
    """Handles state initialization and propagation through the graph."""

    def __init__(self, max_recur_limit=100):
        """Initialize with configuration parameters."""
        self.max_recur_limit = max_recur_limit

    def create_initial_state(
        self, user_requirements: str
    ) -> Dict[str, Any]:
        """Create the initial state for the agent graph."""
        return {
            "messages": [("human", user_requirements)],
            "max_user_question": 1,
            "user_requirements": "",
            "folder_path": "",
            "chat_history": [
                {
                    "sender": "user",
                    "content": user_requirements,
                    "timestamp": datetime.now(),
                    "to": ["Pre-Sale"],
                    "status": "pending"
                }],
        }

    def get_graph_args(self) -> Dict[str, Any]:
        """Get arguments for the graph invocation."""
        return {
            "stream_mode": "values",
            "config": {"recursion_limit": self.max_recur_limit},
        }
