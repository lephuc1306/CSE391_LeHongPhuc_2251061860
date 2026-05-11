Câu A1

type="email" → Ô nhập text (mobile có phím @), tự kiểm tra định dạng phải chứa @ → Dùng cho form đăng ký nhận bản tin/tài khoản.

type="password" → Ô nhập ẩn ký tự (hiện dấu * hoặc chấm), không tự validate → Dùng để khách hàng nhập mật khẩu đăng nhập.

type="tel" → Ô nhập text (mobile hiện bàn phím số), không tự validate định dạng → Dùng để điền số điện thoại liên hệ khi chốt đơn.

type="number" → Ô nhập có nút tăng/giảm, tự chặn nhập chữ và kiểm tra min/max/step → Dùng để chọn số lượng sản phẩm trong giỏ hàng.

type="date" → Ô nhập xổ ra bộ lịch (Datepicker), tự kiểm tra ngày hợp lệ và giới hạn min/max → Dùng để chọn ngày hẹn giao hàng.

type="color" → Nút mở bảng chọn màu (Color Picker), tự ép giá trị về chuẩn mã HEX → Dùng để khách hàng tự phối màu sản phẩm (VD: màu áo in).

type="search" → Ô nhập text có thêm nút "X" để xóa nhanh, không tự validate → Dùng làm thanh tìm kiếm sản phẩm trên Header.

type="range" → Thanh trượt (slider), tự giới hạn giá trị trong khoảng min/max → Dùng làm thanh kéo lọc khoảng giá sản phẩm.

type="file" → Nút bấm tải tệp, tự kiểm tra định dạng đuôi file nếu dùng thêm accept → Dùng để khách tải ảnh/video thực tế lên phần đánh giá.

type="url" → Ô nhập text (mobile có phím .com), tự kiểm tra phải chứa giao thức http:// hoặc https:// → Dùng để các Shop đối tác nhập link website cá nhân.

Câu A2

TH1: Form không thể Submit, hiện lỗi: "Vui lòng điền vào trường này" vì thuộc tính required bắt buộc người dùng phải nhập dữ liệu. Ô input đang để trống (value rỗng) nên vi phạm điều kiện này.

TH2: Form không thể Submit, hiện lỗi: "Vui lòng bao gồm '@' trong địa chỉ email" vì thuộc tính type="email" tự động ép người dùng phải nhập đúng chuẩn email. Chuỗi "abc" bị thiếu ký tự @ bắt buộc.

TH3: Form không thể Submit, hiện lỗi: "Giá trị phải nhỏ hơn hoặc bằng 10" vì thuộc tính max="10" thiết lập mức giới hạn trần lớn nhất là 10. Giá trị 15 đã vượt quá giới hạn cho phép.

TH4: Form không thể Submit, hiện lỗi: "Vui lòng khớp với định dạng được yêu cầu" vì thuộc tính pattern dùng regex [0-9]{10} bắt buộc phải nhập đúng 10 chữ số. Chuỗi "abc123" vừa chứa chữ cái, vừa chỉ dài 6 ký tự nên bị từ chối.

TH5: Form VẪN Submit bình thường (không hiện lỗi) nếu người dùng bấm Submit ngay lập tức. Nhưng nếu người dùng sửa đổi nội dung (ví dụ gõ thêm 1 ký tự) rồi Submit, form sẽ bị chặn và hiện lỗi yêu cầu nhập đủ 8 ký tự vì Trình duyệt có một ngoại lệ với minlength: nó chỉ kiểm tra validation khi ô input bị người dùng chỉnh sửa (trạng thái dirty). Vì value="123" là dữ liệu gán sẵn, nếu người dùng không chạm vào, trình duyệt sẽ bỏ qua bước kiểm tra này.

Câu A3:

1. <label for="email"> rất quan trọng vì: Screen reader sẽ đọc to "Email" khi user focus vào ô input, giúp người khiếm thị biết họ cần nhập gì, Người dùng có thể click vào chữ "Email" để con trỏ chuột tự nhảy vào ô input, rất hữu ích trên điện thoại.

2. Dùng <fieldset> và <legend> khi cần nhóm các trường thông tin có liên quan logic với nhau trong một form lớn. Ví dụ: Nhóm 3 ô input "Tỉnh/Thành", "Quận/Huyện", "Số nhà" vào trong <fieldset> có <legend> là "Thông tin giao hàng".

3. aria-label dùng khi ô input hoặc nút bấm không có text hiển thị trên màn hình (ví dụ: Nút tìm kiếm chỉ có icon kính lúp). KHÔNG nên dùng khi đã có <label> vì nó gây trùng lặp thông tin, screen reader sẽ đọc hai lần gây khó chịu cho người dùng.

Câu A4:

1,

loading="lazy" chỉ thị cho trình duyệt hoãn việc tải hình ảnh cho đến khi người dùng cuộn chuột tới gần nó. Nó giúp web load nhanh hơn và tiết kiệm băng thông. Không nên dùng cho các hình ảnh ở ngay trên cùng (above-the-fold/Hero image) vì người dùng cần thấy chúng ngay lập tức khi mở web.

2,

Nên cung cấp nhiều <source> vì không phải trình duyệt nào cũng hỗ trợ chung một định dạng video. 3 format phổ biến: mp4, webm, ogg.

3,

Thuộc tính alt dùng để hiển thị text thay thế khi ảnh bị lỗi không tải được, và để screen reader đọc cho người khiếm thị.

Ảnh iPhone: alt="Điện thoại iPhone 16 màu đen bản 256GB"

Ảnh trang trí: alt=""

Ảnh biểu đồ: alt="Biểu đồ cột hiển thị doanh thu tăng trưởng 20% trong quý 1 năm 2026"

Câu A5:

Cách 1 (<img>): Dùng khi hình ảnh chỉ là một phần của luồng văn bản, không cần chú thích đi kèm. Ví dụ: Icon logo công ty trên thanh menu, ảnh avatar nhỏ của người dùng.

Cách 2 (<figure>): Dùng khi hình ảnh là một nội dung độc lập, có ý nghĩa riêng và CẦN một câu chú thích (<figcaption>) gắn liền với nó. Ví dụ: Ảnh sản phẩm kèm giá tiền trong trang danh mục, hoặc ảnh minh họa biểu đồ trong một bài báo.

