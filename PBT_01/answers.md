Câu A1:

a,

5 bước xảy ra khi truy cập https://shopee.vn:

B1: Trình duyệt tìm và dịch tên miền shopee.vn thành một địa chỉ IP cụ thể của máy chủ.

B2: Trình duyệt và máy chủ thiết lập kết nối mạng và tạo lớp mã hóa bảo mật (HTTPS) nhằm bảo vệ thông tin.

B3: Trình duyệt chính thức gửi yêu cầu (đơn đặt hàng) tới máy chủ để xin tải nội dung của trang chủ.

B4: Máy chủ tiếp nhận, xử lý yêu cầu và gửi trả lại các gói tài nguyên cần thiết (gồm file HTML, CSS, JavaScript, hình ảnh,...).

B5: Trình duyệt tiến hành đọc các file vừa nhận và hiện ra giao diện hoàn chỉnh trên màn hình của bạn.

*Nguồn tham chiếu chương 01 (01_introduction_html_universe.md)

-Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương

-1. WEB HOẠT ĐỘNG NHƯ THẾ NÀO?

b,

Trong DevTools của Chrome, tab Network cho thấy thông tin	Xem requests/responses	

Ví Dụ: "Website tải chậm — file nào nặng nhất?"


Câu A2:

trang web dưới đây bị Google đánh giá SEO thấp vì sử dụng quá nhiều thẻ <div> mà thẻ <div> trong nhiều trường hợp không phù hợp với yêu cầu

4 lỗi trong đoạn code:

1: `<div class="header">` sửa thành `<header>`

2: `<div class="menu">` sửa thành `<nav>`

3: `<div class="main">` sửa thành `<main>`

4: `<div class="product">` sửa thành `<article class="product">`

5: `<div class="footer">` sửa thành `<footer>`

Câu A3:

thẻ div chiếm toàn bộ chiều ngang của trang

thẻ span và strong chỉ chiếm không gian vừa đủ có thể để các thẻ khác cùng dòng

====================================================================
|                                                                  |
| +--------------------------------------------------------------+ |
| | Hộp 1 (div)                                                  | | 
| +--------------------------------------------------------------+ |
|                                                                  |
|   [Text A]  [Text B]                                             | 
|   (span)    (span)                                               |
|                                                                  |
| +--------------------------------------------------------------+ |
| | Hộp 2 (div)                                                  | | 
| +--------------------------------------------------------------+ |
|                                                                  |
|   [Text C]  [Text D]                                             | 
|   (span)    (strong)                                             |
|                                                                  |
| +--------------------------------------------------------------+ |
| | Hộp 3 (div)                                                  | | 
| +--------------------------------------------------------------+ |
|                                                                  |
====================================================================

Câu A4:

`<thead>`: Chứa các hàng tiêu đề của cột. Trình duyệt thường tự động in đậm chữ ở phần này.

`<tbody>`: Chứa toàn bộ nội dung, dữ liệu chính của bảng.

`<tfoot>`: Nằm ở cuối bảng, thường dùng để chốt lại dữ liệu

nội dung ở chương 5 phần 3 Bảng giải thích từng thẻ

 KHÔNG NÊN dùng table để tạo layout trang web VÌ:

 1: khi thu phóng màn hình cấu trúc sẽ bị phá vỡ

 2: thẻ table chỉ dùng để dựng bản không dùng để dựng khung dao diện

 3: có nhiều công cụ thay thế khác tốt hơn "Anti-pattern từ HTML 4. Dùng CSS Grid hoặc Flexbox — <table> chỉ cho tabular data"

Câu B3:

Lỗi 1: Dòng 1 – Thiếu chữ "html" trong thẻ khai báo – Cách sửa: đổi thành `<!DOCTYPE html>`

Lỗi 2: Dòng 4 – Thiếu thẻ đóng của title – Cách sửa: đổi thành `<title>`Trang web`</title>`

Lỗi 3: Dòng 9 – Sai cú pháp thẻ đóng thiếu dấu / – Cách sửa: đổi `<h1>` ở cuối thành `</h1>`

Lỗi 4: Dòng 13 – Sai cú pháp thẻ đóng thiếu dấu / – Cách sửa: đổi `<a>` ở cuối thành `</a>`

Lỗi 5: Dòng 18 – Lỗi cú pháp: Thiếu dấu " ở thuộc tính src – Cách sửa: Đổi thành `<img src="iphone.jpg">`

Lỗi 6: Dòng 18 – Lỗi ngữ nghĩa: Thẻ` <img>` luôn cần có thuộc tính alt để mô tả ảnh – Cách sửa: Thêm alt,` <img src="iphone.jpg" alt="iPhone 16">`

Lỗi 7: Dòng 20 – Lỗi cú pháp: Sai thứ tự đóng thẻ – Cách sửa: Đổi thành` <p>Giá: <b>25.990.000đ</b></p>`

Lỗi 8: Dòng 26 & 27 – Lỗi ngữ nghĩa: Tiêu đề của bảng phải dùng thẻ` <th> `thay vì `<td>` – Cách sửa: Đổi thành `<th>`Tên`</th>` và `<th>`Giá`</th>`

Lỗi 9: Dòng 35 – Lỗi ngữ nghĩa: Sử dụng nhiều hơn 1 thẻ `<main>`. Vì đây là nội dung sidebar nên dùng thẻ `<aside>` – Cách sửa: Đổi `<main>` và `</main>` ở đoạn này thành `<aside>` và `</aside>`

Lỗi 10: Dòng 40 – Lỗi cú pháp: Thiếu thẻ đóng của đoạn văn – Cách sửa: Đổi thành` <p>Copyright 2026</p>`

Lỗi 11: Dòng cuối cùng – Lỗi cú pháp: Thiếu thẻ đóng toàn bộ tài liệu HTML – Cách sửa: Thêm`</html>` ngay bên dưới thẻ` </body>`

