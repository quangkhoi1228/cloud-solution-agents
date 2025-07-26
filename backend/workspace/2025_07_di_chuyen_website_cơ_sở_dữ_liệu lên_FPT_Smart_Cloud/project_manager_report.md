---
noteId: "a49d8d20690f11f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, gán public IP cho VM trên FPT Cloud                | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & Ứng dụng     | Backup dữ liệu từ on-premise và chuyển dữ liệu lên cloud, cài đặt ứng dụng Django và khôi phục database PostgreSQL | FCI | KH          | 3                   | Thực hiện backup trong quá trình di chuyển dữ liệu  |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống sau khi di chuyển, thiết lập backup định kỳ           | FCI     | KH          | 1                   | Chuyển DNS sang địa chỉ mới            |

## Tổng thời gian dự kiến
**8 ngày** (có thể giảm xuống ~6 ngày nếu thực hiện song song các bước như 2–3).