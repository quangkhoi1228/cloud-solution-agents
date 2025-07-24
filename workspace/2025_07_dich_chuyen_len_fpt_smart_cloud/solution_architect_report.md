---
noteId: "d72b0bf0686a11f0aa1767f6996928b6"
tags: []

---

## Giải pháp đề xuất
```mermaid
flowchart TB
    subgraph s1["On-Premise"]
            OPVM["VM: NestJS & PostgreSQL<br>16vCPU / 32GB RAM / 1TB SSD<br>Public IP"]
            OPIP["Public IP"]
    end
    subgraph VPC["VPC"]
            CloudVM["Cloud VM: NestJS & PostgreSQL<br>16vCPU / 32GB RAM / 1TB SSD<br>Public IP"]
            CloudIP["Public IP"]
    end
    subgraph subGraph2["FPT Smart Cloud"]
            VPC
    end
        OPVM --> OPIP
        CloudVM --> CloudIP
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
| Bước                                 | Mô tả                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------ |
| **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate           |
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng          |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Chuyển dữ liệu (SCP/Object Storage), cài đặt NestJS và cấu hình PostgreSQL |
| **4. Kiểm thử, Go-live & Giám sát**  | Kiểm tra toàn hệ thống và chuyển DNS đến địa chỉ IP của Cloud VM        |

## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 16       | vCPU        | Đáp ứng nhu cầu xử lý NestJS và PostgreSQL         |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 32       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 1        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 1        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            |