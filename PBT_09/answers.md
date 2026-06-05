### Câu A1 — DOM Tree

**1. Sơ đồ cây (DOM Tree):**
```text
div#app
├── header
│   ├── h1  ("Todo App")
│   └── nav
│       ├── a.active  ("All")
│       ├── a  ("Active")
│       └── a  ("Completed")
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button  ("Add")
    └── ul#todoList
        ├── li.todo-item  ("Learn HTML")
        └── li.todo-item.completed  ("Learn CSS")

Chọn thẻ <h1>: document.querySelector('h1')

Chọn input trong form: document.querySelector('#todoInput')

Chọn tất cả .todo-item: document.querySelectorAll('.todo-item')

Chọn link đang active: document.querySelector('nav a.active')

Chọn <li> đầu tiên trong #todoList: document.querySelector('#todoList li:first-child')

Chọn tất cả <a> bên trong <nav>: document.querySelectorAll('nav a')

### Câu A2 — innerHTML vs textContent

**1. Sự khác nhau và khi nào sử dụng:**
* **`textContent`**: Lấy ra hoặc gán vào nội dung dưới dạng **văn bản thuần túy (plain text)**. Trình duyệt sẽ bỏ qua và không biên dịch bất kỳ thẻ HTML nào bên trong nó.
    * 👉 *Khi nào dùng:* Ưu tiên dùng trong hầu hết mọi trường hợp, đặc biệt là khi cần in ra màn hình những dữ liệu do người dùng tự nhập vào.
* **`innerHTML`**: Lấy ra hoặc gán vào nội dung **bao gồm cả các thẻ cấu trúc HTML**. Trình duyệt sẽ đọc, biên dịch và hiển thị (render) các thẻ đó thành giao diện thực tế.
    * 👉 *Khi nào dùng:* Chỉ dùng khi bạn chủ động muốn tạo ra một khối giao diện phức tạp từ một nguồn dữ liệu tuyệt đối đáng tin cậy (ví dụ: tự render danh sách từ mảng data nội bộ).

**2. Câu hỏi bảo mật (Lỗ hổng XSS):**
* **Tại sao `innerHTML` gây lỗ hổng XSS?** Vì đặc tính biên dịch mọi thứ truyền vào của nó. Nếu người dùng (hacker) cố tình nhập các thẻ chứa mã độc (như `<script>` hoặc `<img onerror="...">`) vào ô input, `innerHTML` sẽ ép trình duyệt kích hoạt đoạn mã đó. Hậu quả là mã độc sẽ chạy trên máy của người dùng, dẫn đến mất cắp cookie, token hoặc bị thao túng tài khoản.

**3. Sửa đoạn code minh họa:**
* Cách sửa cực kỳ đơn giản: Đổi `innerHTML` thành `textContent`. Lúc này, trình duyệt sẽ coi toàn bộ mã độc chỉ là một chuỗi chữ viết bình thường và in nguyên xi ra màn hình chứ không thực thi nó.

```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// CÁCH SỬA AN TOÀN: Thay innerHTML bằng textContent
document.querySelector("#result").textContent = userInput;

### Câu A3 — Event Bubbling

**1. Output khi click vào button (Mặc định):**
```text
BUTTON
INNER
OUTER
Giải thích: DOM sử dụng cơ chế sủi bọt sự kiện (Event Bubbling). Khi một sự kiện (click) xảy ra ở phần tử con (#btn), nó sẽ chạy event listener ở chính nó trước, sau đó sự kiện sẽ tiếp tục lan truyền (sủi bọt) ngược lên các phần tử cha chứa nó lần lượt là #inner rồi đến #outer. Do đó, kết quả in ra theo thứ tự từ trong ra ngoài.

2. Output nếu uncomment e.stopPropagation():

BUTTON
Giải thích: Lệnh e.stopPropagation() có tác dụng chặn đứng sự sủi bọt của sự kiện. Khi lệnh này chạy tại listener của #btn, sự kiện click sẽ bị hủy ngay lập tức tại đó và không thể lan truyền tiếp lên #inner hay #outer. Kết quả là chỉ có log của chính button đó được in ra.

### Câu C1 — Debug DOM Code

Dưới đây là 7 lỗi sai trong đoạn code gốc và cách khắc phục:

1. **Sai tên sự kiện:** `addEventListener("onclick", ...)` ➔ Sửa thành `addEventListener("click", ...)`
2. **Gán giá trị cho thẻ DOM sai cách:** `countDisplay = count;` ➔ `countDisplay` là một thẻ HTML, không thể gán trực tiếp bằng số. Sửa thành `countDisplay.textContent = count;`
3. **Làm rỗng nội dung HTML sai:** `historyList.innerHTML = null;` ➔ Trình duyệt sẽ ép kiểu và in ra chữ "null" trên màn hình. Sửa thành `historyList.innerHTML = "";`
4. **Gọi hàm thiếu dấu ngoặc:** `item.remove;` ➔ Đây chỉ là tham chiếu đến hàm, chưa thực thi. Sửa thành `item.remove();`
5. **Dùng `innerHTML` cho dữ liệu số (Bad Practice):** `countDisplay.innerHTML = count;` ➔ Nên sửa thành `countDisplay.textContent = count;` để tối ưu hiệu năng và tránh thói quen xấu dẫn đến lỗi bảo mật.
6. **Lỗi kiểu dữ liệu từ LocalStorage:** `count = localStorage.getItem("count");` trả về dữ liệu kiểu `String`. Nếu tiếp tục thao tác tính toán có thể gây lỗi nối chuỗi. ➔ Sửa thành `count = parseInt(localStorage.getItem("count")) || 0;`
7. **Lỗi ngữ cảnh (Scope) của `this`:** Gọi `deleteHistory(this)` bên trong một regular function lồng nhau rất dễ gây lỗi xác định context. ➔ Có thể bỏ luôn hàm `deleteHistory` bên ngoài và dùng Arrow Function nội bộ cho gọn: `li.addEventListener("click", () => li.remove());`

### Câu C2 — Performance

**1. Event Delegation:**
* **Tại sao gán 1000 events là BAD PRACTICE?** Việc gán trực tiếp 1000 event listeners cho 1000 thẻ con riêng biệt sẽ ngốn một lượng lớn bộ nhớ (RAM) của trình duyệt, làm giảm hiệu suất trang web. Thêm vào đó, mỗi khi danh sách được cập nhật (ví dụ: render lại bằng `innerHTML`), các thẻ HTML cũ bị xóa đi sẽ mang theo toàn bộ listener biến mất. Bạn sẽ phải tốn thêm tài nguyên để lặp lại và gán event cho các thẻ mới sinh ra.
* **Event Delegation giải quyết thế nào?** Thay vì gán 1000 listeners, ta chỉ cần gán **1 event listener duy nhất** cho phần tử cha bọc ngoài cùng. Tận dụng cơ chế sủi bọt (Event Bubbling), khi click vào con, sự kiện sẽ lan truyền lên cha. Tại cha, ta dùng `e.target` (kết hợp với `closest()`) để xác định chính xác phần tử con nào đang bị tương tác. Cách này tối ưu bộ nhớ tuyệt đối và tự động tương thích với các phần tử được thêm mới vào DOM sau này.

**2. Tối ưu Reflow bằng DocumentFragment:**

**Đoạn code đã refactor:**
```javascript
// Bước 1: Tạo một kho chứa ảo (không nằm trong DOM thật)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Bước 2: Thêm thẻ vào kho chứa ảo thay vì thêm thẳng vào body
    fragment.appendChild(div); 
}

// Bước 3: Đưa toàn bộ 1000 thẻ từ kho chứa vào DOM thật trong 1 lần duy nhất
document.body.appendChild(fragment);