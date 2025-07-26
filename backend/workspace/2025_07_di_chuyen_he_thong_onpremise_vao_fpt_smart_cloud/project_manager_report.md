---
noteId: "2047c2306a3511f0968b9bcbf3b3de7a"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hệ thống  |
| 2       | Đánh giá khả năng triển khai     | Phân tích yêu cầu, lên sizing cho cloud VM và storage phù hợp                   | FCI     | KH          | 1                   | Xác định cấu hình tương ứng           |
| 3       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP                                           | FCI     | KH          | 2                   |                                         |
| 4       | Di chuyển dữ liệu ứng dụng       | Chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng                         | FCI     | KH          | 3                   | Có thể thực hiện song song với bước 3 |
| 5       | Kiểm thử và Go-live             | Kiểm tra toàn hệ thống, chuyển DNS                                            | FCI     | KH          | 2                   |                                         |

### Tổng thời gian dự kiến
**Tổng thời gian:** 10 ngày (có thể giảm xuống ~8 ngày nếu thực hiện song song bước 3 và 4).