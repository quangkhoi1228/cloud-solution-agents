---
noteId: "993ed7a0690911f09c37cba0e5f3f798"
tags: []

---

# Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân sử dụng Python Django và một cơ sở dữ liệu PostgreSQL, đang được triển khai trên 2 máy chủ trong cùng 1 VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương với dung lượng lớn, có 2 IP công cộng. Backup dữ liệu không được đề cập, cũng như không yêu cầu monitoring và logging.

# Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website cá nhân (Python Django) + Database (PostgreSQL) trên 2 máy chủ              |
| **Cấu hình VM yêu cầu**  | 16 CPU, 32 GB RAM, 5 TB SSD                                                         |
| **Mạng và truy cập**     | 2 public IP; không cần firewall                                                      |
| **Backup dữ liệu**       | **Không yêu cầu backup**                                                             |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                    |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại (dùng để ước tính dung lượng lưu trữ)                    |