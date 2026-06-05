// === CÁC THÀNH PHẦN DOM ===
const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");
const weatherContainer = document.getElementById("weatherContainer");
const historyList = document.getElementById("historyList");

// === QUẢN LÝ LOCAL STORAGE (LỊCH SỬ TÌM KIẾM) ===
let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

// Render các nút lịch sử
function renderHistory() {
    historyList.innerHTML = "";
    searchHistory.forEach(city => {
        const btn = document.createElement("button");
        btn.className = "history-btn";
        btn.textContent = city;
        // Bấm vào lịch sử sẽ tự động tìm kiếm lại
        btn.addEventListener("click", () => fetchWeather(city));
        historyList.appendChild(btn);
    });
}

// Lưu lịch sử mới (Giới hạn tối đa 5 thành phố gần nhất)
function saveToHistory(city) {
    // 1. Lọc bỏ thành phố nếu đã tồn tại trong mảng (để đưa lên đầu)
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase());
    
    // 2. Thêm vào đầu mảng
    searchHistory.unshift(city);
    
    // 3. Nếu mảng dài hơn 5, cắt bớt phần tử cuối
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    
    // 4. Lưu lại vào LocalStorage & Render
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
    renderHistory();
}

// === GỌI API & XỬ LÝ 3 TRẠNG THÁI ===
async function fetchWeather(city) {
    // TRẠNG THÁI 1: LOADING
    weatherContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Đang tải dữ liệu thời tiết...</p>
        </div>
    `;

    try {
        // Gửi request đến API (Dùng format=j1 để lấy dữ liệu JSON)
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let data;
        try {
            // Cố gắng parse JSON. Nếu API lỗi mạng/chặn, nó có thể trả về HTML gây lỗi Parse
            data = await response.json();
        } catch (parseError) {
            throw new Error("Không tìm thấy thành phố hoặc hệ thống đang bận!");
        }

        // Lấy dữ liệu cần thiết từ JSON
        const current = data.current_condition[0];
        const areaName = data.nearest_area[0].areaName[0].value;

        // TRẠNG THÁI 2: SUCCESS
        weatherContainer.innerHTML = `
            <div class="weather-card">
                <h2>📍 ${areaName}</h2>
                <div class="temp">${current.temp_C}°C</div>
                <p class="desc">${current.weatherDesc[0].value}</p>
                <div class="details">
                    <span>💧 Độ ẩm: ${current.humidity}%</span>
                    <span>💨 Gió: ${current.windspeedKmph} km/h</span>
                </div>
            </div>
        `;

        // Lưu thành phố hợp lệ vào lịch sử
        saveToHistory(areaName);

    } catch (error) {
        // TRẠNG THÁI 3: ERROR
        weatherContainer.innerHTML = `
            <div class="error-state">
                <p>❌ Đã xảy ra lỗi!</p>
                <span class="hint">${error.message}</span>
                <br><br>
                <span class="hint">Hãy thử lại với "Hanoi", "Tokyo", hoặc "London".</span>
            </div>
        `;
        console.error("Lỗi Fetch API:", error);
    }
}

// === LẮNG NGHE SỰ KIỆN SUBMIT FORM ===
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) {
        fetchWeather(city);
        input.value = ""; // Xóa trắng ô input
    }
});

// === KHỞI ĐỘNG APP ===
renderHistory();

// Tự động load thời tiết của thành phố gần nhất nếu có lịch sử
if (searchHistory.length > 0) {
    fetchWeather(searchHistory[0]);
}