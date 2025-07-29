## Yêu cầu
Khách hàng cần di chuyển hệ thống hiện tại từ hạ tầng on‑premise lên FPT Smart Cloud. Hệ thống bao gồm một website cá nhân dùng Python Django và một cơ sở dữ liệu PostgreSQL, chạy trên hai máy chủ khác nhau trong cùng một VPC. Việc chuyển đổi cần đảm bảo duy trì cấu hình tương đương, có hai IP công cộng, đồng thời không yêu cầu firewall, monitoring và logging.

### Yêu cầu chi tiết từ khách hàng
| Hạng mục                 | Thông tin yêu cầu                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hình thức triển khai** | Migration từ on‑premise lên FPT Smart Cloud                                         |
| **Thành phần hệ thống**  | Website (Python Django) + Database (PostgreSQL) trên 2 máy chủ                      |
| **Cấu hình VM yêu cầu**  | 16 vCPU, 32GB RAM, 5TB SSD                                                          |
| **Mạng và truy cập**     | 2 IP public; sử dụng domain quangkhoi1228.com                                      |
| **Backup dữ liệu**       | **Không yêu cầu backup**                                                             |
| **Monitoring/Logging**   | **Không yêu cầu**                                                                   |
| **Dung lượng dữ liệu**   | Khoảng **5 TB** hiện tại                                                            |