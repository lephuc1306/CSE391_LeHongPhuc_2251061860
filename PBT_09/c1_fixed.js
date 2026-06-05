// === DOM ELEMENTS ===
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

// Đảm bảo count luôn là số nguyên
let count = 0; 

// === EVENTS LẮNG NGHE ===

// Tăng biến đếm
document.querySelector("#incrementBtn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    
    // Xóa chính thẻ li này khi click
    li.addEventListener("click", () => li.remove());
    
    historyList.append(li);
});

// Giảm biến đếm
document.querySelector("#decrementBtn").addEventListener("click", () => {
    count--;
    countDisplay.textContent = count;
});

// Reset biến đếm về 0
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

// Xóa toàn bộ lịch sử (Clear all history)
document.querySelector("#clearHistory").addEventListener("click", () => {
    historyList.innerHTML = ""; // Xóa nhanh bằng cách làm rỗng nội dung cha
});

// === LOCAL STORAGE ===

// Lưu dữ liệu trước khi đóng/tải lại trang (Save to localStorage)
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Tải dữ liệu khi mở trang (Load from localStorage)
window.addEventListener("load", () => {
    // Ép kiểu về số nguyên, nếu null thì gán bằng 0
    count = parseInt(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // Phục hồi lịch sử
    historyList.innerHTML = localStorage.getItem("history") || "";
    
    // Gán lại sự kiện xóa cho các thẻ <li> cũ vừa được load lên từ LocalStorage
    historyList.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => li.remove());
    });
});