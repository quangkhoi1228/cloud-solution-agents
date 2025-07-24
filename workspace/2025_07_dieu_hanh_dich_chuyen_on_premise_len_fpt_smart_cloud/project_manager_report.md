---
noteId: "4e38164068a011f0aa1767f6996928b6"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng           |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, gán public IP cho VM                                 | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 4       | Di chuyển dữ liệu & ứng dụng     | Chuyển dữ liệu bằng SCP, cài đặt ứng dụng Django trên Cloud VM                 | FCI     | KH          | 3                   | Thời gian cần thiết để truyền tải 5TB dữ liệu |
| 5       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS sang FPT Cloud                          | FCI     | KH          | 2                   | Giao diện website cần được kiểm tra kỹ lưỡng |

## Tổng thời gian dự kiến
**10 ngày** (có thể giảm xuống ~7 ngày nếu thực hiện song song các bước 3, 4 và 5).