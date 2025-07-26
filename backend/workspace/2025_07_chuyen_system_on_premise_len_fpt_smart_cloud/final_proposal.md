---
noteId: "fd127a50694211f09c37cba0e5f3f798"
tags: []

---

# Dự án chuyển đổi hệ thống lên FPT Smart Cloud

## Yêu cầu
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on-premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, được triển khai trên hai máy ảo (VM) trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương, có hai IP công cộng, đồng thời không yêu cầu firewall, monitoring và logging.

### Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on-premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL) trên 2 VM                          |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                       |
| **Mạng và truy cập**     | Có 2 public IP; không yêu cầu firewall                                               |
| **Backup dữ liệu**       | **Không yêu cầu backup**                                                             |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                              |

## Giải pháp đề xuất
```mermaid
    flowchart TB
        subgraph s1["On-Premise"]
                OPVM1["VM 1: Python Django<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 1"]
                OPVM2["VM 2: PostgreSQL<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 2"]
        end
        subgraph VPC["VPC"]
                CloudVM1["Cloud VM 1: Python Django<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 1"]
                CloudVM2["Cloud VM 2: PostgreSQL<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 2"]
        end
        subgraph subGraph2["FPT Smart Cloud"]
                VPC
        end
            OPVM1 --> OPVM2
            CloudVM1 --> CloudVM2
            CloudVM1 --> CloudVM2
            InternetNode["Internet"] --> CloudVM1 & CloudVM2
```

### Phương án chuyển đổi
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
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng          |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Chuyển dữ liệu (SCP/Object Storage), cài app, khôi phục DB               |
| **4. Kiểm thử, Go-live**  | Kiểm tra toàn hệ thống, chuyển DNS, xác thực hoạt động                    |

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                                     |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ----------------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu        | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng            |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng                     |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP                                           | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test           |
| 4       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng và khôi phục cơ sở dữ liệu | FCI     | KH          | 3                   | Migrate 5TB dữ liệu                             |
| 5       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS và xác thực hoạt động                    | FCI     | KH          | 2                   | Đảm bảo mọi thứ vận hành trơn tru                |

### Tổng thời gian dự kiến
**10 ngày** (có thể giảm xuống ~8 ngày nếu thực hiện song song các bước như 3, 4 và 5).

## Bảng giá dự kiến
| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            | Đơn giá (VND) | Thành tiền (VND) |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- | ------------- | ---------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 32       | vCPU        | Đáp ứng nhu cầu xử lý cho Python Django và PostgreSQL | 150.000       | 4.800.000        |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 64       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   | 130.000       | 8.320.000        |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 10       | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             | 3.000.000     | 30.000.000       |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            | 15.000        | 30.000           |

### Tổng chi phí dự kiến / tháng (chưa gồm VAT):
**43.150.000 VND**

_Lưu ý:_
- Đơn giá ở đây là giá giả định, có thể thay đổi tùy theo chương trình khuyến mãi hoặc cam kết sử dụng.
- Một số dịch vụ như monitoring/logging có gói miễn phí, nhưng nên tư vấn khách hàng nâng cấp khi hệ thống mở rộng.