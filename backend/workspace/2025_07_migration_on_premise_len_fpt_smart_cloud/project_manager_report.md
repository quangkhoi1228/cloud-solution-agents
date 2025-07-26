---
noteId: "a9b784e0694211f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu cần migrate  | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng VPC & public IP    | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển dữ liệu & Ứng dụng     | Chuyển dữ liệu từ on-premise lên Cloud (SCP/Object Storage), cài đặt ứng dụng trên Cloud VMs | FCI     | KH          | 3                   | Sau khi VM đã được tạo và thiết lập     |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống trên Cloud, chuyển DNS, đảm bảo hoạt động ổn định trước khi Go-live | FCI     | KH          | 2                   | Đảm bảo mọi thứ hoạt động như mong muốn   |

## Tổng thời gian dự kiến
9 ngày (có thể giảm xuống còn 7 ngày nếu thực hiện song song các bước chuẩn bị hạ tầng Cloud và di chuyển dữ liệu & ứng dụng)