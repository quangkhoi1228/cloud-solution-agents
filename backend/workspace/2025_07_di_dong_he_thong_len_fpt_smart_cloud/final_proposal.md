---
noteId: "94330e10694111f09c37cba0e5f3f798"
tags: []

---

# Dự án di chuyển hệ thống lên FPT Smart Cloud

## Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on-premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, phân tách trên 2 máy chủ khác nhau trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương với 2 IP công cộng, không yêu cầu firewall, và không cần monitoring, logging.

## Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL, phân tách trên 2 VM)                 |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                       |
| **Mạng và truy cập**     | Có 2 public IP; không yêu cầu firewall                                              |
| **Backup dữ liệu**       | **Không đề cập yêu cầu backup**                                                    |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                            |

## Giải pháp đề xuất
```mermaid
flowchart TB
    subgraph s1["On-Premise"]
            OPVM1["VM: Python Django<br>16vCPU / 32GB RAM / 5TB SSD<br>Public IP 1"]
            OPVM2["VM: PostgreSQL<br>16vCPU / 32GB RAM / 5TB SSD<br>Public IP 2"]
            OPIP1["Public IP 1"]
            OPIP2["Public IP 2"]
    end
    subgraph VPC["VPC"]
            CloudVM1["Cloud VM: Python Django<br>16vCPU / 32GB RAM / 5TB SSD<br>Public IP 1"]
            CloudVM2["Cloud VM: PostgreSQL<br>16vCPU / 32GB RAM / 5TB SSD<br>Public IP 2"]
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
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng           |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Chuyển dữ liệu, cài đặt ứng dụng trên Cloud VM                            |
| **4. Kiểm thử, Go-live**             | Kiểm tra toàn bộ hệ thống hoạt động đúng, thực hiện chuyển DNS nếu cần      |

## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 32       | vCPU        | Đáp ứng nhu cầu xử lý cho Python Django và PostgreSQL |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 64       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán cho từng VM, phục vụ cho Web & SSH             |

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP cho Django và PostgreSQL                  | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển Dữ liệu & Ứng dụng     | Chuyển dữ liệu từ PostgreSQL, cấu hình môi trường cho Django, cài đặt ứng dụng  | FCI     | KH          | 3                   | Thời gian di chuyển dữ liệu lớn       |
| 4       | Kiểm thử, Go-live                 | Kiểm tra toàn bộ hệ thống hoạt động đúng, đảm bảo ứng dụng chạy trên Cloud       | FCI     | KH          | 2                   | Thực hiện chuyển DNS nếu cần          |

## Tổng thời gian dự kiến
**9 ngày** (có thể giảm xuống khoảng **7-8 ngày** nếu thực hiện song song các bước như 2 và 3).

## Bảng giá dự kiến

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            | Đơn giá (VND) | Thành tiền (VND) |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- | ------------- | ---------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 32       | vCPU        | Đáp ứng nhu cầu xử lý cho Python Django và PostgreSQL | 150.000       | 4.800.000        |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 64       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   | 130.000       | 8.320.000        |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             | 3.000.000     | 15.000.000       |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán cho từng VM, phục vụ cho Web & SSH             | 15.000        | 30.000           |

## Tổng chi phí dự kiến / tháng (chưa gồm VAT):
**28.150.000 VND**

_Lưu ý:_
- Đơn giá ở đây là giá giả định, có thể thay đổi tùy theo chương trình khuyến mãi hoặc cam kết sử dụng.
- Các dịch vụ như firewall, monitoring hay logging không được yêu cầu.