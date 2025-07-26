---
noteId: "1e0a75d06a0811f0968b9bcbf3b3de7a"
tags: []

---

# Dự án chuyển đổi on-premise lên FPT Smart Cloud

## Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, chạy trên hai máy chủ trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương với hai IP công cộng, đồng thời đáp ứng yêu cầu không có firewall, monitoring và logging.

## Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL) (chạy trên 2 máy chủ)                       |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                        |
| **Mạng và truy cập**     | 2 public IP; không cần firewall                                                      |
| **Backup dữ liệu**       | **Không yêu cầu backup**                                                             |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại (dùng để ước tính dung lượng backup hoặc lưu trữ dự phòng) |

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

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu cần migrate         | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud          | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng VPC         | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu từ hệ thống hiện tại sang Cloud VM, cài đặt ứng dụng Django trên Cloud VM, khôi phục Database PostgreSQL | FCI     | KH          | 3                   | Sử dụng SCP để transfer dữ liệu        |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống trên Cloud, chuyển DNS nếu cần, đảm bảo hoạt động ổn định | FCI     | KH          | 1                   | Đảm bảo website hoạt động bình thường   |

## Tổng thời gian dự kiến
8 ngày (có thể giảm xuống còn 5-6 ngày nếu thực hiện song song các bước 2-3).

## Bảng giá dự kiến
| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            | Đơn giá (VND) | Thành tiền (VND) |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- | ------------- | ---------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 16       | vCPU        | Đáp ứng nhu cầu xử lý Django và PostgreSQL        | 150.000       | 2.400.000        |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 32       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   | 130.000       | 4.160.000        |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             | 3.000.000     | 15.000.000       |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            | 15.000        | 30.000           |

## Tổng chi phí dự kiến / tháng (chưa gồm VAT):
**21.590.000 VND**

_Lưu ý:_
- Đơn giá ở đây là giá giả định, có thể thay đổi tùy theo chương trình khuyến mãi hoặc cam kết sử dụng.
- Một số dịch vụ như monitoring/logging có gói miễn phí, nhưng nên tư vấn khách hàng nâng cấp khi hệ thống mở rộng.