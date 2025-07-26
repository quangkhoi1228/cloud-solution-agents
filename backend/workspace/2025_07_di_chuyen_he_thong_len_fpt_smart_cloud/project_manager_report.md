## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network            | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng              | FCI     | KH          | 2                   | Thực hiện song song với bước 3       |
| 3       | Di chuyển Dữ liệu & Ứng dụng     | Backup + chuyển dữ liệu (SCP/Object Storage), cài ứng dụng, khôi phục DB      | FCI     | KH          | 3                   | Có thể thực hiện song song với bước 2 |
| 4       | Kiểm thử, Go-live                 | Kiểm tra toàn hệ thống, chuyển DNS, thiết lập backup định kỳ                 | FCI     | KH          | 2                   |                                      |

## Tổng thời gian dự kiến
**Tổng thời gian**: 7 ngày (có thể giảm xuống 5 ngày nếu thực hiện đồng thời bước 2 và bước 3).