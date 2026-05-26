
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

BÀI B1: STYLE TRANG PROFILE

Danh sách 5 loại CSS Selector khác nhau được sử dụng trong file `style.css`:

1. Element Selector (Selector theo tên thẻ):
   - Định dạng trực tiếp các thẻ HTML chuẩn của hệ thống.
   - Ví dụ trong bài: body, header, table, th, td, footer

2. Class Selector (Selector theo lớp):
   - Định dạng các phần tử có chung thuộc tính class nhằm tái sử dụng.
   - Ví dụ trong bài: .container, .profile-img

3. ID Selector (Selector theo định danh đơn nhất):
   - Định dạng cho duy nhất một phần tử đặc thù trên trang thông qua ID.
   - Ví dụ trong bài: #ve-toi, #ky-nang, #lien-he

4. Descendant Selector (Selector phân cấp / con cháu):
   - Định dạng các phần tử nằm bên trong một phần tử cha được chỉ định cụ thể.
   - Ví dụ trong bài:
     - nav a (Thẻ liên kết nằm bên trong thẻ điều hướng)
     - thead tr (Dòng tiêu đề nằm trong khối thead của bảng)
     - footer p (Thẻ đoạn văn nằm trong phần chân trang)

5. Pseudo-class Selector (Selector lớp giả lập trạng thái):
   - Định dạng phần tử dựa trên trạng thái đặc biệt hoặc thứ tự cấu trúc của nó.
   - Ví dụ trong bài:
     - nav a:hover (Khi người dùng di chuột qua liên kết nav)
     - tbody tr:hover (Khi di chuột qua các dòng trong bảng dữ liệu)
     - tbody tr:nth-child(even) (Chọn các dòng có số thứ tự chẵn trong bảng để làm hiệu ứng zebra)

BÀI B2: BOX MODEL LAB

Phần 1 — Chứng minh content-box vs border-box

- Hộp 1 (content-box): chiều rộng thực tế = 350px 
- Hộp 2 (border-box): chiều rộng thực tế = 300px

Giải thích sự khác biệt:
- Với Hộp 1 (content-box): Thuộc tính width (300px) chỉ áp dụng cho phần lõi nội dung (content). Do đó, chiều rộng thực tế hiển thị trên màn hình sẽ cộng dồn thêm padding và border: 300px (content) + 40px (padding 2 bên) + 10px (border 2 bên) = 350px.
- Với Hộp 2 (border-box): Thuộc tính width (300px) được áp dụng cho toàn bộ hộp (bao gồm cả content, padding và border). Trình duyệt sẽ tự động ép phần lõi nội dung nhỏ lại để tổng chiều rộng cuối cùng luôn đúng bằng 300px.

Phần 2 — Layout 3 cột

Tính toán tổng chiều rộng nếu KHÔNG dùng border-box (box-sizing: content-box):
- Cột trái (sidebar): 250px width + (15px padding x 2) = 280px
- Cột giữa (content): 500px width + (20px padding x 2) = 540px
- Cột phải (ads): 250px width + (15px padding x 2) = 280px
- Tổng chiều rộng 3 cột lúc này là: 280px + 540px + 280px = 1100px.

Kết luận: Vì tổng chiều rộng 3 cột (1100px) lớn hơn kích thước của container chứa nó (1000px), layout sẽ bị vỡ (tràn ra ngoài hoặc bị rớt dòng nếu dùng flex-wrap). Khi áp dụng box-sizing: border-box, tổng chiều rộng sẽ được giữ đúng 1000px (250 + 500 + 250) và layout sẽ vừa khít.

BÀI B3: SPECIFICITY BATTLE

Danh sách 10 rules và điểm Specificity từ thấp đến cao:

1. p { color: gray; } -> Điểm: 0,0,1 (1 element)
2. .text { color: blue; } -> Điểm: 0,1,0 (1 class)
3. p.text { color: green; } -> Điểm: 0,1,1 (1 class, 1 element)
4. .text.highlight { color: yellow; } -> Điểm: 0,2,0 (2 class)
5. p.text.highlight { color: orange; } -> Điểm: 0,2,1 (2 class, 1 element)
6. #demo { color: red; } -> Điểm: 1,0,0 (1 ID)
7. p#demo { color: purple; } -> Điểm: 1,0,1 (1 ID, 1 element)
8. #demo.text { color: pink; } -> Điểm: 1,1,0 (1 ID, 1 class)
9. #demo.text.highlight { color: brown; } -> Điểm: 1,2,0 (1 ID, 2 class)
10. p#demo.text.highlight { color: black; } -> Điểm: 1,2,1 (1 ID, 2 class, 1 element)

Trả lời câu hỏi:

- Element cuối cùng hiển thị màu gì? Tại sao?
Trả lời: Element hiển thị màu đen (black). 

Lý do: Bộ chọn thứ 10 (p#demo.text.highlight) có điểm specificity cao nhất là 1,2,1. Theo quy tắc của CSS, quy tắc nào có độ ưu tiên (specificity) cao nhất sẽ ghi đè lên tất cả các quy tắc có điểm thấp hơn, bất kể nó được viết ở đâu trong file.

- Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.
Trả lời: Không đổi. 

Giải thích: Thứ tự trên dưới (dòng code nào viết sau) chỉ có tác dụng phân định thắng thua khi hai bộ chọn có CÙNG số điểm specificity. Trong trường hợp bài tập này, cả 10 bộ chọn đều có điểm số hoàn toàn khác biệt nhau, nên trình duyệt sẽ luôn luôn ưu tiên màu của bộ chọn có điểm cao nhất (1,2,1) bất kể bạn đảo nó lên đầu hay xuống cuối file.

(Ghi chú: Đã đính kèm ảnh chụp kết quả hiển thị màu của chữ Hello World)

Câu C1: Debug CSS Layout

1. Tính chiều rộng thực tế (với content-box mặc định):
- Sidebar: Width (300px) + Padding L/R (20px * 2) + Border L/R (1px * 2) = 342px
- Content: Width (660px) + Padding L/R (30px * 2) + Border L/R (1px * 2) = 722px

2. Giải thích tại sao layout bị vỡ:

Tổng chiều rộng thực tế của hai khối khi nằm ngang là: `342px + 722px = 1064px`.
Tuy nhiên, `.container` chứa chúng chỉ có chiều rộng là `960px`. Vì `1064px > 960px`, không đủ không gian trên cùng một dòng, nên phần tử `.content` bị đẩy rớt xuống dòng dưới, làm vỡ layout.

3. Đưa ra 2 cách sửa khác nhau:
- Cách 1 (Dùng border-box): Thêm thuộc tính `box-sizing: border-box;` cho cả sidebar và content. Trình duyệt sẽ ép tổng kích thước (bao gồm cả padding và border) bằng đúng `width` đã khai báo. Khi đó tổng width là `300px + 660px = 960px` (vừa khít container).
- Cách 2 (Không dùng border-box): Giữ nguyên `content-box` mặc định, nhưng phải tự trừ đi padding và border khi set thuộc tính `width`.
  - Sidebar: `300px - 40px (padding) - 2px (border) = 258px`
  - Content: `660px - 60px (padding) - 2px (border) = 598px`

Câu C2: Cascade Puzzle

1. "Sản phẩm A" (h2) có `font-size` = ? và `color` = ?
- font-size: 20px
- color: green
- Giải thích: - Về `font-size`: Phần tử này khớp với rule `.card .title { font-size: 20px; }`. Dù `body` có 16px và `.container` có 14px, nhưng CSS áp dụng rule nhắm trực tiếp vào phần tử với độ ưu tiên cao nhất.
  - Về `color`: Phần tử này chịu tác động của `#featured .title { color: red; }` (độ ưu tiên cao do có ID). NHƯNG nó cũng có class `.highlight` với rule `color: green !important;`. Từ khóa `!important` phá vỡ mọi quy tắc Cascade và Specificity, ép buộc phần tử nhận màu xanh lá (green).

2. "Mô tả sản phẩm" (p trong card featured) có `color` = ?
- **color: blue**
- **Giải thích:** Thẻ `<p>` này khớp với rule `.card p { color: inherit; }`. Thuộc tính `inherit` có tác dụng ép phần tử này kế thừa giá trị từ phần tử cha trực tiếp của nó. Cha của nó là thẻ `<div class="card" id="featured">`. Thẻ cha này nhận rule `.card { color: blue; }`. Do đó, thẻ `<p>` cũng lấy màu xanh dương (blue).

3. "Sản phẩm B" (h2) có `font-size` = ? và `color` = ?
- **font-size: 20px**
- color: blue
- Giải thích: - Về `font-size`: Khớp với rule `.card .title { font-size: 20px; }`.
  - Về `color`: Phần tử `h2` này không có class `.highlight` hay ID `#featured`, cũng không có rule CSS nào quy định màu trực tiếp cho nó. Do đó, theo tính chất kế thừa (inheritance) mặc định của text trong CSS, nó lấy màu từ phần tử cha bao bọc nó là `.card { color: blue; }`.

4. "Mô tả sản phẩm B" (p.highlight) có `color` = ?
- color: green
- Giải thích: Thẻ `<p>` này khớp với 2 rule: `.card p { color: inherit; }` (độ ưu tiên 0,1,1) và `.highlight { color: green !important; }` (độ ưu tiên 0,1,0). Mặc dù rule `.card p` có độ ưu tiên cao hơn, nhưng class `.highlight` có chứa từ khóa `!important`, giúp nó giành quyền ưu tiên tuyệt đối, hiển thị màu xanh lá (green).