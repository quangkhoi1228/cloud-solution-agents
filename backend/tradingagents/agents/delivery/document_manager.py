from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file


def create_document_manager(llm, toolkit):
    def document_manager_node(state):

        if "final_proposal" in state and state["final_proposal"]:
            create_file(
                f"{state['folder_path']}/final_proposal.md", state["final_proposal"])
            return {
                "messages": [],
                "final_proposal": state["final_proposal"],
                "next": "Delivery-Manager"
            }

        tools = [
            # toolkit.create_project_folder,
        ]
        
        user_requirements = state["user_requirements"]
        solution_architect_report = state["solution_architect_report"]
        sale_report = state["sale_report"]
        project_manager_report = state["project_manager_report"]


        system_message = f"""Bạn là một chuyên gia tổng hợp tài liệu Document Manager tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
Nhiệm vụ của bạn là:
    - Dựa vào các tài liệu đã có, tổng hợp thành tài liệu đầy đủ cho khách hàng.
    
        
OUTPUT: là một tài liệu đầy đủ nội dung tổng hợp từ các thành phần sau:
    - Tiêu đề: Tiêu đề ngắn gọn của dự án tối đa 7 từ. Ví dụ: "Dự án chuyển đổi on-premise lên FPT Smart Cloud"
    - Section 1: Yêu cầu khách hàng  {user_requirements}
    - Section 2: Giải pháp đề xuất  {solution_architect_report}
    - Section 3: Kế hoạch triển khai {project_manager_report}
    - Section 4: Bảng giá dự kiến  {sale_report}


# Important:
- Output hoàn toàn là tiếng Việt và là 1 bản proposal hoàn chỉnh
- Format lại tài liệu theo markdown và chú ý title level các section
- Không đưa các thông tin ngoài vào như giới thiệu, hỏi thêm, đệm. 
- Phần giải pháp đề xuất không điền phần "Danh sách sản phẩm sử dụng (BOM)" do trùng với section "Bảng giá dự kiến" bên dưới
"""

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

        if len(result.tool_calls) == 0:
            report = result.content
            
        create_file(f"{state['folder_path']}/final_proposal.md", report)
            
        return {
            "messages": [result],
            "final_proposal": report,
            "next": "Delivery-Manager"
        }

    return document_manager_node
