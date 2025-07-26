from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import time
import json
from langgraph.types import Command, interrupt

from langchain_core.messages import AIMessage
from langchain_core.messages import HumanMessage, AIMessage, messages_to_dict, messages_from_dict

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file


def create_delivery_manager(llm, toolkit):
    def delivery_manager_node(state):

        # if "document_manager_report" in state and state["document_manager_report"]:
        #     create_file(
        #         f"{state['folder_path']}/document_manager_report.md", state["document_manager_report"])
        #     return {
        #         "messages": [AIMessage(content="Đã có thông tin tài liệu cho khách hàng")],
        #         "document_manager_report": state["document_manager_report"],
        #     }

        tools = [
            # toolkit.create_project_folder,
        ]

        final_proposal = state["final_proposal"]
        user_requirements = state["user_requirements"]

        system_message = f"""Bạn là một chuyên gia triển khai dự án Delivery Manager tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
Nhiệm vụ của bạn là:
    Hãy đọc kỹ nội dung proposal bên dưới với mục tiêu:
    - Đảm bảo giải pháp đưa ra có thể triển khai được và đủ yêu cầ của khách hàng.
    - Đảm bảo định dạng, cấu trúc, cách trình bày dễ hiểu, chuyên nghiệp.
    - Đảm bảo có đầy đủ các thành phần thiết yếu: mô tả hệ thống, kiến trúc triển khai, tài nguyên sử dụng, chi phí (nếu có), ràng buộc, giả định,...
    - Sau khi đánh giá, hãy trả về thông tin theo format with 2 keys:
        result: boolean, (true là đáp ứng, false là không đáp ứng)
        comment: "Ghi chú ngắn gọn nếu có khuyến nghị bổ sung nhẹ.
    
    - Hãy sử dụng văn phong chuyên nghiệp, ngắn gọn và rõ ràng trong phản hồi của bạn.

INPUT:
- Proposal: {final_proposal}
- Yêu cầu khách hàng: {user_requirements}



# Important:
- Output hoàn toàn là tiếng Việt và là json format
- Không đưa các thông tin ngoài vào như giới thiệu"""

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    system_message,

                ),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        prompt = prompt.partial(tool_names=", ".join(
            [tool.name for tool in tools]))

        chain = prompt | llm.bind_tools(tools)
        result = chain.invoke(state["messages"])

        # print("state project manager: ", state)
        # print("result: ", result.pretty_print())
        report = ""

        # print("result.content: ", result.content, type(result.content))
        feedback = json.loads(result.content)

        if not feedback["result"]:
            report = feedback["comment"]
        else:
            print(f"Proposal đã đáp ứng yêu cầu của khách hàng: {state['folder_path']}/final_proposal.md")

        create_file(
            f"{state['folder_path']}/delivery_manager_report.md", report)

        return {
            "messages": [report],
            "final_acceptance": feedback["result"],
            "delivery_manager_report": report,
            "next": "__end__" if feedback["result"] else "Solution-Architect"
        }

    return delivery_manager_node
