## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cần cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng và public IP      | FCI     | KH          | 2                   | Truy cập SSH và IP sẽ được cung cấp cho KH test |
| 3       | Di chuyển Dữ liệu & Ứng dụng     | Chuyển dữ liệu từ on-premise lên cloud, cài đặt ứng dụng Django và PostgreSQL     | FCI     | KH          | 3                   | Có các bước này có thể thực hiện song song  |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS, đảm bảo hoạt động ổn định               | FCI     | KH          | 2                   | Đảm bảo sự ổn định và sẵn sàng hoạt động |

## Tổng thời gian dự kiến
9 ngày (có thể giảm thời gian nếu thực hiện song song các bước 2 và 3).