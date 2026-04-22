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

