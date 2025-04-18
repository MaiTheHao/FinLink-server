# PHÂN LỚP BACKEND BUSINESS LOGIC

## Layer từ trên xuống

### 1. Controller - "Thằng Tiếp Khách"

- **Vai trò**: Như thằng bảo vệ cửa hàng, kiểm tra khách có quần áo đàng hoàng không rồi mới cho vô
- **Nhiệm vụ**:
    - Validate request cơ bản (kiểu như check xem thằng user có gửi email như "asdas@2342.@@#$" không)
    - Phân loại request (GET, POST, PUT, DELETE) như thằng nhân viên phân loại rác
    - Định dạng response trả về (để thằng frontend đỡ phải khóc)
    - **KHÔNG BAO GIỜ** trực tiếp đụng vào database như thằng cấm vận
- **Dùng _id_**: Vì thằng này nói chuyện với client, mà client thích "id" hơn "\_id" (đéo hiểu sao)

### 2. Service - "Thằng Quản Lý Nhà Hàng"

- **Vai trò**: Như ông chủ quán, biết hết mọi thứ từ A-Z nhưng không tự tay rửa bát
- **Nhiệm vụ**:
    - Validate nghiệp vụ phức tạp (kiểu như: email đã tồn tại chưa? Mật khẩu có đủ an toàn không?)
    - Xử lý toàn bộ business logic (cực kỳ quan trọng, kiểu như đầu bếp chính)
    - Gọi các repository khi cần lấy/lưu dữ liệu (như ông chủ gọi nhân viên)
    - Không care database đang là MongoDB hay MySQL (thậm chí đéo cần biết)
- **Dùng _id_**: Vẫn dùng "id" vì nó là cầu nối giữa controller và repo
- **Xử lý lỗi**: Bắt try/catch, map từ repo error sang HTTP error

### 3. Entity Repository - "Thằng Phục Vụ Chuyên Biệt"

- **Vai trò**: Như anh phục vụ chuyên bàn VIP, chỉ lo một loại khách hàng
- **Nhiệm vụ**:
    - Cung cấp các method đặc thù cho một entity (User, Post, Comment,...)
    - Chuyển đổi domain error thành lỗi cụ thể (vd: `email đã tồn tại` thay vì `duplicate key`)
    - Thêm logic validate đặc thù của entity (VD: User cần validate email)
    - Che giấu thằng base repository như người yêu cũ
- **Dùng \__id_**: Vì MongoDB thích thế, đéo làm theo là nó đánh
- **Exception**: Nên dùng NestJS exception (NotFoundException, ConflictException,...)

### 4. Base Repository - "Thằng Đầu Bếp Phụ"

- **Vai trò**: Như tên đầu bếp phụ lo việc chung chung, cắt hành băm tỏi gọt khoai
- **Nhiệm vụ**:
    - Cung cấp các method CRUD cơ bản (findById, findAll, create, update, delete)
    - Bọc lỗi MongoDB thành ErrorFirstResult<T>
    - Lo các vấn đề như phân trang, sắp xếp, filter chung chung
    - Đứng giữa Repository và Database Module như thằng làm môi giới
- **Dùng \__id_**: Vì làm việc trực tiếp với MongoDB
- **ErrorFirstResult**: Bọc lỗi kiểu [error, result] như NodeJS cổ đại

### 5. Database Module - "Thằng Đứng Quầy Thu Ngân"

- **Vai trò**: Như thằng thu ngân ngồi một chỗ, ai muốn gì cũng phải qua nó
- **Nhiệm vụ**:
    - Kết nối trực tiếp đến database
    - Cung cấp các Model/Entity cho các repository
    - Xử lý pooling, reconnect, các vấn đề kỹ thuật database
    - Không chứa logic nghiệp vụ nào, chỉ lo vận chuyển dữ liệu
- **Dùng \__id_**: Ừ, vì MongoDB là thế

## Dòng chảy xử lý lỗi (hay còn gọi là "Khi lỗi nó chạy lung tung như thằng điên")

1. **Database Module**: Ném ra raw MongoDB errors
2. **Base Repository**: Bọc MongoDB errors thành ErrorFirstResult<T> với code chuẩn
3. **Entity Repository**: Chuyển từ ErrorFirstResult thành NestJS Exception (NotFoundException, ConflictException,...)
4. **Service**: Bắt exception từ repo, xử lý business logic, ném lại HTTP Exception
5. **Controller**: Bắt lỗi từ service (nếu cần) và format response trả về client

## Kết luận (hay còn gọi là bài học đắt giá)

- Error first ([error, result]) chỉ nên dùng ở base repository, từ entity repo trở lên nên dùng Exception
- Mỗi layer chỉ nên làm đúng việc của nó, đừng như thằng làm gì cũng muốn xen vào
- Service mới là vua xử lý business logic, không phải repository hay controller
- Nếu làm sai, cứ chờ 3 tháng sau debug mà khóc!
