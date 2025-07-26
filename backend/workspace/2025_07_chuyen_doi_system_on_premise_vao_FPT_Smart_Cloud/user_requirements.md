---
noteId: "c70404906a0711f0968b9bcbf3b3de7a"
tags: []

---

# Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on-premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, được triển khai trên hai máy chủ trong cùng một VPC. Hệ thống cần có cấu hình VM tương ứng, bao gồm hai địa chỉ IP công cộng. Dung lượng dữ liệu hiện tại khoảng 5 TB và không yêu cầu backup dữ liệu, monitoring hoặc logging.

# Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL) trên 2 máy chủ trong cùng 1 VPC     |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                        |
| **Mạng và truy cập**     | Có 2 public IP                                                                      |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                            |
| **Backup dữ liệu**       | **Không yêu cầu backup**                                                             |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |