---
noteId: "7ccbff20694111f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP cho Django và PostgreSQL                  | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển Dữ liệu & Ứng dụng     | Chuyển dữ liệu từ PostgreSQL, cấu hình môi trường cho Django, cài đặt ứng dụng  | FCI     | KH          | 3                   | Thời gian di chuyển dữ liệu lớn       |
| 4       | Kiểm thử, Go-live                 | Kiểm tra toàn bộ hệ thống hoạt động đúng, đảm bảo ứng dụng chạy trên Cloud       | FCI     | KH          | 2                   | Thực hiện chuyển DNS nếu cần          |

## Tổng thời gian dự kiến
**9 ngày** (có thể giảm xuống khoảng **7-8 ngày** nếu thực hiện song song các bước như 2 và 3).