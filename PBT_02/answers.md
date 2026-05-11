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

Câu B1:

HTML5 không thể tự động so sánh hai trường input (password và confirm password) có giống nhau hay không, nó chỉ có thể validate định dạng của từng ô riêng lẻ. Để kiểm tra hai ô khớp nhau, em bắt buộc phải dùng JavaScript.

Câu C1:

Lỗi 1: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method
Sửa: <form action="#" method="POST">

Lỗi 2: Dòng 2 — Input "Tên" không có <label for="...">, thiếu id và name, vi phạm accessibility
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 3: Dòng 4 — Input "Email" không có <label>, chỉ dùng placeholder, thiếu id và name
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 4: Dòng 6, 7 — Input "Password" không có <label>, thiếu id và name (dữ liệu sẽ không được gửi đi)
Sửa: 
<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd" placeholder="Mật khẩu" required>
<label for="pwd_confirm">Nhập lại mật khẩu:</label> <input type="password" id="pwd_confirm" name="pwd_confirm" placeholder="Nhập lại mật khẩu" required>

Lỗi 5: Dòng 9 — Input "Phone" không có <label> và dùng sai type="text" (nên dùng type="tel")
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567" pattern="[0-9]{10}">

Lỗi 6: Dòng 11 đến 14 — Thẻ <select> thiếu <label>, id, name; thẻ <option> thiếu giá trị value
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city" required> <option value="">-- Chọn thành phố --</option> <option value="hn">Hà Nội</option> <option value="hcm">TP.HCM</option> </select>

Lỗi 7: Dòng 16 đến 18 — Thẻ <label> "Tôi đồng ý" thiếu thẻ <input type="checkbox"> bên trong để tick chọn
Sửa: <label for="terms"><input type="checkbox" id="terms" name="terms" required> Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 20 — Nút submit dùng <input type="submit"> (cú pháp cũ), nên dùng thẻ <button> (best practice)
Sửa: <button type="submit">Gửi</button>

 Câu C2:

1, Viết pattern regex cho CMND/CCCD và Số tài khoản:

CMND/CCCD (đúng 12 chữ số): pattern="[0-9]{12}"

Số tài khoản (từ 10 đến 15 chữ số): pattern="[0-9]{10,15}"

(Lưu ý: Đối với mã PIN 6 chữ số và không hiển thị, ta sẽ kết hợp type="password" và pattern="[0-9]{6}")

2,

CHƯA đủ an toàn vì HTML5 validation chỉ hoạt động ở phía Client (trình duyệt người dùng). Bất kỳ ai có kiến thức cơ bản về IT đều có thể dễ dàng lách luật bằng cách mở Developer Tools (F12) để xóa các thuộc tính required, pattern hoặc minlength trong mã HTML. Thậm chí, họ có thể dùng các công cụ như Postman để gửi thẳng dữ liệu độc hại lên Server mà không cần qua giao diện Form. Do đó, đối với ngân hàng, bắt buộc phải có Validation ở cả Frontend và Backend.

3, Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript/Backend):

1. Kiểm tra chéo giữa các ô input (Cross-field validation): Ví dụ như so sánh ô Mật khẩu và ô Nhập lại mật khẩu xem có khớp nhau 100% hay không.

2. Kiểm tra dữ liệu từ cơ sở dữ liệu (Asynchronous validation): Ví dụ như kiểm tra xem số CMND/CCCD hoặc Email này đã có ai đăng ký trên hệ thống ngân hàng hay chưa.

3. Kiểm tra logic nghiệp vụ phức tạp: Ví dụ như tính toán tuổi từ ngày sinh để đảm bảo khách hàng phải đủ đúng 18 tuổi tính đến ngày hôm nay, hoặc kiểm tra số tiền chuyển đi có vượt quá số dư tài khoản hay không.

4, Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:

1, Tấn công SQL Injection / XSS: Hacker có thể vượt qua HTML5 để gửi các đoạn mã độc (script) hoặc mã truy vấn SQL vào form. Nếu Backend không kiểm tra lại, hệ thống có thể bị đánh cắp toàn bộ dữ liệu người dùng hoặc bị xóa sạch cơ sở dữ liệu.

2, Toàn vẹn dữ liệu (Data Corruption) & Trục lợi: Hacker có thể gửi các giá trị vô lý (ví dụ: Số tiền chuyển khoản là số âm -1000000 hoặc số quá lớn). Nếu Backend không validate lại, nó có thể dẫn đến việc cập nhật sai số dư tài khoản, gây thiệt hại tài chính nặng nề cho ngân hàng.

