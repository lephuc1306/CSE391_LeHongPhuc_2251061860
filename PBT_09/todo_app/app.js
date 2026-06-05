// === DOM ELEMENTS ===
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const countDisplay = document.getElementById("todoCount");
const filters = document.getElementById("filters");
const clearBtn = document.getElementById("clearCompleted");

// === STATE ===
// Lấy dữ liệu từ LocalStorage (nếu có), không có thì dùng mảng rỗng
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "All";

// === FUNCTIONS ===
// Hàm lưu state vào LocalStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Hàm render giao diện động từ mảng `todos`
function render() {
    // 1. Lọc mảng theo tab đang chọn
    let filteredTodos = todos;
    if (currentFilter === "Active") {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === "Completed") {
        filteredTodos = todos.filter(t => t.completed);
    }

    // 2. Clear DOM cũ (Chỉ clear thằng cha, con sẽ tạo bằng createElement)
    list.innerHTML = "";

    // 3. Render các phần tử con
    filteredTodos.forEach(todo => {
        // Tạo thẻ li bọc ngoài
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        // Tạo thẻ span chứa chữ
        const span = document.createElement("span");
        span.className = "text";
        span.textContent = todo.text;

        // Tạo ô input ẩn dùng để sửa
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = todo.text;

        // Tạo nút xóa
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";

        // Gắn vào li, sau đó gắn li vào ul
        li.append(span, editInput, deleteBtn);
        list.appendChild(li);
    });

    // 4. Cập nhật số lượng items chưa hoàn thành
    const pendingCount = todos.filter(t => !t.completed).length;
    countDisplay.textContent = `${pendingCount} item${pendingCount !== 1 ? 's' : ''} left`;

    // 5. Cập nhật giao diện nút Filter
    filters.querySelectorAll("a").forEach(a => {
        if (a.textContent === currentFilter) {
            a.classList.add("active");
        } else {
            a.classList.remove("active");
        }
    });
}

// === EVENTS LẮNG NGHE ===

// THÊM TODO MỚI
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn reload trang
    const text = input.value.trim();
    if (!text) return; // Bỏ qua nếu nhập rỗng

    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = ""; // Clear input
    saveTodos();
    render();
});

// EVENT DELEGATION: XÓA & TOGGLE HOÀN THÀNH (Bắt sự kiện Click)
list.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    const id = Number(li.dataset.id);

    // Bấm nút xóa
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    }
    // Bấm vào chữ để toggle trạng thái
    else if (e.target.classList.contains("text")) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
});

// EVENT DELEGATION: CHỈNH SỬA (Bắt sự kiện Double-Click)
list.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("text")) {
        const li = e.target.closest(".todo-item");
        const editInput = li.querySelector(".edit-input");
        
        li.classList.add("editing");
        editInput.focus();

        // Hàm xử lý lưu data khi sửa xong
        const saveEdit = () => {
            const newText = editInput.value.trim();
            const id = Number(li.dataset.id);
            const todo = todos.find(t => t.id === id);
            
            if (newText) {
                todo.text = newText;
            }
            saveTodos();
            render(); // Render lại sẽ tự động xóa class "editing"
        };

        // Lắng nghe khi bấm Enter hoặc Escape trong lúc sửa
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") saveEdit();
            if (event.key === "Escape") render(); // Hủy sửa
        });

        // Lắng nghe khi click ra ngoài ô input (blur)
        editInput.addEventListener("blur", saveEdit, { once: true });
    }
});

// LỌC DANH SÁCH (FILTERS)
filters.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        currentFilter = e.target.textContent;
        render();
    }
});

// XÓA TẤT CẢ ĐÃ HOÀN THÀNH
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

// Chạy hàm render lần đầu để load dữ liệu từ LocalStorage
render();