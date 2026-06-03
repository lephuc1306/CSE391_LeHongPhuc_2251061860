## Câu A1: Grid System

**1. Bảng phân tích Layout**

| Kích thước | < 768px (xs, sm) | 768px - 991px (md) | ≥ 992px (lg, xl, xxl) |
|------------|---------|---------------|---------|
| Số cột | 1 cột/hàng | 2 cột/hàng | 4 cột/hàng |
| Box layout | Xếp chồng lên nhau (mỗi box chiếm 100% width do `col-12`) | Nằm ngang, 2 box một hàng (mỗi box chiếm 50% width do `col-md-6`) | Nằm ngang, 4 box một hàng (mỗi box chiếm 25% width do `col-lg-3`) |

**2. Giải thích câu hỏi thêm**
- **`col-md-6` nghĩa là gì?** Nghĩa là từ điểm gãy (breakpoint) `md` (kích thước màn hình ≥ 768px) trở lên, phần tử này sẽ chiếm 6 phần trên tổng số 12 cột của Grid System (tương đương 50% chiều rộng của hàng).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap áp dụng tư duy thiết kế **Mobile-First** (ưu tiên thiết bị di động trước). Class `col-12` (không có prefix) là class gốc, nó sẽ áp dụng cho màn hình nhỏ nhất và tự động kế thừa lên các kích thước lớn hơn cho đến khi gặp một breakpoint khác (như `md`) chặn lại. Khoảng `< 768px` đã nằm trọn trong phạm vi chịu ảnh hưởng của `col-12`, nên việc viết thêm `col-sm-12` là dư thừa.

### Câu A2: Utilities & Components

**1. Giải thích class `d-none d-md-block`:**
- Element mang class này sẽ bị **ẩn (không hiển thị)** trên các màn hình có kích thước nhỏ (mobile, chiều rộng < 768px) do chịu tác dụng của class `d-none` (display: none).
- Tuy nhiên, khi màn hình đạt kích thước từ Tablet trở lên (≥ 768px, tức là breakpoint `md`), class `d-md-block` sẽ ghi đè lên, giúp element **hiển thị lại** dưới dạng khối (display: block).
- *Tóm lại:* Ẩn trên Mobile, Hiện trên Tablet và Desktop.

**2. Liệt kê và giải thích 5 spacing utilities:**
1. `mt-3`: **Margin Top** kích thước 3 (tương đương 1rem hoặc 16px). Tạo khoảng cách đẩy phần tử bên trên ra xa.
2. `px-4`: **Padding X** (Left & Right) kích thước 4 (tương đương 1.5rem hoặc 24px). Tạo khoảng đệm bên trong phần tử ở cả 2 cạnh trái và phải.
3. `mb-auto`: **Margin Bottom Auto**. Thường dùng kết hợp trong Flexbox để tự động chiếm hết khoảng trống còn lại ở phía dưới, đẩy các phần tử khác ra xa.
4. `mx-auto`: **Margin X Auto** (margin-left: auto; margin-right: auto). Dùng để căn giữa theo chiều ngang một phần tử dạng block (điều kiện là phần tử đó phải có chiều rộng - width xác định).
5. `py-2`: **Padding Y** (Top & Bottom) kích thước 2 (tương đương 0.5rem hoặc 8px). Tạo khoảng đệm bên trong phần tử ở 2 cạnh trên và dưới.

**3. Sự khác nhau giữa `.container`, `.container-fluid`, và `.container-md`:**
- **`.container`:** Là container có **chiều rộng tối đa (max-width) cố định** thay đổi nhảy bậc theo từng kích thước màn hình (sm, md, lg, xl, xxl). Nó luôn tự động căn giữa và tạo ra khoảng lề (margin) hai bên trên các màn hình lớn.
- **`.container-fluid`:** Là container luôn luôn mở rộng **chiếm 100% chiều rộng màn hình** (`width: 100%`) bất kể thiết bị đang xem là điện thoại hay màn hình siêu rộng.
- **`.container-md`:** Là sự kết hợp. Trên các màn hình nhỏ hơn Tablet (< 768px), nó hoạt động giống như `.container-fluid` (chiếm 100% chiều rộng). Nhưng từ màn hình Tablet (md, ≥ 768px) trở lên, nó bắt đầu có `max-width` cố định và hoạt động giống như `.container` bình thường.

### Câu C1: Tùy biến Bootstrap (Customization)

**1. Giải thích quy trình đổi màu `$primary`:**
Để thay đổi màu gốc của Bootstrap (từ xanh dương mặc định sang đỏ `#E63946`), ta không thể dùng bản CDN liên kết mạng thông thường mà phải tự biên dịch lại mã nguồn của Bootstrap bằng SASS.
- **Công cụ cần có:** Cài đặt Node.js/npm. Cài đặt package `bootstrap` qua npm và một trình biên dịch SASS (như extension *Live Sass Compiler* trên VS Code).
- **Quy trình:**
  1. Tạo một file SASS tùy chỉnh (ví dụ `custom.scss`).
  2. Khai báo đè biến màu sắc ngay ở những dòng đầu tiên của file: `$primary: #E63946;`
  3. Import toàn bộ mã nguồn SASS của Bootstrap vào **SAU** dòng khai báo biến đó: `@import "node_modules/bootstrap/scss/bootstrap";`
  4. Chạy trình biên dịch SASS để dịch file `custom.scss` này thành file `style.css` thuần và gắn file đó vào HTML.

**2. Tại sao NÊN dùng SASS variables thay vì override CSS thuần (VD: `.btn-primary { background: red; }`)?**
- **Tính nhất quán & Tự động hóa:** Biến `$primary` trong SASS của Bootstrap được dùng để tạo ra hàng chục class khác nhau (như `btn-primary`, `text-primary`, `bg-primary`, `border-primary`, `alert-primary`...). Nếu ta đổi giá trị biến `$primary` ở gốc, SASS sẽ tự động tính toán lại, tự động thay đổi màu hover, active và update đồng loạt toàn bộ các component trên web.
- Ngược lại, nếu override bằng CSS thuần, ta sẽ phải thủ công viết lại hàng chục, hàng trăm dòng code cho từng component, rất dễ gây thiếu sót, code bị phình to (phải ghi đè) và cực kì khó bảo trì.

---

### Câu C2: So sánh CSS thuần và Bootstrap

| Tiêu chí | CSS Thuần | Bootstrap 5 |
|----------|-----------|-------------|
| **Số dòng CSS cần viết** | Rất nhiều (khoảng 100 - 300 dòng CSS chỉ cho Navbar responsive và Card). | 0 dòng CSS tùy chỉnh (Toàn bộ thao tác chỉ là gán class có sẵn vào thẻ HTML). |
| **Thời gian phát triển** | Tốn nhiều thời gian (vài tiếng đến vài ngày) để căn chỉnh layout, test responsive trên Mobile/Tablet. | Cực kì nhanh (vài chục phút) do mọi thứ đã được dựng và test độ tương thích sẵn. |
| **Khả năng tùy biến** | Tuyệt đối (100%). Thích làm theo thiết kế lạ mắt, dị biệt nào cũng được. | Thấp hơn. Giao diện thường mang tính rập khuôn (Bootstrap look). Muốn tùy biến sâu bắt buộc phải hiểu vững về SASS. |

**Kết luận:**
- **NÊN dùng Bootstrap khi:** Cần tạo nhanh nguyên mẫu (Prototype / MVP) cho dự án; Cần làm trang quản trị (Admin Dashboard); Team phát triển không có Designer chuyên nghiệp; Các hệ thống cần sự ổn định và nhanh chóng hơn là thẩm mỹ độc lạ.
- **KHÔNG NÊN dùng Bootstrap khi:** Dự án yêu cầu một bản thiết kế UI/UX độc đáo, mang đậm bản sắc thương hiệu riêng; Yêu cầu khắt khe về chuẩn pixel-perfect so với bản vẽ Figma; Các Landing page cần file CSS phải cực kì nhỏ gọn để tối ưu hóa hiệu năng tải trang cao nhất (có thể cân nhắc TailwindCSS thay thế).