### Câu A1: 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có | Không dùng (Mặc định) | Có | Mặc định — mọi element đều bắt đầu thế này. |
| `relative` | Có | Vị trí gốc của chính nó | Có | Làm điểm tọa độ (anchor) cho con `absolute`, hoặc dịch chuyển nhẹ. |
| `absolute` | Không (bay ra khỏi flow) | Cha có `position ≠ static` gần nhất | Có (cuộn cùng cha) | Badge giỏ hàng, dropdown menu, tooltip, overlay. |
| `fixed` | Không (bay ra khỏi flow) | Viewport (Khung nhìn màn hình) | Không (Luôn dính chặt) | Nút Chat, Cookie banner, Nút "Lên đầu trang". |
| `sticky` | Có → Không (khi dính) | Viewport (khi scroll tới ngưỡng) | Có → Không (Dừng lại khi tới ngưỡng `top`/`bottom`) | Sticky header, Sticky table header, Sidebar. |

---

**1. Khi nào `absolute` tham chiếu `body` (hoặc `<html>`)?**
* Khi nó bay ra khỏi flow và đi tìm tọa độ, nhưng **không có bất kỳ thẻ cha nào** chứa nó được thiết lập `position` khác `static` (như `relative`, `absolute`, `fixed`, `sticky`). Lúc này, nó sẽ leo lên đến tận cùng cây DOM và bám vào trang (`<html>` / `body`).

**2. Khi nào tham chiếu `parent`?**
* Khi thẻ cha trực tiếp (hoặc cha vòng ngoài) có thiết lập `position` khác `static` (thường dùng nhất là `position: relative`). Khi đó, thẻ cha này trở thành gốc tọa độ (0,0) cho thẻ `absolute` con.

**3. Giải thích khái niệm "nearest positioned ancestor":**
* **Ancestor** có nghĩa là tổ tiên (cha, ông nội, cụ kỵ...).
* **Positioned** có nghĩa là đã được đặt vị trí (có thuộc tính `position` là `relative`, `absolute`, `fixed`, hoặc `sticky`).
* Tóm lại: **"Nearest positioned ancestor"** là thẻ bọc ngoài gần nhất (tính từ thẻ hiện tại đi ngược lên trên cây HTML) thỏa mãn điều kiện có `position ≠ static`. Đây chính là điểm neo để thẻ `absolute` tính toán tọa độ `top`, `right`, `bottom`, `left`.

### Câu A2: Flexbox vs Grid

Dự đoán layout và sơ đồ bố cục (Text art):

+----------+----------+----------+----------+
|  Item 1  |  Item 2  |  Item 3  |  Item 4  |
+----------+----------+----------+----------+

**Trường hợp 1:**

.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */

+----------+----------+----------+----------+
|  Item 1  |  Item 2  |  Item 3  |  Item 4  |
+----------+----------+----------+----------+

**Trường hợp 2:**

.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */

+------------+   +------------+
|   Item 1   |   |   Item 2   |
+------------+   +------------+

+------------+   +------------+
|   Item 3   |   |   Item 4   |
+------------+   +------------+

+------------+   +------------+
|   Item 5   |   |   Item 6   |
+------------+   +------------+

**Trường hợp 3:**

.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */

+-------+                             +-------+                             +-------+
| Item 1|                             | Item 2|                             | Item 3|
+-------+                             +-------+                             +-------+

**Trường hợp 4:**

.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */

+--------+   +------------------------------------+   +--------+
| 200px  |   |                1fr                 |   | 200px  |
| Item 1 |   |               Item 2               |   | Item 3 |
+--------+   +------------------------------------+   +--------+

**Trường hợp 5:**

.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */

+--------+   +--------+   +--------+
| Item 1 |   | Item 2 |   | Item 3 |
+--------+   +--------+   +--------+

+--------+   +--------+   +--------+
| Item 4 |   | Item 5 |   | Item 6 |
+--------+   +--------+   +--------+

+--------+   
| Item 7 |   
+--------+

### Câu C1: Flexbox vs Grid: Khi nào dùng gì?

**1. Navigation bar ngang (logo + menu + buttons)**
* **Sử dụng:** Flexbox
* **Giải thích:** Đây là layout 1 chiều (một hàng ngang). Flexbox đặc biệt tối ưu trong việc căn chỉnh các phần tử dọc theo một trục, quản lý khoảng cách giữa các nhóm phần tử (ví dụ: dùng `justify-content: space-between`) và căn giữa chúng theo chiều dọc (`align-items: center`).

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
* **Sử dụng:** Grid
* **Giải thích:** Đây là layout 2 chiều (cả hàng và cột). Grid được thiết kế chính xác cho bài toán này. Bạn chỉ cần định nghĩa màng lưới 3 cột (`grid-template-columns: repeat(3, 1fr)`), các bức ảnh mới sẽ tự động tràn xuống các hàng tiếp theo một cách vuông vức và nhất quán.

**3. Layout blog: main content + sidebar**
* **Sử dụng:** Grid
* **Giải thích:** Đối với bố cục vĩ mô (macro-layout) định hình cấu trúc của cả trang, Grid mang lại sự kiểm soát tốt hơn. Bạn có thể dễ dàng chia tỷ lệ không gian cố định giữa nội dung chính và thanh bên (ví dụ: `grid-template-columns: 3fr 1fr`) mà không lo bố cục bị vỡ khi nội dung thay đổi.

**4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)**
* **Sử dụng:** Grid
* **Giải thích:** Dù Flexbox có thể xử lý được, Grid vẫn là lựa chọn sạch và trực quan hơn để tạo ra các cột có độ rộng bằng nhau (`grid-template-columns: repeat(4, 1fr)`). Nó giúp duy trì sự gióng hàng nghiêm ngặt theo phương thẳng đứng ngay cả khi số lượng liên kết ở mỗi cột dài ngắn khác nhau.

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
* **Sử dụng:** Flexbox
* **Giải thích:** Đây là layout 1 chiều dọc (`flex-direction: column`). Flexbox xử lý yêu cầu "nút luôn dính đáy" một cách hoàn hảo. Bằng cách thiết lập phần nội dung chữ ở giữa tự giãn ra để lấp đầy không gian (`flex-grow: 1`), hoặc dùng `margin-top: auto` cho nút bấm, nút sẽ luôn bị đẩy xuống sát mép dưới của card.

### Câu C2: Debug Flexbox

#### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
* **Nguyên nhân:** Container `.card-container` dùng `display: flex`, nên các thẻ `.card` mặc định sẽ cao bằng nhau nhờ `align-items: stretch`. Tuy nhiên, bản thân bên trong mỗi `.card` chưa phải là một flex container. Do đó, nội dung (text, ảnh) chảy theo luồng bình thường. Khi đoạn text ngắn dài khác nhau, nút "Mua" (`.btn`) sẽ không nằm cùng một đường cơ sở ở dưới cùng.
* **Code sửa:**
```css
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex;             /* Thêm Flexbox cho card */
    flex-direction: column;    /* Sắp xếp nội dung theo chiều dọc */
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto;          /* Đẩy nút xuống dưới cùng */
}

#### Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
* **Nguyên nhân:** Class `.hero` mới chỉ khai báo `display: flex` nhưng chưa có các thuộc tính căn chỉnh của Flexbox. Thuộc tính `text-align: center` ở `.hero-content` chỉ có tác dụng căn giữa văn bản (chữ) bên trong khối đó, chứ không thể căn giữa cả khối `.hero-content` ra giữa màn hình (`.hero`).
* **Code sửa:** 
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;   /* Căn giữa khối theo chiều ngang */
    align-items: center;       /* Căn giữa khối theo chiều dọc */
}
.hero-content {
    text-align: center;        /* Giữ nguyên để chữ bên trong cũng nằm giữa */
}

#### Lỗi 3: Sidebar bị co lại khi content quá dài
* **Nguyên nhân:** Trong Flexbox, các flex items mặc định có thuộc tính `flex-shrink: 1` (cho phép phần tử co lại nếu container không đủ chỗ). Khi `.content` có nội dung quá dài và chiếm nhiều diện tích, nó sẽ ép `.sidebar` phải co bé lại, phá vỡ kích thước `width: 250px` ban đầu.
* **Code sửa:**

```css
.layout { 
    display: flex; 
}
.sidebar { 
    width: 250px; 
    flex-shrink: 0;           /* Ngăn không cho sidebar bị co lại */
}
.content { 
    flex: 1; 
}
```