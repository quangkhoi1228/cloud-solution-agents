---
noteId: "bbcb9e206a3511f0968b9bcbf3b3de7a"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                       | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                           |
| ------- | -------------------------------- | ------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | ------------------------------------- |
| 1       | Khảo sát hệ thống                | Thu thập thông tin về hệ thống hiện tại: cấu hình VM, dữ liệu, dịch vụ        | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng  |
| 2       | Chuẩn bị hạ tầng Cloud          | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng với 2 public IP | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test |
| 3       | Di chuyển Dữ liệu & Ứng dụng    | Chuyển dữ liệu từ VM cũ lên VM mới (SCP/Object Storage), cài đặt ứng dụng Django, khôi phục PostgreSQL      | FCI     | KH          | 3                   | Nên lên kế hoạch cho downtime tối thiểu |
| 4       | Kiểm thử & Go-live               | Kiểm tra toàn bộ hệ thống, chuyển DNS, đảm bảo hoạt động ổn định và hiệu quả   | FCI     | KH          | 2                   | Thời gian kiểm thử có thể khác nhau tùy thuộc vào phản hồi từ KH |

## Tổng thời gian dự kiến
**9 ngày** (có thể giảm xuống ~7 ngày nếu thực hiện song song các bước như 2, 3 và 4).