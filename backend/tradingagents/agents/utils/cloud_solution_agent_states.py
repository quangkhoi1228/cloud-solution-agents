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


class ProposalPart(TypedDict):
    id: Annotated[str, "Id of the proposal part"]
    title: Annotated[str, "Title of the proposal part: Tiêu đề, Yêu cầu, Yêu cầu chi tiết từ khách hàng, Giải pháp đề xuất, Phương án chuyển đổi, Mô tả, Kế hoạch triển khai,..."]
    content: Annotated[str, "Content of the proposal part"]
    level: Annotated[int, "Level of the proposal part: h1, h2, h3"]
    content_type: Annotated[str, "Content type: text, table, mermaid"]


class CloudSolutionAgentState(MessagesState):
    max_user_question: Annotated[int, "Maximum number of user questions"]
    chat_history: Annotated[list[ChatHistory], "Chat history"]
    current_user_question: Annotated[int, "Current user question"]
    user_requirements: Annotated[str, "User requirements"]
    folder_path: Annotated[str, "Folder path"]
    interupt: Annotated[bool, "Interupt"]
    ask_user_question: Annotated[str, "Ask user question"]
    solution_architect_report: Annotated[str, "Solution architect report"]
    project_manager_report: Annotated[str, "Project manager report"]
    sale_report: Annotated[str, "Sale report"]
    delivery_manager_report: Annotated[str, "Delivery manager report"]
    final_proposal: Annotated[str, "Final proposal"]
    final_proposal_parts: Annotated[list[ProposalPart], "Final proposal parts"]
    final_acceptance: Annotated[bool, "Final acceptance"]
    next: Annotated[str, "Next member"]
