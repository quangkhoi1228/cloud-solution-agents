---
noteId: "e83cc4a0694211f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai

| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                                     |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ----------------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu        | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng            |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng                     |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP                                           | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test           |
| 4       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng và khôi phục cơ sở dữ liệu | FCI     | KH          | 3                   | Migrate 5TB dữ liệu                             |
| 5       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS và xác thực hoạt động                    | FCI     | KH          | 2                   | Đảm bảo mọi thứ vận hành trơn tru                |

## Tổng thời gian dự kiến
**10 ngày** (có thể giảm xuống ~8 ngày nếu thực hiện song song các bước như 3, 4 và 5).