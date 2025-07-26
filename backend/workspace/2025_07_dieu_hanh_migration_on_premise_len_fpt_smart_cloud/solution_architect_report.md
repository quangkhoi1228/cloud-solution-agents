---
noteId: "80f0f5b0690a11f09c37cba0e5f3f798"
tags: []

---

## Giải pháp đề xuất
```mermaid
flowchart TB
    subgraph s1["On-Premise"]
        OPVM1["VM 1: Django Web Server<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP 1"]
        OPVM2["VM 2: PostgreSQL DB<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP 2"]
    end
    subgraph VPC["VPC"]
        CloudVM1["Cloud VM 1: Django Web Server<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP 1"]
        CloudVM2["Cloud VM 2: PostgreSQL DB<br>8 vCPU / 16GB RAM / 2.5TB SSD<br>Public IP 2"]
    end
    subgraph subGraph2["FPT Smart Cloud"]
        VPC
        Storage["Object Storage<br>5TB backup data"]
    end
    OPVM1 --> OPVM2
    CloudVM1 --> CloudVM2
    OPVM1 -- Backup --> Storage
    OPVM2 -- Backup --> Storage
    InternetNode["Internet"] --> OPVM1 & OPVM2 & CloudVM1 & CloudVM2
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
| Bước                                 | Mô tả                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------- |
| **1. Khảo sát & Phân tích hệ thống** | Đánh giá hệ thống hiện tại, tài nguyên VM, dữ liệu cần migrate          |
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng          |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Backup và chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng          |
| **4. Kiểm thử, Go-live**  | Kiểm tra toàn bộ hệ thống, chuyển DNS và thiết lập backup định kỳ      |

## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 16       | vCPU        | Đáp ứng nhu cầu xử lý Django và PostgreSQL         |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 32       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            |
| **Object Storage**       | Lưu trữ dữ liệu backup dung lượng 5TB                   | 5000     | GB          | Lưu dữ liệu lịch sử, backup định kỳ ngoài VM       |
| **Snapshot VM**          | Tự động sao lưu toàn bộ VM                              | 1        | bản         | Lên lịch backup định kỳ, phục hồi nhanh khi cần    |