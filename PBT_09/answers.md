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

