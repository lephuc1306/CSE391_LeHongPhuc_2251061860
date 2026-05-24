// --- STATE MANAGEMENT ---
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingId = null;

// --- DOM ELEMENTS ---
const taskList = document.getElementById("task-list");
const modal = document.getElementById("task-modal");
const form = document.getElementById("task-form");
const notification = document.getElementById("notification");

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

// --- RENDER & STATS ---
function renderTasks() {
    if (tasks.length === 0) {
        taskList.innerHTML = `<div class="empty-state">📭 Chưa có công việc nào. Hãy thêm mới!</div>`;
    } else {
        taskList.innerHTML = tasks.map(t => {
            const badgeClass = t.priority.split(" ")[0]; // Lấy chữ đầu (Cao/Trung/Thấp) để style
            return `
            <div class="task-card ${t.completed ? 'completed' : ''} priority-${t.priority}" data-id="${t.id}">
                <div class="task-header">
                    <h3 class="task-title">${t.title}</h3>
                    <span class="badge ${badgeClass}">${t.priority}</span>
                </div>
                <p class="task-desc">${t.description || "Không có mô tả."}</p>
                <div class="task-meta">📅 Hạn: ${t.dueDate || "Không có"}</div>
                <div class="task-actions">
                    <button class="btn ${t.completed ? 'btn-outline' : 'btn-success'} btn-toggle">
                        ${t.completed ? 'Hoàn tác' : 'Hoàn thành'}
                    </button>
                    <button class="btn btn-outline btn-edit">Sửa</button>
                    <button class="btn btn-danger btn-delete">Xóa</button>
                </div>
            </div>
        `}).join("");
    }
    updateTaskSummary();
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("total-count").textContent = total;
    document.getElementById("completed-count").textContent = completed;
    document.getElementById("pending-count").textContent = pending;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showMessage(msg, type = "success") {
    notification.textContent = msg;
    notification.className = `notification ${type}`;
    setTimeout(() => notification.classList.add("hidden"), 3000);
}

// --- MODAL & FORM CONTROLS ---
function openModal(mode = "add") {
    modal.classList.remove("hidden");
    if (mode === "add") {
        editingId = null;
        document.getElementById("modal-title").textContent = "Thêm công việc mới";
        resetForm();
    } else {
        document.getElementById("modal-title").textContent = "Cập nhật công việc";
    }
}

function closeModal() {
    modal.classList.add("hidden");
    resetForm();
}

function resetForm() {
    form.reset();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");
}

// --- VALIDATION (Bài tập về nhà) ---
function validateForm(data) {
    let isValid = true;
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = "");

    if (data.title.trim().length < 3) {
        document.getElementById("err-title").textContent = "Tiêu đề phải có ít nhất 3 ký tự.";
        isValid = false;
    }
    if (!data.dueDate) {
        document.getElementById("err-dueDate").textContent = "Vui lòng chọn hạn hoàn thành.";
        isValid = false;
    }
    return isValid;
}

// --- EVENT LISTENERS ---
document.getElementById("btn-open-modal").addEventListener("click", () => openModal("add"));
document.getElementById("btn-close-modal").addEventListener("click", closeModal);
document.getElementById("btn-cancel").addEventListener("click", closeModal);

// Form Submit (Thêm / Sửa)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const taskData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        dueDate: document.getElementById("dueDate").value,
        priority: document.getElementById("priority").value,
    };

    if (!validateForm(taskData)) return;

    if (editingId) {
        // Sửa công việc
        tasks = tasks.map(t => t.id === editingId ? { ...t, ...taskData } : t);
        showMessage("Đã cập nhật công việc!");
    } else {
        // Thêm công việc
        const newTask = { id: Date.now(), completed: false, ...taskData };
        tasks.push(newTask);
        showMessage("Thêm công việc thành công!");
    }

    saveTasks();
    renderTasks();
    closeModal();
});

// Event Delegation cho Danh sách Card (Đổi trạng thái, Sửa, Xóa)
taskList.addEventListener("click", (e) => {
    const card = e.target.closest(".task-card");
    if (!card) return;
    
    const id = Number(card.dataset.id);

    // Xử lý Xóa
    if (e.target.closest(".btn-delete")) {
        if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
            showMessage("Đã xóa công việc!", "error");
        }
    }

    // Xử lý Hoàn thành / Hoàn tác
    if (e.target.closest(".btn-toggle")) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks();
        renderTasks();
        const isDone = tasks.find(t => t.id === id).completed;
        showMessage(isDone ? "Đã đánh dấu hoàn thành!" : "Đã hoàn tác công việc!");
    }

    // Xử lý Sửa
    if (e.target.closest(".btn-edit")) {
        const t = tasks.find(t => t.id === id);
        if (t) {
            editingId = id;
            document.getElementById("title").value = t.title;
            document.getElementById("description").value = t.description;
            document.getElementById("dueDate").value = t.dueDate;
            document.getElementById("priority").value = t.priority;
            openModal("edit");
        }
    }
});