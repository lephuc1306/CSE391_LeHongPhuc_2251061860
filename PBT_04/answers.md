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

