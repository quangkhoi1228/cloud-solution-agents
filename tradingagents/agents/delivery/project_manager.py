from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import time
import json
from langgraph.types import Command, interrupt

from langchain_core.messages import AIMessage

from tradingagents.agents.utils.company_utils import get_company_info
from tradingagents.dataflows.interface import create_file


def create_project_manager(llm, toolkit):
    def project_manager_node(state):

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


        system_message = f"""Bạn là một Chuyên gia giải pháp hạ tầng Project Manager tại FPT Smart Cloud (FCI) {get_company_info()}.

MỤC TIÊU:
Nhiệm vụ của bạn là xây dựng phương án chuyển đổi hệ thống của khách hàng từ on-premise sang hạ tầng FPT Cloud (FCI), đảm bảo:
- Đảm bảo bảo mật, hiệu năng, và tính sẵn sàng cao.
- Kết nối thông suốt giữa on-prem và cloud trong giai đoạn chuyển tiếp.
- Có khả năng backup & restore dữ liệu trong suốt quá trình migration.
- Đầu ra là 1 đoạn report về yêu cầu hạ tầng cloud, không có các câu hỏi hay đệm ngoài yêu cầu của KH
YÊU CẦU
1. **Vẽ sơ đồ kiến trúc hệ thống cloud (Mermaid)** thể hiện mô hình chuyển đổi: dựa vào thông tin đầu vào hiện có và yêu cầu hạ tầng cloud.

- Yêu cầu của khách hàng: {solution_architect_report}

2. **Vẽ sơ đồ các bước thực hiện** để chuyển đổi hệ thống từ on-premise sang cloud (tối đa 5 bước)

3. **Vẽ bảng các bước chính** để chuyển đổi hệ thống từ on-premise sang cloud chi tiết hơn cho từng bước.
    
VÍ DỤ CỤ THỂ:
- yêu cầu của KH: 
    # Yêu cầu hạ tầng từ khách hàng:
    - Hệ thống cần migrate từ on‑premise lên FPT Smart Cloud.
    - Gồm 1 website cá nhân dùng NestJS và 1 database PostgreSQL, chạy chung trên 1 VM.
    - VM yêu cầu cấu hình: 4 vCPU, 8 GB RAM, 500 GB SSD, có public IP.
    - Dung lượng dữ liệu hiện tại là khoảng 1 TB.

    # Các thông tin đầu vào hiện có:
    - Kiến trúc hệ thống: Web + Database chạy trên cùng VM.
    - Hạ tầng VM on‑premise: 4 vCPU / 8 GB RAM / 500 GB SSD.
    - Network: Có public IP gán sẵn.
    - Dung lượng dữ liệu: Khoảng 1 TB.
    - Use-case chủ yếu: Migration sang môi trường cloud của FPT Smart Cloud.
    
- Thì output report sẽ bao gồm tiêu đề và nội dung sau:

## Giải pháp đề xuất
    ```mermaid
        flowchart TB
            subgraph s1["On-Premise"]
                    OPVM["VM: NestJS &amp; PostgreSQL<br>4vCPU / 8GB RAM / 500GB SSD<br>Public IP"]
                    OPIP["Public IP"]
            end
            subgraph VPC["VPC"]
                    CloudVM["Cloud VM: NestJS &amp; PostgreSQL<br>4vCPU / 8GB RAM / 500GB SSD<br>Public IP"]
                    CloudIP["Public IP"]
            end
            subgraph subGraph2["FPT Smart Cloud"]
                    VPC
                    Storage["Object Storage<br>1TB backup data"]
            end
                OPVM --> OPIP
                CloudVM --> CloudIP
                OPVM -- Backup --> Storage
                InternetNode["Internet"] --> OPIP & CloudIP
    ```
    
## Phương án chuyển đổi
    ```mermaid
        flowchart LR
        A[📌 1. Khảo sát &<br>Phân tích hệ thống]
        B[🛠️ 2. Chuẩn bị<br>Hạ tầng Cloud]
        C[☁️ 3. Di chuyển<br>Dữ liệu & Ứng dụng]
        D[🚀 4. Kiểm thử,<br>Go-live & Giám sát]

        A --> B --> C --> D

        %% Styling
        classDef phase fill:#e3f2fd,stroke:#2196f3,color:#0d47a1,font-weight:bold;
        class A,B,C,D phase;
    ```
    
    **Mô tả:**
    | Bước                                 | Mô tả                                                               |
    | ------------------------------------ | ------------------------------------------------------------------------ |
    | **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate           |
    | **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng, firewall  |
    | **3. Di chuyển Dữ liệu & Ứng dụng**  | Backup + chuyển dữ liệu (SCP/Object Storage), cài app, khôi phục DB      |
    | **4. Kiểm thử, Go-live & Giám sát**  | Kiểm tra toàn hệ thống, chuyển DNS, thiết lập giám sát & backup định kỳ  |

# Important:
- Output hoàn toàn là tiếng Việt
- Không đưa các thông tin ngoài vào như giới thiệu
- Chỉ có chart mermaid"""

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

        print("state solution architect: ", state)
        print("result: ", result.pretty_print())
        report = ""

        if len(result.tool_calls) == 0:
            report = result.content
            
        create_file(f"{state['folder_path']}/solution_architect_report.md", report)
            
        return {
            "messages": [result],
            "solution_architect_report": report,
        }

    return solution_architect_node
