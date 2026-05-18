
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
