## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng và IP         | FCI     | KH          | 3                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & Ứng dụng     | Chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng, khôi phục DB           | FCI     | KH          | 4                   | Bao gồm backup dữ liệu và phục hồi    |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn hệ thống, chuyển DNS, truy cập website qua IP công cộng         | FCI     | KH          | 2                   | Khách hàng cần xác nhận sau kiểm thử  |

## Tổng thời gian dự kiến
11 ngày (có thể giảm xuống nếu thực hiện song song các bước như 2 và 3).