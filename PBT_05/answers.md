### Câu A1: Viewport & Mobile-First

**1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.**

* **Thẻ chuẩn:** ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

Giải thích:

name="viewport": Khai báo cho trình duyệt biết thẻ này dùng để kiểm soát và điều chỉnh viewport (vùng hiển thị nội dung trang web trên thiết bị).

width=device-width: Yêu cầu trình duyệt thiết lập chiều rộng của viewport bằng đúng với chiều rộng vật lý của màn hình thiết bị đang sử dụng.

initial-scale=1.0: Thiết lập mức độ thu phóng ban đầu là 100% (tỷ lệ 1:1) khi trang web được tải lần đầu, giúp trang web không bị tự động phóng to hay thu nhỏ ngoài ý muốn.

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? 

Nếu thiếu thẻ này, các trình duyệt trên thiết bị di động (như Safari trên iPhone) sẽ giả định rằng trang web này được thiết kế dành cho Desktop.

Nó sẽ render (kết xuất) trang web trên một viewport ảo với độ rộng mặc định của Desktop (thường khoảng 980px).

Sau đó, trình duyệt sẽ tự động thu nhỏ toàn bộ trang web lại để nhét vừa vào màn hình điện thoại. Hậu quả là hình ảnh, bố cục và chữ trên trang web sẽ hiển thị cực kỳ nhỏ, người dùng không thể đọc được nội dung mà bắt buộc phải dùng ngón tay phóng to (pinch-to-zoom) và cuộn ngang cuộn dọc liên tục để xem.

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?

Sự khác nhau:

Mobile-First (Ưu tiên di động): Bắt đầu viết code CSS mặc định cho màn hình nhỏ nhất (điện thoại) trước. Sau đó, sử dụng Media Query @media (min-width: ...) để "nâng cấp", thêm các thuộc tính CSS cho các thiết bị màn hình lớn hơn (tablet, desktop).

Desktop-First (Ưu tiên máy tính): Bắt đầu viết code CSS mặc định cho giao diện màn hình lớn trước. Sau đó, sử dụng Media Query @media (max-width: ...) để ghi đè, ẩn bớt hoặc tinh chỉnh lại giao diện cho các thiết bị màn hình nhỏ.

Ví dụ CSS:

Ví dụ Mobile-First:

CSS
/* CSS mặc định chạy trên Mobile (màn hình nhỏ) */
.container {
    width: 100%;
    padding: 10px;
}

/* Breakpoint nâng cấp cho Tablet/Desktop (từ 768px trở lên) */
@media (min-width: 768px) {
    .container {
        width: 750px;
        padding: 20px;
    }
}
Ví dụ Desktop-First:

CSS
/* CSS mặc định chạy trên Desktop (màn hình lớn) */
.container {
    width: 1200px;
    padding: 20px;
}

/* Breakpoint điều chỉnh cho Mobile (nhỏ hơn 768px) */
@media (max-width: 767.98px) {
    .container {
        width: 100%;
        padding: 10px;
    }
}
Tại sao Mobile-First được khuyên dùng?

Tối ưu hiệu suất (Performance): Thiết bị di động thường có cấu hình yếu và mạng chậm hơn máy tính. Với Mobile-First, trình duyệt trên điện thoại chỉ cần tải và đọc các đoạn CSS cơ bản nhất, bỏ qua các khối @media (min-width) của màn hình lớn. Ngược lại, với Desktop-First, điện thoại phải tải một đống CSS phức tạp của Desktop, rồi lại tải thêm CSS ghi đè để bóp nhỏ lại, gây lãng phí tài nguyên và làm chậm trang.

Tư duy thiết kế cốt lõi: Việc thiết kế từ màn hình nhỏ ép buộc lập trình viên phải tập trung vào những tính năng và nội dung quan trọng nhất của trang web, tránh nhồi nhét. Việc "xây thêm phòng" (scale-up từ mobile lên desktop) luôn dễ dàng và logic hơn việc "đập bỏ phòng" (scale-down từ desktop xuống mobile).

### Câu A2A2: Breakpoints

Dưới đây là các breakpoints chuẩn được hệ thống hóa theo tài liệu của framework Bootstrap 5. Việc phân chia cột cho lưới sản phẩm sẽ mở rộng dần theo tư duy Mobile-First:

| Breakpoint (Class) | Kích thước pixel | Thiết bị đại diện | Ví dụ: Lưới sản phẩm nên hiển thị |
| :--- | :--- | :--- | :--- |
| **X-Small (xs)** | `< 576px` | Điện thoại di động (cầm dọc) | **1 cột** (Ảnh to, chữ rõ ràng nhất) |
| **Small (sm)** | `>= 576px` | Điện thoại (cầm ngang) hoặc Tablet nhỏ | **2 cột** |
| **Medium (md)** | `>= 768px` | Máy tính bảng (iPad cầm dọc) | **2 hoặc 3 cột** |
| **Large (lg)** | `>= 992px` | Laptop, màn hình Desktop cỡ nhỏ | **3 hoặc 4 cột** |
| **Extra Large (xl)** | `>= 1200px` | Màn hình Desktop tiêu chuẩn | **4 cột** |
| **XX-Large (xxl)** | `>= 1400px` | Màn hình Desktop cỡ lớn, màn hình siêu rộng | **4, 5 hoặc 6 cột** (Tùy kích thước card) |

### Câu A3: Media Queries

Dựa vào đoạn CSS viết theo phương pháp Mobile-First (sử dụng `min-width`), dưới đây là các giá trị `width` tương ứng của `.container` khi được render trên các kích thước màn hình khác nhau:

| Chiều rộng màn hình | `.container` width |
| :--- | :--- |
| 375px (iPhone SE) | **100%** |
| 600px | **540px** |
| 800px | **720px** |
| 1000px | **960px** |
| 1400px | **1140px** |

**Giải thích:**
* **375px:** Không thỏa mãn bất kỳ breakpoint nào, trình duyệt lấy giá trị mặc định là `100%`.
* **600px:** Thỏa mãn điều kiện lớn hơn `576px`, áp dụng `width: 540px`.
* **800px:** Thỏa mãn điều kiện lớn hơn `768px` (ghi đè dòng 576px), áp dụng `width: 720px`.
* **1000px:** Thỏa mãn điều kiện lớn hơn `992px` (ghi đè các dòng trên), áp dụng `width: 960px`.
* **1400px:** Thỏa mãn điều kiện lớn hơn `1200px` (điều kiện lớn nhất), áp dụng `width: 1140px`.

### Câu A4: SCSS Basics

**Giải thích 4 tính năng chính của SCSS và ví dụ:**

**1. Variables (Biến - `$primary-color`)**
* **Giải thích:** Cho phép lưu trữ các giá trị thường xuyên sử dụng lại (như mã màu, font chữ, kích thước) vào một "biến" duy nhất. Khi cần thay đổi, chỉ cần sửa giá trị của biến ở một chỗ, toàn bộ file sẽ tự động cập nhật theo.
* **Ví dụ:**
    ```scss
    $primary-color: #7c3aed;
    
    .button {
        background-color: $primary-color;
        border: 1px solid $primary-color;
    }
    ```

**2. Nesting (Viết CSS lồng nhau)**
* **Giải thích:** SCSS cho phép viết các selector lồng vào nhau theo đúng cấu trúc phân cấp của HTML. Việc này giúp code gọn gàng, dễ đọc, dễ quản lý hơn và tránh việc phải viết lặp lại tên selector cha nhiều lần. Ký tự `&` được dùng để đại diện cho selector cha trực tiếp (thường dùng cho các trạng thái như `:hover` hoặc class giả).
* **Ví dụ:**
    ```scss
    .navbar {
        background: #333;
        
        ul {
            list-style: none;
        }
        
        a {
            color: white;
            text-decoration: none;
            
            &:hover {
                color: $primary-color; /* Dấu & đại diện cho thẻ 'a' */
            }
        }
    }
    ```

**3. Mixins (`@mixin`, `@include`)**
* **Giải thích:** Khá giống với "hàm" (function) trong lập trình. Tự định nghĩa một cụm thuộc tính CSS bằng `@mixin`, sau đó có thể gọi lại cụm đó ở bất kỳ đâu bằng `@include`. Mixin cực kỳ mạnh mẽ vì nó có thể nhận tham số truyền vào để thay đổi giá trị linh hoạt.
* **Ví dụ:**
    ```scss
    @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .hero-banner {
        @include flex-center;
        height: 100vh;
    }
    ```

**4. `@extend` / Inheritance (Kế thừa)**
* **Giải thích:** Cho phép một class chia sẻ (kế thừa) toàn bộ các thuộc tính CSS của một class khác. Giúp tránh lặp lại code cho các phần tử có chung kiểu dáng cơ bản nhưng chỉ khác biệt một vài chi tiết nhỏ (ví dụ: các nút bấm cơ bản và nút bấm mang tính cảnh báo).
* **Ví dụ:**
    ```scss
    .btn-base {
        padding: 10px 20px;
        border-radius: 5px;
        text-align: center;
    }
    
    .btn-danger {
        @extend .btn-base; /* Kế thừa toàn bộ padding, border-radius... */
        background-color: red;
        color: white;
    }
    ```

---

**Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?**

* **Tại sao không đọc được:** Trình duyệt web (Chrome, Safari, Edge...) chỉ được lập trình để hiểu và biên dịch 3 ngôn ngữ cốt lõi là HTML, CSS và JavaScript. SCSS là một ngôn ngữ tiền xử lý (preprocessor) chứa các cú pháp nâng cao (biến, vòng lặp, mixin...) mà engine của trình duyệt không có bộ giải mã (parser) để đọc hiểu.
* **Bước cần thiết để chuyển đổi:** Bắt buộc phải trải qua một bước gọi là **Biên dịch (Compile)**. Bước này sử dụng một trình biên dịch (như extension *Live Sass Compiler* trên VS Code, Webpack, hoặc Vite) để dịch toàn bộ mã code `.scss` thành mã `.css` tiêu chuẩn. Sau đó, file `.css` (đầu ra) mới là file được nhúng vào thẻ `<link>` trong HTML để trình duyệt sử dụng.

### Bài B3 - Biên dịch SCSS

Để chuyển SCSS -> CSS, có thể sử dụng các cách sau:

**Cách 1: Sử dụng Extension "Live Sass Compiler" trên VS Code (Khuyên dùng)**
- Chỉ cần nhấn vào nút **"Watch Sass"** ở thanh Status Bar phía dưới màn hình VS Code. Trình biên dịch sẽ tự động chạy ngầm và tạo ra file `style.css` mỗi khi lưu file.

**Cách 2: Sử dụng dòng lệnh bằng Node.js (Sass CLI)**
Nếu đã cài đặt `sass` qua npm, chạy lệnh sau trong Terminal (đứng ở thư mục gốc của dự án):
```bash
"npx sass scss/style.scss style.css --watch"

### Bài C1: Phân tích trang web thực

**Phân tích sự thay đổi layout:**

* **Navigation thay đổi thế nào?**
    * **Desktop (1440px):** Có một thanh tìm kiếm (search bar) lớn ở giữa header. Bên trái là menu Sidebar mở rộng hiển thị đầy đủ icon và text (Trang chủ, Shorts, Kênh đăng ký...).
    * **Tablet (768px):** Thanh tìm kiếm bị thu ngắn lại. Sidebar bên trái bị thu gọn thành dạng "Mini Sidebar" (chỉ còn icon, mất chữ) hoặc bị ẩn đi, người dùng phải bấm vào icon Hamburger (☰) góc trái trên cùng để mở ra dạng Drawer (ngăn kéo).
    * **Mobile (375px):** Thanh tìm kiếm dài hoàn toàn biến mất, thay bằng một icon kính lúp đơn giản. Thanh Sidebar bên trái biến mất hoàn toàn, thay vào đó YouTube chuyển Navigation xuống dưới cùng màn hình (Bottom Navigation Bar) để tiện thao tác bằng ngón cái.
* **Lưới content thay đổi mấy cột?**
    * **Desktop:** Lưới video hiển thị **4 đến 5 cột** tùy độ phân giải.
    * **Tablet:** Lưới video giảm xuống còn **2 hoặc 3 cột**.
    * **Mobile:** Lưới video gộp lại chỉ còn **1 cột** duy nhất, mỗi ảnh thumbnail của video trải dài 100% chiều rộng màn hình.
* **Elements nào bị ẩn trên mobile?**
    * Toàn bộ menu Sidebar bên trái.
    * Khung nhập text tìm kiếm (chỉ hiện lại khi bấm vào kính lúp).
    * Nút "Tạo video" (hình máy quay) hoặc các tính năng mở rộng trên header bị ẩn vào trong menu phụ.
    * Mô tả ngắn của video (thường thấy ở giao diện list) bị ẩn, chỉ giữ lại Tiêu đề, Tên kênh và Lượt xem.
* **Font size có thay đổi không?**
    * **Có.** Tiêu đề video trên Mobile thường có font-size nhỏ hơn so với Desktop để tránh bị rớt dòng quá nhiều. Tuy nhiên, các icon ở thanh điều hướng dưới cùng lại được thiết kế tương đối lớn để dễ dàng chạm (tap target size tối ưu cho ngón tay).


**Giải thích nhanh:**
* YouTube sử dụng rất nhiều media queries để tính toán số lượng cột video. Ví dụ, họ dùng `@media (min-width: 1144px)` và `@media (max-width: 1311px)` để điều chỉnh thuộc tính `calc()` cho chiều rộng của mỗi component card video, đảm bảo lưới luôn lấp đầy màn hình một cách linh hoạt (Fluid Grid) trước khi nhảy sang một số lượng cột mới.

### Bài C2: Thiết kế Responsive Strategy (Đặt bàn nhà hàng)

### 1. Phân tích Sơ đồ bố cục (Wireframe Strategy)

**📱 Mobile (Dưới 768px) - Thiết kế mặc định:**
- **Layout tổng thể:** Xếp chồng theo chiều dọc (1 cột duy nhất) để người dùng dễ cuộn (scroll).
- **Những gì bị ẩn:** Các chi tiết trang trí rườm rà trên Header hoặc Hero image bị ẩn đi. Chỉ giữ lại Logo và nút gọi điện thoại/đặt bàn nổi bật.
- **Grid ảnh món ăn:** Xếp thành lưới 2 cột (2x3) hoặc 1 cột để ảnh đủ lớn dễ nhìn.
- **Form nằm đâu:** Form đặt bàn nằm ngay dưới lưới ảnh món ăn, trải dài full chiều rộng (100%) màn hình.
- **Bản đồ:** Nằm dưới cùng, ngay trên Footer.

**💊 Tablet (Từ 768px đến 1023px):**
- **Layout tổng thể:** Bắt đầu tận dụng chiều ngang màn hình.
- **Grid ảnh món ăn:** Hiển thị lưới 3 cột, 2 hàng (3x2).
- **Form và Bản đồ nằm đâu:** Đặt Form và Bản đồ nằm cạnh nhau (mỗi phần chiếm 50% chiều rộng) bằng Grid 2 cột để tối ưu không gian hiển thị.

**💻 Desktop (Từ 1024px trở lên):**
- **Layout tổng thể:** Chia thành **2 cột chính** (Tỷ lệ 2:1 hoặc 7:3).
- **Sidebar có không:** Có. Cột bên phải (nhỏ hơn) sẽ đóng vai trò là một **Sidebar** chứa Form đặt bàn (được thiết kế dạng `position: sticky` để luôn trượt theo màn hình).
- **Cột chính (bên trái):** Chứa Hero Image, Grid 6 ảnh món ăn (3 cột), và Bản đồ Google Maps.