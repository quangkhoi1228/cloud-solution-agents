## Kế hoạch triển khai
| STT | Tên Task                     | Mô tả                                                                       | PIC      | Support | Duration (ngày) | Ghi chú                           |
|-----|------------------------------|-----------------------------------------------------------------------------|----------|---------|-----------------|------------------------------------|
| 1   | Khảo sát hệ thống            | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH       | FCI     | 2               | Khách hàng cung cấp chi tiết hạ tầng  |
| 2   | Đánh giá khả năng triển khai | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI      | KH      | 1               | Xác định cấu hình tương ứng           |
| 3   | Chuẩn bị hạ tầng Cloud      | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng VPC                     | FCI      | KH      | 2               | Truy cập SSH được chia sẻ cho KH test |
| 4   | Di chuyển dữ liệu & Ứng dụng | Chuyển dữ liệu và ứng dụng từ on-premise lên cloud                     | FCI      | KH      | 3               | Bao gồm cả dữ liệu lớn ~5TB         |
| 5   | Kiểm thử & Go-live           | Kiểm tra toàn bộ hệ thống, chuyển DNS đến FPT Cloud                     | FCI      | KH      | 2               | Đảm bảo hoạt động bình thường       |

## Tổng thời gian dự kiến
**10 ngày** (có thể giảm xuống ~8 ngày nếu thực hiện song song các bước 3 và 4).