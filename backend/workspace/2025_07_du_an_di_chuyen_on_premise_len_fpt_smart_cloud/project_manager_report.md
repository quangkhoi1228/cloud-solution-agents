---
noteId: "a335f590690911f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu, network | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị Hạ tầng Cloud          | Tạo VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng VPC, public IP | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển Dữ liệu & Ứng dụng    | Chuyển dữ liệu từ on-premise lên Cloud VM (SCP/Object Storage), cài đặt ứng dụng trên Cloud VM | FCI | KH          | 3                   | Có thể tiến hành song song với task 4 |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn bộ hệ thống, chuyển DNS để điểm đến là hạ tầng Cloud            | FCI     | KH          | 1                   | Phải hoàn thành sau khi di chuyển dữ liệu |

## Tổng thời gian dự kiến
8 ngày (có thể giảm xuống ~5 ngày nếu thực hiện song song giữa các bước 3 và 4).