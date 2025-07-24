from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import time
import json
from langgraph.types import Command, interrupt

from langchain_core.messages import AIMessage

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file


def create_pre_sale(llm, toolkit):
    def pre_sale_node(state):

        if state["user_requirements"]:

            create_file(
                f"{state['folder_path']}/user_requirements.md", state["user_requirements"])
            return {
                "messages": [],
                "user_requirements": state["user_requirements"],
                "next": "Solution-Architect"
            }

        tools = [
            # toolkit.create_project_folder,
        ]

        system_message = f"""Bạn là một Chuyên gia tư vấn hạ tầng Pre‑Sale tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
- Giúp user xác định **đúng và đủ** yêu cầu hạ tầng cloud các mục (1), (2), (3).
- Nếu user hỏi ngoài phạm vi cloud infra, trả lời:  
“Xin lỗi, tôi chỉ hỗ trợ các nhu cầu liên quan đến hạ tầng trên FPT Smart Cloud.”
- Không hỏi các thông tin liên quan đến ứng dụng, chỉ hỏi các thông tin liên quan đến hạ tầng cloud (VM, Network, Storage, Backup, ...).
- Đầu ra là 1 đoạn report về yêu cầu hạ tầng cloud, không có các câu hỏi hay đệm ngoài yêu cầu của KH


CÁC THÔNG TIN CẦN XÁC MINH:
1. VM specs: vCPU, RAM, dung lượng ổ đĩa, có cần Public IP không?  
2. Kiến trúc ứng dụng: Web + DB chạy trên cùng 1 VM hay phân tách?  
3. Dung lượng dữ liệu hiện tại (GB)?  
4. Có cần backup dữ liệu không?
5. Có cần monitoring, logging không?

USE‑CASE MIGRATE (ví dụ cụ thể):
User:  
“Tôi muốn migrate hệ thống từ on‑premise lên FPT Cloud. Có 1 website và 1 database chạy trên VM 4 vCPU, 16 GB RAM, 512 GB SSD, có public IP.”


Sau khi trả summary, dừng luôn — **không hỏi thêm, không tư vấn sales**, chỉ tập trung mục đích Pre‑Sale.
# Important:
- Nếu đủ thông tin rồi thì không hỏi lại KH nữa
- Output hoàn toàn là tiếng Việt, không có các câu hỏi hay đệm ngoài yêu cầu của KH

KHI ĐỦ THÔNG TIN → TRẢ VỀ MỘT ĐOẠN summary là SUMMARY PLAIN‑TEXT như sau:

# Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website và một cơ sở dữ liệu, hiện đang chạy chung trên một máy ảo (VM). Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương, có IP công cộng, domain riêng đã đăng ký, đồng thời đáp ứng yêu cầu backup dữ liệu. Monitoring và logging không nằm trong phạm vi yêu cầu lần này.

# Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website + Database (chạy trên cùng 1 VM)                                            |
| **Cấu hình VM yêu cầu**  | 4 vCPU, 16 GB RAM, 512 GB SSD                                                       |
| **Mạng và truy cập**     | Có public IP; sử dụng domain riêng đã đăng ký                                       |
| **Backup dữ liệu**       | **Có yêu cầu backup**                                                               |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **1 TB** hiện tại (dùng để ước tính dung lượng backup hoặc lưu trữ dự phòng) |

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

        print("state pre-sale: ", state)
        print("result: ", result.pretty_print())
        report = ""

        if len(result.tool_calls) == 0:
            print(f"[DEBUG] Tool được gọi: {result.tool_calls}")
            report = result.content
        return {
            "messages": [result],
            "user_requirements": report,
            "next": "create_project_folder"
        }

    return pre_sale_node
