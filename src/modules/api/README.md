# Tài Liệu API - FinLink Server

## Giới Thiệu

Tài liệu này mô tả các API có trong hệ thống FinLink Server. Hệ thống bao gồm các module chính: Auth (xác thực), User (người dùng), và Email.

## Cấu Trúc API

### 1. API Xác Thực (Auth)

#### Đăng Nhập

- **Phương thức:** `POST`
- **Đường dẫn:** `/auth/login`
- **Nội dung:**
    ```json
    {
    	"email": "example@mail.com",
    	"password": "password123"
    }
    ```
- **Phản hồi:**
    ```json
    {
    	"message": "Đăng nhập thành công",
    	"access_token": "JWT_TOKEN"
    }
    ```

#### Đăng Ký

- **Phương thức:** `POST`
- **Đường dẫn:** `/auth/register`
- **Nội dung:**
    ```json
    {
    	"email": "example@mail.com",
    	"password": "password123",
    	"confirmPassword": "password123",
    	"username": "username"
    }
    ```
- **Phản hồi:**
    ```json
    {
    	"message": "Đăng ký thành công",
    	"user": {
    		// Thông tin người dùng
    	}
    }
    ```

#### Yêu Cầu Đặt Lại Mật Khẩu

- **Phương thức:** `POST`
- **Đường dẫn:** `/auth/reset-password`
- **Nội dung:**
    ```json
    {
    	"email": "example@mail.com",
    	"newPassword": "newpass123",
    	"confirmPassword": "newpass123"
    }
    ```
- **Phản hồi:**
    ```json
    {
    	"message": "Yêu cầu đặt lại mật khẩu đã được gửi"
    }
    ```

#### Xác Nhận Đặt Lại Mật Khẩu

- **Phương thức:** `GET`
- **Đường dẫn:** `/auth/verify-reset-password?email=example@mail.com&token=TOKEN`
- **Phản hồi:**
    ```json
    {
    	"message": "Đặt lại mật khẩu thành công"
    }
    ```

#### Yêu Cầu Xác Thực Email

- **Phương thức:** `POST`
- **Đường dẫn:** `/auth/send-verification-email`
- **Nội dung:**
    ```json
    {
    	"email": "example@mail.com"
    }
    ```
- **Phản hồi:**
    ```json
    {
    	"message": "Yêu cầu xác thực email đã được gửi"
    }
    ```

#### Xác Nhận Email

- **Phương thức:** `GET`
- **Đường dẫn:** `/auth/verify-email?email=example@mail.com&token=TOKEN`
- **Phản hồi:**
    ```json
    {
    	"message": "Xác thực email thành công"
    }
    ```

#### Lấy Thông Tin Người Dùng Hiện Tại

- **Phương thức:** `GET`
- **Đường dẫn:** `/auth/profile`
- **Header:** `Authorization: Bearer JWT_TOKEN`
- **Phản hồi:** Thông tin người dùng hiện tại

### 2. API Người Dùng (User)

#### Lấy Thông Tin Cá Nhân

- **Phương thức:** `GET`
- **Đường dẫn:** `/user/profile`
- **Header:** `Authorization: Bearer JWT_TOKEN`
- **Phản hồi:** Thông tin người dùng hiện tại

#### Cập Nhật Thông Tin Cá Nhân

- **Phương thức:** `PUT`
- **Đường dẫn:** `/user/profile`
- **Header:** `Authorization: Bearer JWT_TOKEN`
- **Nội dung:** Dữ liệu cần cập nhật
- **Phản hồi:** Thông tin người dùng sau khi cập nhật

#### Lấy Thông Tin Người Dùng Theo ID

- **Phương thức:** `GET`
- **Đường dẫn:** `/user/:id`
- **Phản hồi:** Thông tin người dùng với id tương ứng

#### Tìm Người Dùng Theo Email

- **Phương thức:** `GET`
- **Đường dẫn:** `/user/email/:email`
- **Header:** `Authorization: Bearer JWT_TOKEN`
- **Phản hồi:** Thông tin người dùng với email tương ứng

## Bảo Mật

### Xác Thực

Hầu hết các API yêu cầu xác thực đều sử dụng JWT (JSON Web Token). Để truy cập các API được bảo vệ, cần gắn token vào header:

```
Authorization: Bearer JWT_TOKEN
```

Token nhận được từ endpoint đăng nhập và có thời hạn giới hạn.

### Xử Lý Lỗi

Các API sẽ trả về mã trạng thái HTTP phù hợp khi có lỗi:

- 400: Bad Request - Yêu cầu không hợp lệ
- 401: Unauthorized - Không được phép truy cập
- 403: Forbidden - Bị cấm truy cập
- 404: Not Found - Không tìm thấy tài nguyên
- 409: Conflict - Xung đột dữ liệu
- 500: Internal Server Error - Lỗi hệ thống

## Chú Thích

Hệ thống API được phát triển trên nền tảng NestJS, với cấu trúc module được tổ chức rõ ràng. Các module con bao gồm authentication, user management và email service được thiết kế để hoạt động độc lập và có thể mở rộng.
