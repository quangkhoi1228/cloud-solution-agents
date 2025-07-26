---
noteId: "85466d20690a11f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng           |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP                                          | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 4       | Di chuyển dữ liệu                | Backup và chuyển dữ liệu từ on-premise lên Object Storage                     | FCI     | KH          | 3                   | Sử dụng SCP hoặc Object Storage       |
| 5       | Cài đặt ứng dụng                 | Triển khai ứng dụng Django trên Cloud VM, cấu hình kết nối tới PostgreSQL    | FCI     | KH          | 2                   | Đảm bảo dịch vụ chạy ổn định sau cài đặt |
| 6       | Kiểm thử                         | Kiểm tra toàn bộ hệ thống, đảm bảo ứng dụng hoạt động bình thường             | FCI     | KH          | 1                   | Thực hiện test với dữ liệu thực      |
| 7       | Go-live                          | Chuyển DNS về Cloud VM và thiết lập backup định kỳ                           | FCI     | KH          | 1                   | Chốt chuyển giao cho KH              |

## Tổng thời gian dự kiến
**12 ngày** (có thể giảm xuống nếu thực hiện song song các bước 3–5 hoặc 4–6).

### Ghi chú
- Các bước từ 3 đến 5 có thể thực hiện song song nếu có đủ nguồn lực.
- Tổng thời gian có thể linh hoạt căn cứ vào việc khách hàng chuẩn bị và cung cấp thông tin cần thiết cho các bước khảo sát và đánh giá.