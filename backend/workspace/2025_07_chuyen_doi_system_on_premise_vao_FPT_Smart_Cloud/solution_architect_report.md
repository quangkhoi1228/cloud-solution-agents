---
noteId: "cf6678c06a0711f0968b9bcbf3b3de7a"
tags: []

---

## Giải pháp đề xuất
```mermaid
    flowchart TB
        subgraph s1["On-Premise"]
                OPVM1["VM 1: Python Django<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP"]
                OPVM2["VM 2: PostgreSQL<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP"]
                OPIP1["Public IP 1"]
                OPIP2["Public IP 2"]
        end
        subgraph VPC["VPC"]
                CloudVM1["Cloud VM 1: Python Django<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP"]
                CloudVM2["Cloud VM 2: PostgreSQL<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP"]
                CloudIP1["Public IP 1"]
                CloudIP2["Public IP 2"]
        end
        subgraph subGraph2["FPT Smart Cloud"]
                VPC
        end
            OPVM1 --> OPIP1
            OPVM2 --> OPIP2
            CloudVM1 --> CloudIP1
            CloudVM2 --> CloudIP2
            InternetNode["Internet"] --> OPIP1 & OPIP2 & CloudIP1 & CloudIP2
```

## Phương án chuyển đổi
```mermaid
    flowchart LR
    A[📌 1. Khảo sát &<br>Phân tích hệ thống]
    B[🛠️ 2. Chuẩn bị<br>Hạ tầng Cloud]
    C[☁️ 3. Di chuyển<br>Dữ liệu & Ứng dụng]
    D[🚀 4. Kiểm thử,<br>Go-live]

    A --> B --> C --> D

    %% Styling
    classDef phase fill:#e3f2fd,stroke:#2196f3,color:#0d47a1,font-weight:bold;
    class A,B,C,D phase;
```

**Mô tả:**
| Bước                                 | Mô tả                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------ |
| **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate           |
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng        |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Chuyển dữ liệu từ on-premise lên cloud, cài đặt ứng dụng Django và PostgreSQL |
| **4. Kiểm thử, Go-live**  | Kiểm tra toàn bộ hệ thống, chuyển DNS, đảm bảo hoạt động liên tục       |


## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 16       | vCPU        | Đáp ứng nhu cầu xử lý Python Django và PostgreSQL  |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 32       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng và PostgreSQL                          |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho từng VM để phục vụ Web và SSH    |