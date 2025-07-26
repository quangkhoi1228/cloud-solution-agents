## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng   |
| 2       | Chuẩn bị hạ tầng Cloud          | Tạo 2 VM, cấu hình mạng VPC, gán public IP cho 2 VM                           | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test  |
| 3       | Di chuyển dữ liệu & Ứng dụng     | Chuyển dữ liệu từ on-premise lên cloud, cài đặt ứng dụng Django và PostgreSQL  | FCI     | KH          | 3                   | Dự kiến thời gian di chuyển dữ liệu    |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS và cấu hình các thay đổi cần thiết      | FCI     | KH          | 2                   | Đảm bảo mọi thứ hoạt động như mong đợi |

## Tổng thời gian dự kiến
**Tổng cộng: 9 ngày** (có thể giảm xuống nếu các bước 2, 3, và 4 thực hiện song song, tổng thời gian có thể rút ngắn xuống còn khoảng 7–8 ngày).