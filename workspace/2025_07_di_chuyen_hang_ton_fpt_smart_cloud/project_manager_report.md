---
noteId: "380ed3f0689f11f0aa1767f6996928b6"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát & phân tích hệ thống   | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu cần migrate          | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud          | Tạo VM trên FPT Cloud (16 vCPU, 32GB RAM, 5TB SSD), thiết lập mạng             | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & Ứng dụng    | Backup + chuyển dữ liệu bằng SCP/Object Storage, cài đặt ứng dụng, khôi phục DB | FCI     | KH          | 3                   | Bao gồm cả quá trình mất dữ liệu có thể xảy ra |
| 4       | Kiểm thử & Go-live               | Kiểm tra toàn bộ hệ thống, chuyển DNS sang địa chỉ mới, đảm bảo ứng dụng hoạt động | FCI     | KH          | 2                   | Nếu ứng dụng hoạt động bình thường sẽ Go-live ngay |

## Tổng thời gian dự kiến
**9 ngày** (có thể thực hiện song song các bước 2 và 3, rút ngắn tổng thời gian xuống còn khoảng 7 ngày). 

- Các bước 2 và 3 có thể được tối ưu thời gian thực hiện song song, điều này có thể giúp giảm tổng thời gian triển khai.