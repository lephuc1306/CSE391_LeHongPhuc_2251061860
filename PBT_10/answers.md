 Câu A1 — Sync vs Async

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

### Câu C1 — Error Handling Strategy (Chiến lược xử lý lỗi)

Trong một ứng dụng E-Commerce, chiến lược xử lý lỗi toàn diện được chia làm 4 kịch bản như sau:

**1. Network errors (Mất mạng giữa chừng):**
* **Hiện tượng:** Người dùng đang tải dữ liệu thì bị rớt WiFi hoặc 4G. Hàm `fetch` sẽ ném ra lỗi (Reject) ngay lập tức mà không có HTTP status code.
* **Cách xử lý:** Bọc lệnh fetch trong `try...catch`. Bắt lỗi trong block `catch`, kết hợp kiểm tra `navigator.onLine`. Nếu `navigator.onLine === false`, hiển thị giao diện báo lỗi "Mất kết nối mạng, vui lòng kiểm tra lại WiFi/4G".

**2. API errors (Server trả về mã lỗi HTTP):**
* **Hiện tượng:** Request gửi đi thành công, mạng bình thường, nhưng server xử lý thất bại và trả về mã lỗi (4xx, 5xx). Lỗi này không tự nhảy vào `catch` mà phải kiểm tra `!response.ok`.
* **Cách xử lý:** Đọc `response.status` và quăng ra lỗi (`throw new Error`) để xử lý tùy theo tình huống:
    * **404 (Not Found):** Thông báo "Không tìm thấy sản phẩm này" và điều hướng người dùng về trang chủ.
    * **500 (Internal Server Error):** Thông báo "Hệ thống đang bảo trì hoặc gặp sự cố. Vui lòng thử lại sau ít phút."
    * **429 (Too Many Requests):** Thông báo "Bạn thao tác quá nhanh, vui lòng đợi vài giây rồi thử lại."

**3. Timeout (API phản hồi quá chậm > 10 giây):**
* **Hiện tượng:** Server bị treo, không trả lỗi nhưng cũng không trả data, khiến giao diện quay mòng mòng (loading) vô tận.
* **Giải pháp:** Sử dụng `AbortController` để đếm ngược thời gian, nếu quá hạn thì ép hủy request.

```javascript
// Viết hàm fetchWithTimeout
async function fetchWithTimeout(url, ms = 10000) {
    // Tạo bộ điều khiển để có thể hủy fetch
    const controller = new AbortController();
    
    // Đặt đồng hồ hẹn giờ, hết ms thì kích hoạt hủy
    const timeoutId = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        return response;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Yêu cầu quá hạn (Timeout). Máy chủ phản hồi quá chậm!");
        }
        throw error; // Quăng các lỗi network khác nếu có
    } finally {
        clearTimeout(timeoutId); // Xóa bộ đếm giờ nếu fetch thành công sớm
    }
}

4. Retry logic (Thử lại khi có sự cố mạng):

Hiện tượng: Đường truyền mạng chập chờn, rớt mạng chớp nhoáng rồi có lại.

Giải pháp: Tự động gọi lại API một vài lần trước khi thực sự báo lỗi cho người dùng.

JavaScript
// Viết hàm fetchWithRetry
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            
            // Xử lý riêng lỗi server
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            return response; // Thành công thì trả về kết quả ngay
        } catch (error) {
            console.warn(`Lỗi mạng. Đang thử lại lần ${i + 1}/${maxRetries}...`);
            
            // Nếu đã thử hết số lần cho phép thì quăng lỗi ra ngoài
            if (i === maxRetries - 1) {
                throw new Error("Không thể kết nối đến máy chủ sau nhiều lần thử.");
            }
            
            // Đợi 1 giây trước khi thử lại lần tiếp theo (Delay)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

**1. Bảng so sánh sự khác nhau:**

| Method | Khi nào resolve? (Thành công) | Khi nào reject? (Thất bại) | Use case thực tế (Khi nào dùng) |
|--------|------------------|-----------------|----------|
| **`.all()`** | Khi **TẤT CẢ** các promises đều thành công. Trả về mảng các kết quả. | Khi có **MỘT** promise thất bại (Fail-fast). | Khi cần tất cả dữ liệu bắt buộc phải có mới chạy được app (vd: lấy Profile + Cấu hình hệ thống). |
| **`.allSettled()`** | Khi **TẤT CẢ** các promises đã chạy xong (bất kể thành công hay thất bại). | **Không bao giờ reject.** Luôn trả về mảng chứa trạng thái của từng cái. | Khi gọi nhiều API độc lập, cái nào lỗi thì bỏ qua, cái nào thành công thì hiển thị (vd: Dashboard widget). |
| **`.race()`** | Khi promise **ĐẦU TIÊN** chạy xong và thành công. | Khi promise **ĐẦU TIÊN** chạy xong và thất bại. | Dùng để làm chức năng Timeout (Ép hủy một API nếu gọi quá lâu). |
| **`.any()`** | Khi có promise **ĐẦU TIÊN** thành công. Bỏ qua các cái thất bại. | Khi **TẤT CẢ** đều thất bại (Trả về `AggregateError`). | Gọi cùng 1 dữ liệu từ nhiều server (CDN) khác nhau, server nào phản hồi nhanh nhất thì lấy. |

---

**2. Ví dụ Code thực tế cho từng Method:**

**A. Ví dụ `Promise.all()` (Cần tất cả dữ liệu để render trang)**
```javascript
async function loadUserPage(userId) {
    try {
        // Bắt buộc phải có cả Thông tin User VÀ Quyền truy cập mới cho vào trang
        const [profile, permissions] = await Promise.all([
            fetch(`/api/users/${userId}`).then(r => r.json()),
            fetch(`/api/permissions/${userId}`).then(r => r.json())
        ]);
        renderPage(profile, permissions);
    } catch (error) {
        // Chỉ cần 1 cái lỗi, sẽ văng ra trang 404/Lỗi ngay lập tức
        showError("Không thể tải dữ liệu trang người dùng.");
    }
}

**B. Ví dụ Promise.allSettled() (Các thành phần độc lập)

JavaScript
async function loadDashboard() {
    const results = await Promise.allSettled([
        fetch('/api/weather'), // Thời tiết
        fetch('/api/news'),    // Tin tức
        fetch('/api/ads')      // Quảng cáo
    ]);

    // Lặp qua kết quả, API nào lỗi thì hiển thị thông báo lỗi cục bộ, không sập cả trang
    results.forEach((res, index) => {
        if (res.status === "fulfilled") {
            renderWidget(index, res.value);
        } else {
            showWidgetError(index, "Widget này đang bảo trì.");
        }
    });
}
**C. Ví dụ Promise.race() (Cơ chế Timeout chống kẹt mạng)

JavaScript
// Tạo một Promise tự động báo lỗi sau X giây
const timeout = (ms) => new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Timeout")), ms)
);

async function fetchWithTimeout() {
    try {
        // Đua tốc độ giữa việc gọi API và cái đồng hồ đếm ngược 5 giây
        const response = await Promise.race([
            fetch('/api/heavy-data'),
            timeout(5000) 
        ]);
        console.log("Lấy data thành công trước 5 giây:", await response.json());
    } catch (error) {
        // Nếu API gọi mất 6 giây, Promise timeout sẽ thắng và văng lỗi ở đây
        console.error("Lỗi:", error.message); // In ra "Timeout"
    }
}
**D. Ví dụ Promise.any() (Tối ưu tốc độ với nhiều nguồn backup)

JavaScript
async function fetchAvatar(userId) {
    try {
        // Gọi ảnh từ 3 server dự phòng khác nhau (Châu Á, Châu Mỹ, Châu Âu)
        const avatarUrl = await Promise.any([
            fetch(`https://cdn-asia.com/avatar/${userId}`),
            fetch(`https://cdn-us.com/avatar/${userId}`),
            fetch(`https://cdn-eu.com/avatar/${userId}`)
        ]);
        
        // Server nào mạng mạnh, trả về kết quả ĐẦU TIÊN thì sẽ lấy cái đó luôn!
        const imageBlob = await avatarUrl.blob();
        displayAvatar(imageBlob);
    } catch (error) {
        // Chỉ lọt vào đây nếu CẢ 3 SERVER đều sập!
        console.error("Tất cả CDN đều không thể truy cập", error);
        displayDefaultAvatar();
    }
}