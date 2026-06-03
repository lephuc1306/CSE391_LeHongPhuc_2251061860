### Câu A1 — var / let / const
- **Đoạn 1:** In ra `undefined`. Lỗi bất ngờ này gọi là **Hoisting** của `var`. Biến `x` được đưa lên đầu phạm vi nhưng chưa được gán giá trị, nên JS hiểu là nó tồn tại nhưng giá trị là `undefined`.
- **Đoạn 2:** Gây lỗi **ReferenceError** (Cannot access 'y' before initialization). Biến `let` cũng được hoisting nhưng nằm trong "Vùng chết tạm thời" (Temporal Dead Zone), không thể truy cập trước khi khởi tạo.
- **Đoạn 3:** Gây lỗi **TypeError** (Assignment to constant variable). Biến `const` là hằng số, sau khi gán giá trị ở dòng đầu tiên thì không thể gán lại bằng dấu `=`.
- **Đoạn 4:** In ra mảng `[1, 2, 3, 4]`. Mặc dù dùng `const`, nhưng đối với kiểu dữ liệu tham chiếu (như Array, Object), `const` chỉ bảo vệ "địa chỉ bộ nhớ", không bảo vệ nội dung bên trong. Ta không thể gán lại mảng mới (`arr = [5]`), nhưng hoàn toàn có thể đẩy thêm phần tử vào mảng cũ bằng method `.push()`.
- **Đoạn 5:** In ra `"Trong block: 2"` và `"Ngoài block: 1"`. Giải thích: `let` có phạm vi theo khối (Block Scope). Biến `a = 2` bên trong ngoặc nhọn `{}` là một biến hoàn toàn khác, độc lập với biến `a = 1` ở bên ngoài.

---

### Câu A2 — Data Types & Coercion
- `typeof null` → `"object"` (Đây là một lỗi lịch sử của JavaScript từ ngày đầu tiên và giữ nguyên đến giờ để đảm bảo tương thích ngược).
- `typeof undefined` → `"undefined"`
- `typeof NaN` → `"number"` (Not-a-Number nhưng kiểu dữ liệu của nó vẫn thuộc nhóm Number).
- `"5" + 3` → `"53"` (Vì có dấu `+` và chuỗi `"5"`, JS ưu tiên phép **nối chuỗi** - String Concatenation).
- `"5" - 3` → `2` (Vì dấu `-` chỉ dành cho toán học, JS ép kiểu chuỗi `"5"` thành số `5` rồi thực hiện phép trừ - Numeric Coercion).
- `"5" * "3"` → `15` (Dấu `*` ép cả 2 chuỗi thành số rồi nhân).
- `true + true` → `2` (`true` bị ép kiểu thành `1`, `1 + 1 = 2`).
- `[] + []` → `""` (Hai mảng rỗng ép kiểu thành chuỗi rỗng và nối nhau).
- `[] + {}` → `"[object Object]"` (Mảng ép thành chuỗi rỗng `""`, Object ép thành chuỗi `"[object Object]"`, nối lại).
- `{} + []` → `0` (Trên một số trình duyệt, `{}` ở đầu được hiểu là một block code rỗng, dấu `+` đằng trước mảng `[]` ép mảng rỗng thành số `0`).

---

### Câu A3 — So sánh == vs ===
- `5 == "5"` → **true** (Toán tử `==` tự động ép kiểu chuỗi thành số rồi mới so sánh).
- `5 === "5"` → **false** (Toán tử `===` so sánh nghiêm ngặt cả giá trị lẫn kiểu dữ liệu).
- `null == undefined` → **true** (Theo quy tắc JS, hai giá trị này bằng nhau khi dùng `==`).
- `null === undefined` → **false** (Kiểu dữ liệu khác nhau, 1 cái là object, 1 cái là undefined).
- `NaN == NaN` → **false** (Quy tắc đặc biệt: NaN không bao giờ bằng chính nó).
- `0 == false` → **true** (JS ép `false` thành số `0`).
- `0 === false` → **false** (Kiểu dữ liệu khác nhau: number vs boolean).
- `"" == false` → **true** (Chuỗi rỗng `""` và `false` đều bị ép về số `0`).

**Quy tắc:** Từ giờ trở đi, LUÔN LUÔN sử dụng `===` (Strict Equality). 
*Tại sao:* Để tránh các lỗi logic tiềm ẩn do JavaScript tự động ép kiểu sai ý muốn của lập trình viên (Type Coercion).

---

### Câu A4 — Truthy & Falsy
**Danh sách TẤT CẢ các giá trị Falsy trong JavaScript (có 6 giá trị):**
1. `false`
2. `0` (và `-0`, `0n`)
3. `""` (Chuỗi rỗng)
4. `null`
5. `undefined`
6. `NaN`

**Dự đoán kết quả:**
- `if ("0")` → **In "A"** (Chuỗi có nội dung là Truthy).
- `if ("")` → Không in (Chuỗi rỗng là Falsy).
- `if ([])` → **In "C"** (Mảng rỗng là Object, mà Object luôn là Truthy).
- `if ({})` → **In "D"** (Object rỗng là Truthy).
- `if (null)` → Không in (Falsy).
- `if (0)` → Không in (Falsy).
- `if (-1)` → **In "G"** (Mọi số khác 0 đều là Truthy).
- `if (" ")` → **In "H"** (Chuỗi chứa dấu cách không phải là chuỗi rỗng, nên là Truthy).

---

### Câu A5 — Template Literals
Sử dụng backtick ( \` ) và cú pháp `${variable}`:

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

## PHẦN C — SUY LUẬN

### Câu C1: Debug JavaScript

Dưới đây là 6 lỗi trong đoạn code đã cho, giải thích và cách khắc phục:

1. **Lỗi logic toán tử so sánh (Nghiêm trọng nhất):** `if (giaSauGiam = 0)`
   - *Giải thích:* Toán tử `=` là toán tử gán, không phải so sánh. Lệnh này vô tình gán `giaSauGiam` bằng `0`, làm cho biểu thức trong `if` mang giá trị `0` (Falsy), nên dòng `console.log` không bao giờ chạy, đồng thời làm hàm luôn trả về 0.
   - *Cách sửa:* Đổi thành so sánh tuyệt đối `if (giaSauGiam === 0)`.

2. **Lỗi "Ẩn" vòng lặp với `setTimeout` (Closure bug):** `for (var i = 0; i < 5; i++)`
   - *Giải thích:* Biến `var` có function scope. Khi vòng lặp chạy, nó tạo ra 5 cái `setTimeout`, nhưng do dùng `var`, tất cả cùng trỏ chung vào một ô nhớ `i`. Sau 1 giây, vòng lặp đã chạy xong và `i` đạt giá trị 5. Kết quả là in ra 5 dòng `"Item 5"`.
   - *Cách sửa:* Đổi `var i = 0` thành `let i = 0`. `let` có block scope, mỗi vòng lặp sẽ tạo ra một scope riêng với giá trị `i` độc lập.

3. **Lỗi kiểu dữ liệu truyền vào:** `tinhGiaGiamGia("100000", 20)`
   - *Giải thích:* Truyền chuỗi `"100000"` thay vì số. Dù JS có khả năng tự ép kiểu (Type Coercion) khi dùng phép `*` và `-`, nhưng đây là thói quen xấu, dễ gây lỗi NaN nếu chuỗi không hợp lệ hoặc dùng phép `+`.
   - *Cách sửa:* Bỏ ngoặc kép, truyền số `100000`.

4. **Lỗi khai báo biến cũ:** `var giamGia = ...`
   - *Giải thích:* Không nên dùng `var` trong JS hiện đại. Biến `giamGia` tính xong không thay đổi nữa.
   - *Cách sửa:* Nên dùng `const giamGia = ...`

5. **Lỗi xử lý kết quả trả về không đồng nhất:**
   - *Giải thích:* Khi phần trăm sai, hàm trả về chuỗi (`"Phần trăm giảm không hợp lệ"`), nhưng bên dưới lại dùng `console.log("Giá: " + gia2)`. Kết quả in ra `"Giá: Phần trăm giảm không hợp lệ"`, không hợp lý về mặt hiển thị.
   - *Cách sửa:* Nên `throw new Error("...")` thay vì `return string`, hoặc kiểm tra kiểu dữ liệu trả về trước khi in.

6. **Lỗi cú pháp:**
   - *Giải thích:* Thiếu dấu chấm phẩy (`;`) ở cuối hầu hết các dòng lệnh. Mặc dù JS có cơ chế ASI (tự chèn chấm phẩy), nhưng không viết chấm phẩy dễ gây lỗi khó lường khi thu gọn code.

**Code sau khi đã sửa hoàn chỉnh:**
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        throw new Error("Phần trăm giảm không hợp lệ");
    }
    
    const giamGia = (giaBan * phanTramGiam) / 100;
    let giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
try {
    const gia = tinhGiaGiamGia(100000, 20); // Sửa thành số
    console.log("Giá sau giảm: " + gia + "đ");

    const gia2 = tinhGiaGiamGia(50000, 110);
    console.log("Giá: " + gia2 + "đ");
} catch (error) {
    console.error(error.message);
}

// Sửa var thành let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}