// === DOM ELEMENTS ===
const refreshBtn = document.getElementById("refreshBtn");
const timeIndicator = document.getElementById("timeIndicator");

const weatherWidget = document.getElementById("weatherWidget");
const userWidget = document.getElementById("userWidget");
const dogWidget = document.getElementById("dogWidget");

// === CÁC HÀM FETCH API ĐỘC LẬP ===

// 1. Lấy thời tiết Hà Nội (Open-Meteo)
async function fetchWeather() {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true");
    if (!res.ok) throw new Error("Lỗi API Thời tiết");
    return res.json();
}

// 2. Lấy thông tin 1 người dùng ngẫu nhiên (Random User)
async function fetchUser() {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error("Lỗi API Người dùng");
    return res.json();
}

// 3. Lấy ảnh chó ngẫu nhiên (Dog CEO)
async function fetchDog() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!res.ok) throw new Error("Lỗi API Ảnh cún");
    return res.json();
}

// === CÁC HÀM RENDER UI TỪNG WIDGET ===

function setWidgetLoading(widget, title) {
    widget.innerHTML = `
        <h3>${title}</h3>
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Đang tải...</p>
        </div>
    `;
}

function setWidgetError(widget, title, errorMsg) {
    widget.innerHTML = `
        <h3>${title}</h3>
        <div class="error-msg">❌ ${errorMsg}</div>
    `;
}

// === HÀM CHÍNH: TẢI TOÀN BỘ DASHBOARD ===
async function loadDashboard() {
    // Vô hiệu hóa nút refresh trong lúc tải
    refreshBtn.disabled = true;
    refreshBtn.textContent = "Đang làm mới...";
    timeIndicator.textContent = "Đang tải dữ liệu...";

    // Đưa 3 widget về trạng thái Loading
    setWidgetLoading(weatherWidget, "🌤️ Thời tiết Hà Nội");
    setWidgetLoading(userWidget, "👤 Khách hàng ngẫu nhiên");
    setWidgetLoading(dogWidget, "🐕 Pet ngẫu nhiên");

    // Đánh dấu thời điểm bắt đầu
    const startTime = Date.now();

    try {
        // GỌI 3 API SONG SONG VỚI ALLSETTLED
        const results = await Promise.allSettled([
            fetchWeather(),
            fetchDog(),    // Đảo vị trí để test index
            fetchUser()
        ]);

        // --- Xử lý Kết quả Widget 1: Thời Tiết (Index 0) ---
        if (results[0].status === "fulfilled") {
            const data = results[0].value.current_weather;
            weatherWidget.innerHTML = `
                <h3>🌤️ Thời tiết Hà Nội</h3>
                <div class="weather-temp">${data.temperature}°C</div>
                <p style="text-align:center; color:#718096;">Sức gió: ${data.windspeed} km/h</p>
            `;
        } else {
            setWidgetError(weatherWidget, "🌤️ Thời tiết Hà Nội", results[0].reason.message);
        }

        // --- Xử lý Kết quả Widget 2: Dog (Index 1) ---
        if (results[1].status === "fulfilled") {
            const imgUrl = results[1].value.message;
            dogWidget.innerHTML = `
                <h3>🐕 Pet ngẫu nhiên</h3>
                <img src="${imgUrl}" class="dog-image" alt="Cute dog">
            `;
        } else {
            setWidgetError(dogWidget, "🐕 Pet ngẫu nhiên", results[1].reason.message);
        }

        // --- Xử lý Kết quả Widget 3: Random User (Index 2) ---
        if (results[2].status === "fulfilled") {
            const user = results[2].value.results[0];
            userWidget.innerHTML = `
                <h3>👤 Khách hàng ngẫu nhiên</h3>
                <div class="user-profile">
                    <img src="${user.picture.large}" alt="Avatar">
                    <h4>${user.name.first} ${user.name.last}</h4>
                    <p style="color:#718096; font-size:14px; margin-top:5px;">📧 ${user.email}</p>
                </div>
            `;
        } else {
            setWidgetError(userWidget, "👤 Khách hàng ngẫu nhiên", results[2].reason.message);
        }

    } catch (error) {
        console.error("Lỗi hệ thống:", error);
    } finally {
        // Tính tổng thời gian hoàn thành
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        
        timeIndicator.textContent = `✅ Dữ liệu được tải xong trong ${timeTaken} ms`;
        
        // Mở lại nút Refresh
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = "🔄 Refresh All";
    }
}

// === GÁN SỰ KIỆN ===
refreshBtn.addEventListener("click", loadDashboard);

// Tự động tải lần đầu khi mở web
loadDashboard();