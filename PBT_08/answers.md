### Câu A1 — Function Declaration vs Expression vs Arrow

**1. Code 3 cách viết hàm:**
```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong * (1 - thue) };
}

// 2. Function Expression
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong * (1 - thue) };
};

// 3. Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong * (1 - thue) };
};

**2. Khác biệt về Hoisting:**

Function Declaration được hoisting toàn bộ. Nghĩa là em có thể gọi hàm trước khi định nghĩa nó trong code.

Function Expression và Arrow Function (khi gán bằng let hoặc const) KHÔNG được hoisting phần giá trị hàm, chúng nằm trong vùng chết tạm thời (TDZ - Temporal Dead Zone). Nếu gọi trước khi khai báo sẽ gây ra lỗi ReferenceError.

### Câu A2 —  Scope & Closure

// Đoạn 1:
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
// Output sau 100ms (của vòng lặp var):
var: 3
var: 3
var: 3

// Output sau 200ms (của vòng lặp let):
let: 0
let: 1
let: 2

Tại sao var và let cho kết quả khác nhau trong vòng lặp setTimeout?

Điều này bắt nguồn từ sự khác biệt về Phạm vi (Scope) giữa var và let, kết hợp với cơ chế Bất đồng bộ (Asynchronous) của setTimeout.

Trường hợp dùng var i:

var có phạm vi theo hàm (Function Scope) hoặc toàn cục (Global Scope), không có phạm vi theo khối (Block Scope).

Do đó, trong toàn bộ vòng lặp, chỉ có một biến i duy nhất tồn tại trong bộ nhớ.

setTimeout là một hàm bất đồng bộ. Mảng các callback () => console.log("var:", i) bị đẩy vào Web APIs và chờ 100ms mới được đưa vào Call Stack để chạy.

Lúc các hàm callback này thực sự chạy (sau 100ms), vòng lặp for đã kết thúc từ lâu và giá trị của biến i duy nhất đó đã tăng lên 3. Do cả 3 hàm callback đều tham chiếu chung đến một biến i, chúng đều in ra 3.

Trường hợp dùng let j:

let có phạm vi theo khối (Block Scope).

Khi dùng let trong vòng lặp for, mỗi lần lặp (mỗi một iteration) JS sẽ tạo ra một scope mới và một biến j mới hoàn toàn, độc lập với các lần lặp khác.

Do đó, mỗi callback trong setTimeout sẽ "bắt" (closure) một biến j riêng biệt của riêng vòng lặp đó (lần lượt là j = 0, j = 1, j = 2).

Khi các callback này chạy (sau 200ms), chúng sẽ in ra giá trị j mà chúng đã ghi nhớ trong closure của mình, cho ra kết quả đúng là 0, 1, 2.

### CâuA3  —  Array Methods

// 1. Lấy các số chẵn (Dùng filter để lọc)
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3 (Dùng map để biến đổi)
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả (Dùng reduce để cộng dồn)
const sum = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm số đầu tiên > 7 (Dùng find)
const firstGreaterThan7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không (Dùng some trả về boolean)
const hasGreaterThan10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0 (Dùng every trả về boolean)
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]" (Dùng map kết hợp Template Literal và Ternary Operator)
const oddEvenStrings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng mà không mutate gốc (Dùng Spread Operator copy mảng trước rồi mới reverse)
const reversed = [...nums].reverse();

### CâuA4  —  Object Destructuring & Spread

// Destructuring
console.log(name, price, ram, color);  // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                    // ReferenceError: specs is not defined
// Giải thích: Cú pháp `specs: { ram, color }` lấy trực tiếp `ram` và `color` bên trong, nó KHÔNG tạo ra biến tên là `specs`.

// Spread
console.log(updated.price);            // 23990000 (Đã bị ghi đè bởi thuộc tính price đi sau trong toán tử spread)
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Mảng gốc/Object gốc KHÔNG bị thay đổi bởi toán tử spread)

// Spread gotcha
console.log(product.specs.ram);        // 16
// Giải thích: Spread operator `{ ...product }` chỉ tạo "Shallow Copy" (copy nông) ở lớp ngoài cùng. Các thuộc tính là Object lồng bên trong (như `specs`) vẫn bị tham chiếu (share reference) cùng một ô nhớ với object gốc. Đổi `copy.specs.ram` thì `product.specs.ram` cũng đổi theo.

