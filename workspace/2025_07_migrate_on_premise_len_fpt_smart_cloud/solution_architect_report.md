---
noteId: "d6963c70685e11f0aa1767f6996928b6"
tags: []

---

## Đề xuất giải pháp chuyển đổi hệ thống từ on-premise sang cloud:
```mermaid
    flowchart TB
        subgraph s1["On-Premise"]
                OPVM["VM: Golang &amp; MongoDB<br>4vCPU / 8GB RAM / 500GB SSD<br>Public IP"]
                OPIP["Public IP"]
        end
        subgraph VPC["VPC"]
                CloudVM["Cloud VM: Golang &amp; MongoDB<br>4vCPU / 8GB RAM / 500GB SSD<br>Public IP"]
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
| Bước                                 | Mô tả ngắn                                                               |
| ------------------------------------ | ------------------------------------------------------------------------ |
| **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate           |
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng, firewall  |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Backup + chuyển dữ liệu (SCP/Object Storage), cài app, khôi phục DB      |
| **4. Kiểm thử, Go-live & Giám sát**  | Kiểm tra toàn hệ thống, chuyển DNS, thiết lập giám sát & backup định kỳ  |