---
noteId: "b8cc2d60690f11f09c37cba0e5f3f798"
tags: []

---

# Đề xuất Dự án Migrate Website lên FPT Smart Cloud

## Yêu cầu khách hàng
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on-premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, cần triển khai trên hai máy chủ trong cùng một VPC. Việc chuyển đổi cần đảm bảo cấu hình tương đương, có hai IP công cộng, không yêu cầu firewall, monitoring và logging nhưng cần đáp ứng yêu cầu backup dữ liệu.

### Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on-premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL) trên 2 máy chủ trong cùng 1 VPC   |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                        |
| **Mạng và truy cập**     | Có 2 public IP; không yêu cầu firewall                                               |
| **Backup dữ liệu**       | **Có yêu cầu backup**                                                               |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại (dùng để ước tính dung lượng backup hoặc lưu trữ dự phòng) |

## Giải pháp đề xuất
```mermaid
    flowchart TB
        subgraph s1["On-Premise"]
                OPVM1["VM: Django<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 1"]
                OPVM2["VM: PostgreSQL<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 2"]
                OPIP1["Public IP 1"]
                OPIP2["Public IP 2"]
        end
        subgraph VPC["VPC"]
                CloudVM1["Cloud VM: Django<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 1"]
                CloudVM2["Cloud VM: PostgreSQL<br>16 vCPU / 32 GB RAM / 5 TB SSD<br>Public IP 2"]
                CloudIP1["Public IP 1"]
                CloudIP2["Public IP 2"]
        end
        subgraph subGraph2["FPT Smart Cloud"]
                VPC
                Storage["Object Storage<br>5TB backup data"]
        end
            OPVM1 --> OPIP1
            OPVM2 --> OPIP2
            CloudVM1 --> CloudIP1
            CloudVM2 --> CloudIP2
            OPVM1 -- Backup --> Storage
            OPVM2 -- Backup --> Storage
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
| **2. Chuẩn bị Hạ tầng Cloud**        | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng, IP công cộng  |
| **3. Di chuyển Dữ liệu & Ứng dụng**  | Backup dữ liệu từ on-premise và chuyển dữ liệu lên cloud, cài đặt ứng dụng Django và khôi phục database PostgreSQL  |
| **4. Kiểm thử, Go-live**  | Kiểm tra toàn bộ hệ thống sau khi di chuyển, chuyển DNS, thiết lập backup định kỳ  |

## Danh sách sản phẩm sử dụng (BOM)

| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 32       | vCPU        | Đáp ứng nhu cầu xử lý cho website và database      |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 64       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            |
| **Object Storage**       | Lưu trữ dữ liệu backup dung lượng 5TB                   | 5000     | GB          | Lưu dữ liệu lịch sử, backup định kỳ ngoài VM       |
| **Snapshot VM**          | Tự động sao lưu toàn bộ VM                              | 1        | bản         | Lên lịch backup định kỳ, phục hồi nhanh khi cần    |

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, gán public IP cho VM trên FPT Cloud                | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & Ứng dụng     | Backup dữ liệu từ on-premise và chuyển dữ liệu lên cloud, cài đặt ứng dụng Django và khôi phục database PostgreSQL | FCI | KH          | 3                   | Thực hiện backup trong quá trình di chuyển dữ liệu  |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống sau khi di chuyển, thiết lập backup định kỳ           | FCI     | KH          | 1                   | Chuyển DNS sang địa chỉ mới            |

## Tổng thời gian dự kiến
**8 ngày** (có thể giảm xuống ~6 ngày nếu thực hiện song song các bước như 2–3).

## Bảng giá dự kiến
| Tên sản phẩm             | Mô tả                                                   | Số lượng | Đơn vị tính | Ghi chú                                            | Đơn giá (VND) | Thành tiền (VND) |
| ------------------------ | ------------------------------------------------------- | -------- | ----------- | -------------------------------------------------- | ------------- | ---------------- |
| **vCPU**                 | Số nhân xử lý cho Cloud VM                              | 32       | vCPU        | Đáp ứng nhu cầu xử lý cho website và database      | 150.000       | 4.800.000        |
| **RAM**                  | Bộ nhớ cho Cloud VM                                     | 64       | GB          | Đảm bảo hiệu năng xử lý web và truy vấn database   | 130.000       | 8.320.000        |
| **SSD**                  | Lưu trữ cục bộ cho Cloud VM                             | 5        | TB          | Lưu ứng dụng, hệ điều hành, PostgreSQL             | 3.000         | 15.000.000       |
| **Public IP tĩnh**       | Địa chỉ IP để truy cập VM từ Internet                   | 2        | IP          | Gán trực tiếp cho VM, phục vụ Web & SSH            | 15.000        | 30.000           |
| **Object Storage**       | Lưu trữ dữ liệu backup dung lượng 5TB                   | 5000     | GB          | Lưu dữ liệu lịch sử, backup định kỳ ngoài VM       | 2.500         | 12.500.000       |
| **Snapshot VM**          | Tự động sao lưu toàn bộ VM                              | 1        | bản         | Lên lịch backup định kỳ, phục hồi nhanh khi cần    | 150.000       | 150.000          |

## Tổng chi phí dự kiến / tháng (chưa gồm VAT):
**40.795.000 VND**

_Lưu ý:_
- Đơn giá trên có thể thay đổi tùy theo chương trình khuyến mãi hoặc cam kết sử dụng.
- Chi phí hàng tháng có thể điều chỉnh nếu có thêm yêu cầu khác từ khách hàng như tăng dung lượng hoặc thêm dịch vụ.