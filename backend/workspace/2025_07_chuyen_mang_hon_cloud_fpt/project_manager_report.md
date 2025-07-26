---
noteId: "37187880690c11f09c37cba0e5f3f798"
tags: []

---

## Kế hoạch triển khai
| **STT** | **Tên Task**                     | **Mô tả**                                                                         | **PIC** | **Support** | **Duration (ngày)** | **Ghi chú**                             |
| ------- | -------------------------------- | --------------------------------------------------------------------------------- | ------- | ----------- | ------------------- | --------------------------------------- |
| 1       | Khảo sát hệ thống                | Đánh giá hệ thống hiện tại: cấu hình VM, dịch vụ, dữ liệu cần migrate            | KH      | FCI         | 2                   | Khách hàng cung cấp chi tiết hạ tầng    |
| 2       | Chuẩn bị hạ tầng Cloud           | Tạo 2 VM trên FPT Cloud với cấu hình tương đương, thiết lập mạng                | FCI     | KH          | 2                   | Truy cập SSH được chia sẻ cho KH test   |
| 3       | Di chuyển Dữ liệu & Ứng dụng     | Chuyển dữ liệu (SCP/Object Storage), cài đặt ứng dụng Django và khôi phục DB    | FCI     | KH          | 3                   | Thời gian phụ thuộc vào dung lượng dữ liệu |
| 4       | Kiểm thử, Go-live                | Kiểm tra toàn hệ thống, chuyển DNS về FPT Cloud                                  | FCI     | KH          | 2                   | Phải đảm bảo mọi thứ hoạt động trơn tru  |

## Tổng thời gian dự kiến
Tổng thời gian dự kiến của toàn bộ kế hoạch là **9 ngày**. 

**Tối ưu thời gian**: 
- Các bước 2 và 3 có thể thực hiện song song, do đó tổng thời gian có thể giảm xuống còn khoảng **7 ngày**.