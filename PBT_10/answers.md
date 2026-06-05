### Câu A1 — Sync vs Async

**1. Dự đoán thứ tự output:**
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

2. Giải thích cơ chế Event Loop, Microtask Queue, Macrotask Queue:

JavaScript hoạt động dựa trên cơ chế đơn luồng (single-threaded) kết hợp với Event Loop  để xử lý các tác vụ bất đồng bộ. Quy trình thực thi của đoạn code trên diễn ra như sau:

Call Stack (Đồng bộ - Sync): Trình duyệt luôn ưu tiên chạy các dòng code đồng bộ từ trên xuống dưới.

console.log("1 - Start") và console.log("4 - End") được đưa vào Call Stack và chạy ngay lập tức.

Microtask Queue (Hàng đợi ưu tiên cao): Chứa các callback của Promise (ví dụ: .then(), await). Ngay khi Call Stack trống rỗng, Event Loop sẽ ưu tiên quét và chạy cạn kiệt toàn bộ các tác vụ trong Microtask Queue.

Promise log ra "3 - Promise" và "6 - Promise 2" được đưa vào hàng đợi này và chạy ngay sau khi 1 và 4 chạy xong.

Lưu ý: Trong lúc chạy "6 - Promise 2", nó lại gọi thêm một setTimeout chứa "7", lúc này "7" sẽ bị đẩy sang Macrotask Queue.

Macrotask Queue (Hàng đợi ưu tiên thấp): Chứa các callback của Timer như setTimeout, setInterval. Event Loop chỉ lấy các tác vụ ở hàng đợi này ra chạy khi mà cả Call Stack và Microtask Queue đều đã trống trơn.

Do đó, "2 - Timeout 0ms" sẽ chạy đầu tiên trong nhóm này.

Tiếp theo là "7 - Nested timeout" (vừa được đẩy vào ở bước trên).

Cuối cùng, "5 - Timeout 100ms" chạy sau cùng vì nó bị delay một khoảng thời gian là 100ms.

### Câu A2 — Fetch API

Giải thích chi tiết từng dòng code trong hàm `getData()`:

**1. `await fetch(...)`:** * Hàm `fetch` luôn trả về một **Promise**. 
* Ta cần dùng `await` để báo cho JavaScript tạm dừng thực thi tại dòng lệnh này (không làm đơ giao diện), chờ cho đến khi quá trình gửi request hoàn tất và nhận được phản hồi từ server. Khi Promise này chạy xong (resolve), nó sẽ "bóc tách" ra một đối tượng `Response`.

**2. `response.ok`:** * Thuộc tính này trả về `false` khi HTTP Status Code nằm ngoài khoảng thành công (200 - 299). Nghĩa là request đã đến được server nhưng bị báo lỗi về mặt nghiệp vụ/truy cập.
* 3 mã lỗi (status codes) tương ứng thường gặp: 
  * **404** (Not Found): Không tìm thấy tài nguyên/đường dẫn API.
  * **500** (Internal Server Error): Server bị sập hoặc có lỗi logic bên trong.
  * **403** (Forbidden): Bị từ chối truy cập (không đủ quyền).

**3. `response.json()`:** * Việc đọc luồng dữ liệu (body stream) khổng lồ từ server và biên dịch nó thành một đối tượng JavaScript (parse JSON) là một tiến trình tốn thời gian. Do đó, bản thân hàm `.json()` cũng trả về một **Promise**. Ta phải dùng `await` lần thứ hai để chờ quá trình "biên dịch" này hoàn tất mới lấy được dữ liệu data thực tế.

**4. `try...catch`:**
Khối lệnh này đóng vai trò như một màng lọc an toàn, nó sẽ "bắt" (catch) các lỗi sau:
* **Lỗi mạng (Network error):** Rớt mạng internet, sai URL, hoặc bị chặn CORS (lúc này hàm `fetch` bị Reject).
* **Lỗi HTTP API (404, 500,...):** Hàm `fetch` mặc định KHÔNG coi 404 là lỗi. Lỗi này bị bắt là do ta đã chủ động "ném" ra bằng lệnh `throw new Error(...)` bên trong hàm `if (!response.ok)`.
* **Lỗi Parse JSON:** Nếu server trả về chuỗi HTML (ví dụ trang báo lỗi) hoặc chuỗi văn bản thuần thay vì chuẩn định dạng JSON, dòng `await response.json()` sẽ gặp lỗi và lập tức nhảy xuống catch.

### Câu A3 — Promise States & Callback Hell

**1. Sơ đồ 3 trạng thái của Promise:**
```text
                     ┌─── [Resolve] ───▶ Fulfilled (Thành công)
Pending (Đang chờ) ──┤
                     └─── [Reject]  ───▶ Rejected (Thất bại)
                    
2. Giải thích Callback Hell là gì?
Callback Hell (Địa ngục Callback) là tình trạng xảy ra khi ta xử lý nhiều tác vụ bất đồng bộ liên tiếp nhau bằng cách lồng các hàm callback vào bên trong nhau quá nhiều cấp. Hậu quả là mã nguồn bị thụt lề sâu tạo thành hình "kim tự tháp" (Pyramid of Doom), khiến code cực kỳ khó đọc, khó bảo trì và rất khó để bắt lỗi (debug).

3. Ví dụ 4 cấp Callback Hell:

// Gọi tuần tự 4 bước mất 4 giây, lồng nhau lộn xộn
setTimeout(() => {
    console.log("Bước 1: Lấy thông tin User");
    setTimeout(() => {
        console.log("Bước 2: Lấy giỏ hàng");
        setTimeout(() => {
            console.log("Bước 3: Xác nhận thanh toán");
            setTimeout(() => {
                console.log("Bước 4: Gửi email thành công");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

4. Refactor thành Async/Await:

// Tạo một hàm delay trả về Promise để dùng với await
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processOrder() {
    try {
        await delay(1000);
        console.log("Bước 1: Lấy thông tin User");
        
        await delay(1000);
        console.log("Bước 2: Lấy giỏ hàng");
        
        await delay(1000);
        console.log("Bước 3: Xác nhận thanh toán");
        
        await delay(1000);
        console.log("Bước 4: Gửi email thành công");
    } catch (error) {
        console.error("Có lỗi xảy ra:", error);
    }
}

processOrder();