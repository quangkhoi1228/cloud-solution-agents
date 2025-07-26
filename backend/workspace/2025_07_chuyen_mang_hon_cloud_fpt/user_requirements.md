---
noteId: "2ca2b4b0690c11f09c37cba0e5f3f798"
tags: []

---

# Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân chạy trên Python Django và một cơ sở dữ liệu PostgreSQL, được triển khai trên hai máy chủ khác nhau trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương, có hai IP công cộng, và không yêu cầu firewall, monitoring hay logging.

# Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL, chạy trên 2 VM)                     |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                         |
| **Mạng và truy cập**     | 2 public IP; sử dụng domain quangkhoi1228.com                                       |
| **Backup dữ liệu**       | **Không yêu cầu**                                                                    |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                    |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                             |