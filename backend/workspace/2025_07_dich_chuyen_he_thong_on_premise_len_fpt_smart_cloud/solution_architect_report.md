---
noteId: "ffbcbd406a0711f0968b9bcbf3b3de7a"
tags: []

---

## Giải pháp đề xuất
```mermaid
flowchart TB
    subgraph s1["On-Premise"]
            OPVM1["VM 1: Django<br>16 vCPU / 32GB RAM / 5TB SSD<br>Public IP 1"]
            OPVM2["VM 2: PostgreSQL<br>16 vCPU / 32GB RAM / 5TB SSD<br>Public IP 2"]
            OPIP1["Public IP 1"]
            OPIP2["Public IP 2"]
    end
    subgraph VPC["VPC"]
            CloudVM1["Cloud VM 1: Django<br>16 vCPU / 32GB RAM / 5TB SSD<br>Public IP 1"]
            CloudVM2["Cloud VM 2: PostgreSQL<br>16 vCPU / 32GB RAM / 5TB SSD<br>Public IP 2"]
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
D[🚀 4. Kiểm thử,<br>Go-live & Giám sát]

A --> B --> C --> D

%% Styling
classDef phase fill:#e3f2fd,stroke:#2196f3,color:#0d47a1,font-weight:bold;
class A,B,C,D phase;
```

**Mô tả:**
| Bước                                 | Mô tả                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------ |
| **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate           |
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng       |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Chuyển dữ liệu (SCP/Other), cài app trên Cloud VM, khôi phục DB       |
| **4. Kiểm thử, Go-live**             | Kiểm tra toàn hệ thống, chuyển DNS nếu cần, đảm bảo hoạt động ổn định  |

## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 16       | vCPU        | Đáp ứng nhu cầu xử lý Django và PostgreSQL        |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 32       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            |