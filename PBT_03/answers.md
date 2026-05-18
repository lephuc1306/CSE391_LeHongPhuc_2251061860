
Câu A1:

cách 1:Inline CSS (Nhúng trực tiếp vào thẻ HTML)

-Ví dụ:

' ```html'

-Ưu điểm: Nhanh, độ ưu tiên (specificity) cao nhất.

-Nhược điểm: Không thể tái sử dụng, code HTML bị rối, rất khó bảo trì. Trình duyệt không thể cache được nên trang tải chậm hơn nếu lạm dụng.

-chỉ nên dùng trong trường hợp khẩn cấp hoặc cần ghi đè style tạm thời.

cách 2:Internal CSS

-Ví dụ:

<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>

-Ưu điểm: Gom toàn bộ code CSS về một chỗ dễ nhìn hơn Inline.

-Nhược điểm: Không thể chia sẻ style này cho các trang HTML khác, trang nào phải tự viết style của trang đó.

-Khi nào nên dùng: Chấp nhận được khi làm prototype hoặc trang web đơn giản chỉ có 1 trang (single-page).

cách 3:External CSS

-Ví dụ:

<head>
    <link rel="stylesheet" href="styles.css">
</head>

style.css:

h1 { color: #2563eb; font-size: 32px; }

-Ưu điểm:

+Trình duyệt lưu cache file CSS nên tải trang cực nhanh.

+Tách biệt HTML và CSS, sửa 1 file CSS là đổi giao diện toàn bộ website.

-Nhược điểm: Mất thêm một chút thời gian setup file ban đầu và tốn 1 HTTP request để tải file.

Câu hỏi thêm:

-Inline CSS sẽ được ưu tiên.

-Giải thích: Mặc dù External CSS là cách tốt nhất, nhưng trong thứ tự ưu tiên của trình duyệt, Inline CSS có độ ưu tiên (specificity) cao nhất vì nó gắn trực tiếp lên ngay phần tử đó. Theo luồng của trình duyệt, nó sẽ ưu tiên những gì viết sát với element nhất.
Câu A2:

1. h1                           → Chọn: "ShopTLU"

2. .price                       → Chọn: "25.990.000đ", "45.990.000đ"

3. #app header                  → Chọn: Toàn bộ khối header ("ShopTLU", "Home", "Products", "About")

4. nav a:first-child            → Chọn: "Home"

5. .product.featured h2         → Chọn: "MacBook Pro"

6. article > p                  → Chọn: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..."

7. a[href="/"]                  → Chọn: "Home"
 
8. .top-bar.dark h1             → Chọn: "ShopTLU"

Câu A3:

Trường hợp 1: content-box (mặc định) */
→ Chiều rộng hiển thị = 450px (Bằng Width 400 + Padding trái/phải 40 + Border trái/phải 10)
→ Không gian chiếm trên trang = 470px (Bằng Chiều rộng hiển thị 450 + Margin trái/phải 20)

Trường hợp 2: border-box */
→ Chiều rộng hiển thị = 400px (box-sizing: border-box ép tổng chiều rộng bao gồm cả padding và border phải bằng đúng thuộc tính width đã khai báo)
→ Kích thước content thực tế = 350px (Bằng Tổng width 400 - Padding trái/phải 40 - Border trái/phải 10)
→ Không gian chiếm trên trang = 420px (Bằng Chiều rộng hiển thị 400 + Margin trái/phải 20)

Trường hợp 3: Margin collapse */
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Do hiện tượng "Margin collapse" (Gộp margin) trong CSS. Khi hai block element nằm xếp dọc sát nhau, trình duyệt sẽ không cộng dồn hai giá trị margin dọc (margin-bottom của thằng trên và margin-top của thằng dưới) mà sẽ lấy giá trị LỚN HƠN (ở đây 40px > 25px nên lấy 40px).

 Nâng cao */
→ Khoảng cách = 30px. 
(Giải thích: Khi xảy ra hiện tượng Margin collapse mà có một giá trị âm và một giá trị dương, trình duyệt sẽ tính toán bằng cách cộng hai giá trị lại với nhau: 40px + (-10px) = 30px).

Câu A4:

1. Tính specificity score (a, b, c) cho mỗi rule:

- Rule A (p): (0, 0, 1) - Vì có 1 thẻ HTML.

- Rule B (.price): (0, 1, 0) - Vì có 1 class.

- Rule C (#main-price): (1, 0, 0) - Vì có 1 ID.

- Rule D (p.price): (0, 1, 1) - Vì có 1 class và 1 thẻ HTML.

2. Element:

- Màu hiển thị: Đỏ (red).

- Giải thích: Element sẽ nhận màu của Rule C (#main-price). Trong quy tắc tính điểm Specificity, ID luôn có trọng số cao nhất (1, 0, 0) so với Class hay Tag. Cột điểm bên trái lớn hơn sẽ thắng tuyệt đối các cột bên phải.

3. Nếu thêm <p class="price" id="main-price" style="color: orange;">

- Màu hiển thị: Cam (orange).

- Giải thích: Kiểu viết CSS trực tiếp vào thẻ HTML gọi là Inline Style. Inline Style luôn có độ ưu tiên cao hơn tất cả các External/Internal CSS selectors (ID, Class, Tag), tương đương mức điểm (1, 0, 0, 0).

4. Nếu Rule A thêm !important, element có màu:

- Màu hiển thị: Đen (black).

- Giải thích: Từ khóa `!important` là "vũ khí tối thượng" phá vỡ mọi quy tắc Specificity thông thường. Nó đè bẹp tất cả mọi thứ, bao gồm cả ID selector và Inline Style. Do đó, dù Rule A ban đầu có điểm thấp nhất (0,0,1), nhưng khi được gắn `!important`, nó sẽ giành quyền ưu tiên cao nhất và hiển thị màu đen.
