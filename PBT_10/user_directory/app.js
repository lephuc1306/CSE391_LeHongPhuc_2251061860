// ==========================================
// 1. API LAYER - Chuyên gọi data
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Không thể tải danh sách người dùng.");
        return res.json();
    },
    
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Thêm người dùng thất bại.");
        return res.json();
    },
    
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Cập nhật thất bại.");
        return res.json();
    },
    
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Xóa thất bại.");
        return true;
    }
};

// ==========================================
// 2. UI LAYER - Chuyên hiển thị giao diện
// ==========================================
const ui = {
    grid: document.getElementById("userGrid"),
    toastContainer: document.getElementById("toastContainer"),
    
    renderUsers(users) {
        if (users.length === 0) {
            this.grid.innerHTML = "<p>Không tìm thấy người dùng nào.</p>";
            return;
        }

        this.grid.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <h4>${user.name}</h4>
                <p>📧 ${user.email}</p>
                <p>📞 ${user.phone}</p>
                <div class="card-actions">
                    <button class="btn-warning edit-btn">Sửa</button>
                    <button class="btn-danger delete-btn">Xóa</button>
                </div>
            </div>
        `).join("");
    },

    showLoading() {
        // Render 6 thẻ Skeleton Loading
        this.grid.innerHTML = Array(6).fill(`
            <div class="skeleton-card">
                <div class="skeleton-line title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        `).join("");
    },

    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        
        // Tự động xóa toast sau 3 giây
        setTimeout(() => toast.remove(), 3000);
    },
    
    showError(message) { this.showToast(message, "error"); },
    showSuccess(message) { this.showToast(message, "success"); }
};

// ==========================================
// 3. APPLICATION LOGIC - Điều phối luồng chạy
// ==========================================
let currentUsers = [];
let isEditing = false;

// DOM Elements cho Form
const form = document.getElementById("userForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const userIdInput = document.getElementById("userId");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const searchInput = document.getElementById("searchInput");

// KHỞI ĐỘNG: Tải danh sách
async function initApp() {
    try {
        ui.showLoading();
        currentUsers = await api.getUsers();
        ui.renderUsers(currentUsers);
    } catch (error) {
        ui.showError(error.message);
        ui.grid.innerHTML = "<p style='color:red;'>Lỗi tải dữ liệu.</p>";
    }
}

// CREATE & UPDATE (Xử lý Form Submit)
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Gói data từ input
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    try {
        // Tạm vô hiệu hóa nút để tránh spam click
        submitBtn.disabled = true;
        submitBtn.textContent = "Đang xử lý...";

        if (isEditing) {
            // CALL API: Cập nhật
            const id = userIdInput.value;
            const updatedUser = await api.updateUser(id, userData);
            
            // Cập nhật mảng local (Fake DB update)
            currentUsers = currentUsers.map(u => u.id == id ? updatedUser : u);
            ui.showSuccess("Đã cập nhật thông tin!");
            resetForm();
        } else {
            // CALL API: Thêm mới
            const newUser = await api.createUser(userData);
            
            // Thêm vào đầu mảng local (JSONPlaceholder luôn trả về ID 11 cho POST)
            // Ta gán tạm một ID ngẫu nhiên để UI không bị trùng ID nếu add nhiều lần
            newUser.id = Date.now(); 
            currentUsers.unshift(newUser);
            ui.showSuccess("Thêm user thành công!");
            form.reset();
        }
        
        ui.renderUsers(currentUsers);
        
    } catch (error) {
        ui.showError(error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isEditing ? "Cập nhật" : "Thêm mới";
    }
});

// XÓA & CHUẨN BỊ SỬA (Event Delegation trên User Grid)
ui.grid.addEventListener("click", async (e) => {
    const card = e.target.closest(".user-card");
    if (!card) return;
    
    const id = card.dataset.id;

    // 1. Chức năng XÓA
    if (e.target.classList.contains("delete-btn")) {
        if (!confirm("Bạn có chắc chắn muốn xóa user này?")) return;
        
        try {
            e.target.textContent = "Đang xóa...";
            await api.deleteUser(id);
            
            // Xóa khỏi mảng local và render lại
            currentUsers = currentUsers.filter(u => u.id != id);
            ui.renderUsers(currentUsers);
            ui.showSuccess("Đã xóa thành công!");
            
            if (isEditing && userIdInput.value == id) resetForm();
        } catch (error) {
            ui.showError(error.message);
            e.target.textContent = "Xóa";
        }
    }

    // 2. Chức năng SỬA (Đưa data lên Form)
    if (e.target.classList.contains("edit-btn")) {
        const user = currentUsers.find(u => u.id == id);
        if (user) {
            isEditing = true;
            formTitle.textContent = "Chỉnh sửa User";
            submitBtn.textContent = "Cập nhật";
            cancelBtn.hidden = false;
            
            userIdInput.value = user.id;
            nameInput.value = user.name;
            emailInput.value = user.email;
            phoneInput.value = user.phone;
            
            // Cuộn trang lên form mượt mà
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// HỦY SỬA
cancelBtn.addEventListener("click", resetForm);

function resetForm() {
    isEditing = false;
    form.reset();
    formTitle.textContent = "Thêm User Mới";
    submitBtn.textContent = "Thêm mới";
    cancelBtn.hidden = true;
    userIdInput.value = "";
}

// TÌM KIẾM (Client-side filter)
searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = currentUsers.filter(u => 
        u.name.toLowerCase().includes(keyword) || 
        u.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

// Chạy ứng dụng
initApp();