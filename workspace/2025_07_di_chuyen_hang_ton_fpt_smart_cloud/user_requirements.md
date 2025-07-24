---
noteId: "1ef2e910689f11f0aa1767f6996928b6"
tags: []

---

# Yêu cầu:
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân dùng Python Django và một cơ sở dữ liệu PostgreSQL, đang chạy trên hai máy chủ trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương, có hai IP công cộng, và không yêu cầu firewall, monitoring, logging. Backup dữ liệu không được đề cập nhưng để đảm bảo an toàn, có thể xem xét hỗ trợ backup nếu có nhu cầu trong tương lai.

# Yêu cầu chi tiết từ khách hàng:
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL, chạy trên 2 máy chủ)               |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32 GB RAM, 5 TB SSD                                                        |
| **Mạng và truy cập**     | 2 public IP; không yêu cầu firewall                                                  |
| **Backup dữ liệu**       | **Không yêu cầu**                                                                   |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                            |