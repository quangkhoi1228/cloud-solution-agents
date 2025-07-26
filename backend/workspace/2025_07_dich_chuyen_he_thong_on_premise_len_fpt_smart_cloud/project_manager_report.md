---
noteId: "045112706a0811f0968b9bcbf3b3de7a"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu cần migrate         | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud          | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng VPC         | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu từ hệ thống hiện tại sang Cloud VM, cài đặt ứng dụng Django trên Cloud VM, khôi phục Database PostgreSQL | FCI     | KH          | 3                   | Sử dụng SCP để transfer dữ liệu        |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống trên Cloud, chuyển DNS nếu cần, đảm bảo hoạt động ổn định | FCI     | KH          | 1                   | Đảm bảo website hoạt động bình thường   |

## Tổng thời gian dự kiến
8 ngày (có thể giảm xuống còn 5-6 ngày nếu thực hiện song song các bước 2-3).