// --- STATE MANAGEMENT ---
let students = JSON.parse(localStorage.getItem("students")) || []; // Đọc từ localStorage [cite: 75]
let editingId = null;

// --- DOM ELEMENTS --- [cite: 57-64]
const tableBody = document.getElementById("table-body");
const modal = document.getElementById("student-modal");
const form = document.getElementById("student-form");
const modalTitle = document.getElementById("modal-title");
const notification = document.getElementById("notification");

// --- INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    renderStudents();
});

// --- RENDER & STATS --- [cite: 73-77]
function renderStudents() {
    if (students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Chưa có dữ liệu sinh viên.</td></tr>`;
    } else {
        // Dùng map() sinh chuỗi HTML
        tableBody.innerHTML = students.map((s, index) => `
            <tr data-id="${s.id}">
                <td>${index + 1}</td>
                <td>${s.code}</td>
                <td>${s.name}</td>
                <td>${s.dob}</td>
                <td>${s.className}</td>
                <td>${s.email}</td>
                <td><strong>${s.score}</strong></td>
                <td>
                    <button class="btn btn-warning btn-edit">Sửa</button>
                    <button class="btn btn-danger btn-delete">Xóa</button>
                </td>
            </tr>
        `).join("");
    }
    updateStatistics();
}

function updateStatistics() { // [cite: 110]
    const total = students.length;
    document.getElementById("total-count").textContent = total;
    
    // Tính điểm TB bằng reduce()
    const avg = total === 0 ? 0 : students.reduce((sum, s) => sum + s.score, 0) / total;
    document.getElementById("avg-score").textContent = avg.toFixed(2);
}

function saveStudents() { // [cite: 110]
    localStorage.setItem("students", JSON.stringify(students)); // [cite: 84]
}

// --- MODAL CONTROLS ---
function openModal(mode = "add") {
    modal.classList.remove("hidden");
    if (mode === "add") {
        editingId = null;
        modalTitle.textContent = "Thêm sinh viên mới";
        resetForm();
    } else {
        modalTitle.textContent = "Cập nhật sinh viên"; // [cite: 92]
    }
}

function closeModal() {
    modal.classList.add("hidden");
    resetForm();
}

function resetForm() { // [cite: 110]
    form.reset();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");
}

function showNotification(message, type = "success") { // [cite: 54, 222]
    notification.textContent = message;
    notification.className = `notification ${type}`;
    setTimeout(() => notification.classList.add("hidden"), 3000);
}

// --- EVENT LISTENERS ---

// 1. Mở modal thêm sinh viên [cite: 66, 79]
document.getElementById("btn-open-modal").addEventListener("click", () => openModal("add"));

// 2. Đóng modal [cite: 67]
document.getElementById("btn-close-modal").addEventListener("click", closeModal);
document.getElementById("btn-cancel").addEventListener("click", closeModal);

// 3. Xử lý Form Submit (Thêm/Sửa) [cite: 68, 70, 81]
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn reload trang
    
    // Lấy dữ liệu từ form [cite: 105]
    const formData = {
        code: document.getElementById("code").value.trim(),
        name: document.getElementById("name").value.trim(),
        dob: document.getElementById("dob").value,
        className: document.getElementById("className").value.trim(),
        email: document.getElementById("email").value.trim(),
        score: parseFloat(document.getElementById("score").value)
    };

    if (!validateForm(formData)) return; // Không lưu nếu lỗi [cite: 238]

    if (editingId) {
        // Cập nhật sinh viên (Immutable update) [cite: 93]
        students = students.map(s => s.id === editingId ? { ...s, ...formData } : s);
        showNotification("Cập nhật thành công!");
    } else {
        // Thêm mới sinh viên [cite: 83]
        const newStudent = { id: Date.now(), ...formData };
        students.push(newStudent);
        showNotification("Thêm sinh viên thành công!");
    }

    saveStudents(); // [cite: 84, 94]
    renderStudents(); // [cite: 85, 95]
    closeModal(); // [cite: 87]
});

// 4. EVENT DELEGATION cho nút Sửa/Xóa trong bảng 
tableBody.addEventListener("click", (e) => {
    // Tìm thẻ tr chứa nút được click
    const row = e.target.closest("tr");
    if (!row) return;
    
    const id = Number(row.dataset.id);

    // Bấm nút Sửa [cite: 69, 89]
    if (e.target.classList.contains("btn-edit")) {
        const student = students.find(s => s.id === id); // [cite: 90]
        if (student) {
            editingId = id;
            document.getElementById("code").value = student.code; // [cite: 91]
            document.getElementById("name").value = student.name;
            document.getElementById("dob").value = student.dob;
            document.getElementById("className").value = student.className;
            document.getElementById("email").value = student.email;
            document.getElementById("score").value = student.score;
            openModal("edit");
        }
    }

    // Bấm nút Xóa [cite: 71, 98]
    if (e.target.classList.contains("btn-delete")) {
        if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) { // [cite: 99]
            students = students.filter(s => s.id !== id); // [cite: 100]
            saveStudents(); // [cite: 101]
            renderStudents(); // [cite: 102]
            showNotification("Đã xóa sinh viên!");
        }
    }
});

// --- FORM VALIDATION --- (Bài tập về nhà) [cite: 225-242]
function validateForm(data) {
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");

    // Check Mã SV (Bắt đầu bằng SV + 3 số) [cite: 233]
    if (!/^SV\d{3}$/.test(data.code)) {
        document.getElementById("err-code").textContent = "Mã SV không hợp lệ (VD: SV001)";
        isValid = false;
    } else if (!editingId && students.some(s => s.code === data.code)) {
        document.getElementById("err-code").textContent = "Mã SV đã tồn tại!";
        isValid = false;
    }

    if (data.name.length < 3) { // [cite: 234]
        document.getElementById("err-name").textContent = "Tên phải có ít nhất 3 ký tự";
        isValid = false;
    }

    if (!data.dob) { // [cite: 231]
        document.getElementById("err-dob").textContent = "Vui lòng chọn ngày sinh";
        isValid = false;
    }

    if (data.className.length < 2) {
        document.getElementById("err-className").textContent = "Lớp học không hợp lệ";
        isValid = false;
    }

    // Check Email [cite: 229]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        document.getElementById("err-email").textContent = "Email không đúng định dạng";
        isValid = false;
    }

    // Check Điểm [cite: 230, 235]
    if (isNaN(data.score) || data.score < 0 || data.score > 10) {
        document.getElementById("err-score").textContent = "Điểm phải từ 0 đến 10";
        isValid = false;
    }

    return isValid;
}