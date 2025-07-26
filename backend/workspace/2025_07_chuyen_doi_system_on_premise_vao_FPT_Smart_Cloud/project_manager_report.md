---
noteId: "d4d576806a0711f0968b9bcbf3b3de7a"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM trên FPT Cloud, cấu hình mạng VPC, gán public IP                        | FCI     | KH          | 2                   | Cấu hình VM tương ứng                 |
| 3       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu từ on-premise lên cloud, cài đặt ứng dụng Django và PostgreSQL  | FCI     | KH          | 3                   | Cần thời gian cho việc migrate dữ liệu |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS, đảm bảo hoạt động liên tục             | FCI     | KH          | 2                   | Đảm bảo tất cả hoạt động như mong đợi  |

## Tổng thời gian dự kiến
**9 ngày** (có thể giảm xuống ~7 ngày nếu thực hiện song song các bước 2 và 3).

### Ghi chú:
- Bước 1 và bước 2 có thể thực hiện song song với nhau để tiết kiệm thời gian.
- Bước 3 có thể bắt đầu ngay khi bước 2 hoàn thành và kết thúc, tùy thuộc vào tốc độ di chuyển dữ liệu.