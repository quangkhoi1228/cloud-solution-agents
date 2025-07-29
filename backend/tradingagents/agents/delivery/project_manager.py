from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import time
import json
from langgraph.types import Command, interrupt

from langchain_core.messages import AIMessage

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file


def create_project_manager(llm, toolkit):
    def project_manager_node(state):

        if "project_manager_report" in state and state["project_manager_report"]:
            create_file(
                f"{state['folder_path']}/project_manager_report.md", state["project_manager_report"])
            return {
                "messages": [],
                "project_manager_report": state["project_manager_report"],
                "next": "Sale"
            }

        tools = [
            # toolkit.create_project_folder,
        ]
        
        solution_architect_report = state["solution_architect_report"]


        system_message = f"""Bạn là một chuyên gia quản lý dự án hạ tầng Project Manager tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
Nhiệm vụ của bạn là:
    - Phân tích nội dung mô tả đó để xác định các task chính,
        - Lập bảng kế hoạch triển khai chi tiết gồm các cột:
        - Tên task
        - Mô tả
        - PIC (Khách hàng hoặc FCI)
        - Support (nếu có, là KH hoặc FCI)
        - Duration (ngày)
        - Ghi chú (nếu cần)
    - Tổng hợp Tổng thời gian dự kiến của toàn bộ kế hoạch.
        - Hãy trình bày kết quả thành bảng, kèm theo phần tổng thời gian cuối cùng.
        - Nếu có các bước có thể triển khai song song, hãy ghi chú rõ để tối ưu thời gian thực hiện.
    
YÊU CẦU
- Nội dung mô tả giải pháp đề xuất: {solution_architect_report}

    
OUTPUT VÍ DỤ:


## Kế hoạch triển khai
    | STT | Tên Task                     | Mô tả                                                                       | PIC | Support | Duration (ngày) | Ghi chú                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng           |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP, firewall, SSH                             | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 4       | Thiết lập bảo mật & giám sát     | Thiết lập security group, cấu hình backup, monitor VM                           | FCI     | -           | 1                   | Có thể dùng dịch vụ Monitor/Backup    |

## Tổng thời gian dự kiến
15 ngày (có thể giảm xuống ~10–12 ngày nếu thực hiện song song các bước như 3–4–5 hoặc 6–7).

# Important:
- Output hoàn toàn là tiếng Việt
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

        if len(result.tool_calls) == 0:
            report = result.content
            
        create_file(f"{state['folder_path']}/project_manager_report.md", report)
            
        return {
            "messages": [result],
            "project_manager_report": report,
            "next": "Sale"
        }

    return project_manager_node
