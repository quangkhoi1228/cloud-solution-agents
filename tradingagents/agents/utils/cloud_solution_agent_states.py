from typing import Annotated, Sequence
from datetime import date, timedelta, datetime
from typing_extensions import TypedDict, Optional
from langchain_openai import ChatOpenAI
from tradingagents.agents import *
from langgraph.prebuilt import ToolNode
from langgraph.graph import END, StateGraph, START, MessagesState


class ChatHistory(TypedDict):
    sender: Annotated[str, "Agent name or user that sent this message"]
    content: Annotated[str, "Message content"]
    timestamp: Annotated[datetime, "Timestamp of the message"]
    to: Annotated[list[str], "Agent name or user that received this message"]
    status: Annotated[str, "Status of the message"]
    

class CloudSolutionAgentState(MessagesState):
    max_user_question: Annotated[int, "Maximum number of user questions"]
    chat_history: Annotated[list[ChatHistory], "Chat history"]
    current_user_question: Annotated[int, "Current user question"]
    user_requirements: Annotated[str, "User requirements"]
    folder_path: Annotated[str, "Folder path"]
    interupt: Annotated[bool, "Interupt"]
    ask_user_question: Annotated[str, "Ask user question"]
    solution_architect_report: Annotated[str, "Solution architect report"]

