from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import time
import json
from langgraph.types import Command, interrupt

from langchain_core.messages import AIMessage

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file

pricing = """
| Sản phẩm / Dịch vụ     | Đơn giá (VND)                    |
|------------------------|----------------------------------|
| vCPU                   | 150.000 / vCPU / tháng           |
| RAM                    | 130.000 / GB / tháng             |
| SSD                    | 3.000 / GB / tháng               |
| Public IP              | 15.000 / IP / tháng             |
| Object Storage         | 25.000 / GB / tháng             |
| Firewall & VPC         | 100.000 / cấu hình (1 lần)       |
| Snapshot VM            | 150.000 / tháng                  |
| Monitoring & Logging   | 2.000.000 / tháng                  |
"""

def create_sale(llm, toolkit):
    def sale_node(state):

        # if state["solution_architect_report"]:
        #     create_file(
        #         f"{state['folder_path']}/solution_architect_report.md", state["solution_architect_report"])
        #     return {
        #         "messages": [AIMessage(content="Đã có thông tin giải pháp đề xuất từ khách hàng")],
        #         "solution_architect_report": state["solution_architect_report"],
        #     }
            
        tools = [
            # toolkit.create_project_folder,
        ]
        
        solution_architect_report = state["solution_architect_report"]


        system_message = f"""Bạn là một chuyên gia Sale tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
Nhiệm vụ của bạn là:
    - Đọc bảng BOM mà Solution Architect đã cung cấp BOM (Bill of Materials) với các hạng mục hạ tầng cloud cần thiết và điền giá dựa trên bảng giá tiêu chuẩn bên dưới.
    - Tính thành tiền = số lượng × đơn giá cho mỗi dòng dựa.
    - Thêm các cột Đơn giá và Thành tiền vào bảng.
    - Tính Tổng chi phí dự kiến ở cuối bảng.

THÔNG TIN ĐẦU VÀO:
- Bảng BOM mà Solution Architect đã cung cấp BOM (Bill of Materials) với các hạng mục hạ tầng cloud cần thiết: {solution_architect_report}
- Bảng giá tiêu chuẩn: {pricing}

OUTPUT:
- Bảng giá dự kiến với các cột: Sản phẩm / Dịch vụ, Đơn giá (VND), Thành tiền.
- Tổng chi phí dự kiến.
- Nếu sản phẩm nào không sử dụng thì không điền vào bảng



## Bảng giá dự kiến
| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            | Đơn giá (VND) | Thành tiền (VND) |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- | ------------- | ---------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 4        | vCPU        | Đáp ứng nhu cầu xử lý NestJS và PostgreSQL         | 150.000       | 600.000          |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 8        | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   | 100.000       | 800.000          |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 500      | GB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             | 2.000         | 1.000.000        |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 1        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            | 200.000       | 200.000          |



## Tổng chi phí dự kiến / tháng (chưa gồm VAT):
**3.150.000 VND**
_Lưu ý:_
- Đơn giá ở đây là giá giả định, có thể thay đổi tùy theo chương trình khuyến mãi hoặc cam kết sử dụng.
- Một số dịch vụ như monitoring/logging có gói miễn phí, nhưng nên tư vấn khách hàng nâng cấp khi hệ thống mở rộng.



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

        print("state sale: ", state)
        print("result: ", result.pretty_print())
        report = ""

        if len(result.tool_calls) == 0:
            report = result.content
            
        create_file(f"{state['folder_path']}/sale_report.md", report)
            
        return {
            "messages": [result],
            "sale_report": report,
        }

    return sale_node
