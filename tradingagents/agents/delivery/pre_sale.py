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
                "messages": [AIMessage(content="Đã có thông tin yêu cầu từ khách hàng")],
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

USE‑CASE MIGRATE (ví dụ cụ thể):
User:  
“Tôi muốn migrate hệ thống từ on‑premise lên FPT Cloud. Có 1 website và 1 database chạy trên VM 4 vCPU, 16 GB RAM, 512 GB SSD, có public IP.”


Sau khi trả summary, dừng luôn — **không hỏi thêm, không tư vấn sales**, chỉ tập trung mục đích Pre‑Sale.
# Important:
- Nếu đủ thông tin rồi thì không hỏi lại KH nữa
- Output hoàn toàn là tiếng Việt, không có các câu hỏi hay đệm ngoài yêu cầu của KH

KHI ĐỦ THÔNG TIN → TRẢ VỀ MỘT ĐOẠN summary là SUMMARY PLAIN‑TEXT như sau:

# Yêu cầu hạ tầng từ khách hàng:
- Hệ thống cần migrate từ on‑premise lên FPT Smart Cloud.
- Gồm 1 website và 1 database, chạy chung trên 1 VM.
- VM yêu cầu cấu hình: 4 vCPU, 16 GB RAM, 512 GB SSD, có public IP, có domain đã đăng ký.

# Các thông tin đầu vào hiện có:
- Kiến trúc hệ thống: Web + Database chạy trên cùng VM hiện tại.
- Hạ tầng VM on‑premise: 4 vCPU / 16 GB RAM / 512 GB SSD.
- Network: Có public IP gán sẵn, kèm domain hoạt động.
- Use-case chủ yếu: Migration sang môi trường cloud của FPT Smart Cloud.
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
