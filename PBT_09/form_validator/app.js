// === LẤY CÁC DOM ELEMENTS ===
const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");

// Trạng thái hợp lệ của từng field (Phải xanh hết thì mới mở nút)
const isValidState = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// Hàm kiểm tra tổng thể để bật/tắt nút Submit
function checkOverallForm() {
    // Kiểm tra xem tất cả các giá trị trong object có bằng true không
    const isAllValid = Object.values(isValidState).every(Boolean);
    submitBtn.disabled = !isAllValid;
}

// === 1. XỬ LÝ HỌ VÀ TÊN (2-50 KÝ TỰ) ===
document.getElementById("name").addEventListener("input", function(e) {
    const val = e.target.value.trim();
    const icon = document.getElementById("nameIcon");
    
    if (val.length >= 2 && val.length <= 50) {
        isValidState.name = true;
        e.target.className = "success";
        icon.textContent = "✅";
    } else {
        isValidState.name = false;
        e.target.className = val.length > 0 ? "error" : "";
        icon.textContent = val.length > 0 ? "❌" : "";
    }
    checkOverallForm();
});

// === 2. XỬ LÝ EMAIL (REGEX) ===
document.getElementById("email").addEventListener("input", function(e) {
    const val = e.target.value.trim();
    const errorMsg = document.getElementById("emailError");
    // Regex cơ bản check cấu trúc: text @ text . text
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (emailRegex.test(val)) {
        isValidState.email = true;
        e.target.className = "success";
        errorMsg.textContent = "";
    } else {
        isValidState.email = false;
        e.target.className = val.length > 0 ? "error" : "";
        errorMsg.textContent = val.length > 0 ? "Email không hợp lệ!" : "";
    }
    checkOverallForm();
});

// === 3. XỬ LÝ ĐỘ MẠNH MẬT KHẨU ===
const passwordInput = document.getElementById("password");
passwordInput.addEventListener("input", function(e) {
    const val = e.target.value;
    const bar = document.getElementById("strengthBar");
    const statusText = document.getElementById("passwordStatus");

    // Kiểm tra các điều kiện bằng Regex
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    isValidState.password = false; // Mặc định là false

    if (val.length === 0) {
        bar.style.width = "0";
        statusText.textContent = "";
        e.target.className = "";
    } else if (val.length < 8) {
        // Yếu: Đỏ (< 8 ký tự)
        bar.style.width = "33%";
        bar.style.backgroundColor = "#e74c3c";
        statusText.textContent = "Mật khẩu Yếu (Cần ít nhất 8 ký tự)";
        statusText.style.color = "#e74c3c";
        e.target.className = "error";
    } else if (hasLower && hasUpper && hasNumber && hasSpecial) {
        // Mạnh: Xanh (>= 8 ký tự, có đủ các loại)
        bar.style.width = "100%";
        bar.style.backgroundColor = "#2ecc71";
        statusText.textContent = "Mật khẩu Mạnh";
        statusText.style.color = "#2ecc71";
        isValidState.password = true; 
        e.target.className = "success";
    } else if (hasLetter && hasNumber) {
        // Trung bình: Vàng (>= 8 ký tự, có chữ và số)
        bar.style.width = "66%";
        bar.style.backgroundColor = "#f1c40f";
        statusText.textContent = "Mật khẩu Trung bình";
        statusText.style.color = "#f39c12";
        isValidState.password = true; // Trung bình vẫn cho phép qua
        e.target.className = "success";
    } else {
        // Có >= 8 ký tự nhưng không có đủ chữ và số
        bar.style.width = "33%";
        bar.style.backgroundColor = "#e74c3c";
        statusText.textContent = "Cần có ít nhất chữ và số";
        statusText.style.color = "#e74c3c";
        e.target.className = "error";
    }

    // Trigger lại sự kiện check Confirm Password (nếu user sửa lại pass cũ)
    document.getElementById("confirmPassword").dispatchEvent(new Event("input"));
    checkOverallForm();
});

// === 4. XÁC NHẬN MẬT KHẨU ===
document.getElementById("confirmPassword").addEventListener("input", function(e) {
    const val = e.target.value;
    const errorMsg = document.getElementById("confirmError");

    if (val === "") {
        isValidState.confirm = false;
        errorMsg.textContent = "";
        e.target.className = "";
    } else if (val === passwordInput.value) {
        isValidState.confirm = true;
        errorMsg.textContent = "";
        e.target.className = "success";
    } else {
        isValidState.confirm = false;
        errorMsg.textContent = "Mật khẩu không khớp!";
        e.target.className = "error";
    }
    checkOverallForm();
});

// === 5. SỐ ĐIỆN THOẠI (AUTO FORMAT) ===
document.getElementById("phone").addEventListener("input", function(e) {
    // 1. Loại bỏ tất cả các ký tự KHÔNG phải là số
    let rawNumbers = e.target.value.replace(/\D/g, "");
    let formatted = rawNumbers;

    // 2. Tự động chèn dấu gạch ngang (Format: 0901-234-567)
    if (rawNumbers.length > 4) {
        formatted = rawNumbers.slice(0, 4) + "-" + rawNumbers.slice(4);
    }
    if (rawNumbers.length > 7) {
        formatted = rawNumbers.slice(0, 4) + "-" + rawNumbers.slice(4, 7) + "-" + rawNumbers.slice(7, 10);
    }

    // Gán ngược giá trị đã format lại cho ô input
    e.target.value = formatted;
    
    const icon = document.getElementById("phoneIcon");
    
    // Kiểm tra hợp lệ (đủ 10 số gốc)
    if (rawNumbers.length === 10) {
        isValidState.phone = true;
        icon.textContent = "✅";
        e.target.className = "success";
    } else {
        isValidState.phone = false;
        icon.textContent = rawNumbers.length > 0 ? "❌" : "";
        e.target.className = rawNumbers.length > 0 ? "error" : "";
    }
    
    checkOverallForm();
});

// === 6. XỬ LÝ SUBMIT & MODAL ===
const modal = document.getElementById("successModal");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!submitBtn.disabled) {
        // Đẩy dữ liệu lên Modal
        document.getElementById("modalData").innerHTML = `
            <p><strong>Họ tên:</strong> ${document.getElementById("name").value}</p>
            <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
            <p><strong>Số điện thoại:</strong> ${document.getElementById("phone").value}</p>
        `;
        modal.classList.add("show");
    }
});

// Đóng Modal và Reset Form
document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.classList.remove("show");
    form.reset();
    
    // Reset lại toàn bộ màu sắc, icon, thanh sức mạnh về mặc định
    Object.keys(isValidState).forEach(k => isValidState[k] = false);
    document.querySelectorAll("input").forEach(i => i.className = "");
    document.querySelectorAll(".icon").forEach(i => i.textContent = "");
    document.querySelectorAll(".error-text").forEach(i => i.textContent = "");
    document.getElementById("passwordStatus").textContent = "";
    document.getElementById("strengthBar").style.width = "0";
    checkOverallForm();
});