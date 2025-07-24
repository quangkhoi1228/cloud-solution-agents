---
noteId: "db594c50686a11f0aa1767f6996928b6"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network           | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo VM, cấu hình mạng VPC, public IP                                          | FCI     | KH          | 2                   |                                        |
| 3       | Di chuyển dữ liệu & ứng dụng      | Chuyển dữ liệu (SCP/Object Storage), cài đặt NestJS và cấu hình PostgreSQL    | FCI     | KH          | 3                   |                                        |
| 4       | Kiểm thử, Go-live & Giám sát     | Kiểm tra toàn hệ thống và chuyển DNS đến địa chỉ IP của Cloud VM             | FCI     | KH          | 2                   |                                        |

## Tổng thời gian dự kiến
Tổng thời gian thực hiện dự kiến là 9 ngày. Các bước 2, 3 và 4 có thể triển khai song song, giúp tối ưu thời gian thực hiện xuống khoảng 6-7 ngày nếu cần thiết.