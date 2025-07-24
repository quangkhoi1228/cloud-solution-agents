# TradingAgents/graph/conditional_logic.py

from tradingagents.agents.utils.cloud_solution_agent_states import CloudSolutionAgentState


class CloudSolutionAgentConditionalLogic:
    """Handles conditional logic for determining graph flow."""

    def __init__(self,  max_user_question=1):
        """Initialize with configuration parameters."""
        self.max_user_question = max_user_question
    def should_continue_pre_sale(self, state: CloudSolutionAgentState):
        """Determine if pre-sale should continue."""
        messages = state["messages"]
        last_message = messages[-1]
        print("state pre-sale:1 ", state)
        if 'folder_path' in state and state['folder_path']:
            return "Solution-Architect"
        return "create_project_folder"
    
    def should_continue_solution_architect(self, state: CloudSolutionAgentState):
        """Determine if solution architect should continue."""
        messages = state["messages"]
        last_message = messages[-1]
        if last_message.tool_calls:
            return "tools_solution_architect"
        return "Solution-Architect"