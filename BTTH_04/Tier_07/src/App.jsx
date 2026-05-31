import { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoApp/TodoItem";
import TodoFilter from "./TodoApp/TodoFilter";

function App() {
    // Level 2: Lấy dữ liệu từ LocalStorage khi mới vào web
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("myTodos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    const [category, setCategory] = useState("Học tập"); // State cho Category (Level 3)

    // Công cụ useRef để lưu vị trí khi kéo thả
    const dragItem = useRef();
    const dragOverItem = useRef();

    // Level 2: Mỗi khi biến todos thay đổi, tự động lưu lại vào máy
    useEffect(() => {
        localStorage.setItem("myTodos", JSON.stringify(todos));
    }, [todos]);
    
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const now = new Date();
        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            done: false,
            category: category,
            dateOnly: now.toLocaleDateString("vi-VN"), // Để phân nhóm theo ngày
            time: now.toLocaleTimeString("vi-VN")
        };
        
        setTodos([newTodo, ...todos]);
        setInputValue("");
    }
    
    function handleKeyPress(e) {
        if (e.key === "Enter") addTodo();
    }
    
    function toggleTodo(id) {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }
    
    function deleteTodo(id) {
        setTodos(todos.filter(t => t.id !== id));
    }

    function editTodo(id, newText) {
        setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
    }

    // Xử lý kéo thả (Level 3)
    const handleDragStart = (e, index) => { dragItem.current = index; };
    const handleDragEnter = (e, index) => { dragOverItem.current = index; };
    const handleDragEnd = () => {
        const copyList = [...todos];
        const dragContent = copyList[dragItem.current];
        copyList.splice(dragItem.current, 1);
        copyList.splice(dragOverItem.current, 0, dragContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setTodos(copyList);
    };
    
    const filteredTodos = todos.filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        return true;
    });

    // Level 3: Phân nhóm danh sách theo ngày tạo
    // (Chỉ gom nhóm khi xem tab Tất cả, nếu không code sẽ rất dài)
    let lastDate = null; 

    return (
        <div style={{ maxWidth: "550px", margin: "40px auto", padding: "20px", fontFamily: "Arial", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#ffffff" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>🚀 Todo List Pro</h1>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập việc cần làm..."
                    style={{ flex: 1, padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "4px" }}
                />
                
                {/* Chọn Tag/Category */}
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ padding: "10px", border: "2px solid #ddd", borderRadius: "4px", outline: "none", cursor: "pointer" }}
                >
                    <option value="Học tập">Học tập</option>
                    <option value="Công việc">Công việc</option>
                    <option value="Cá nhân">Cá nhân</option>
                </select>

                <button onClick={addTodo} style={{ padding: "10px 20px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                    Thêm
                </button>
            </div>
            
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {filteredTodos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#999", background: "#f9f9f9", borderRadius: "4px" }}>
                    Chưa có công việc nào.
                </div>
            ) : (
                filteredTodos.map((todo, index) => {
                    // Logic phân nhóm theo ngày (Group by date)
                    const showDateHeader = todo.dateOnly !== lastDate && filter === "all";
                    lastDate = todo.dateOnly;

                    return (
                        <div key={todo.id}>
                            {/* Tiêu đề Ngày tháng */}
                            {showDateHeader && (
                                <h4 style={{ margin: "15px 0 5px 0", color: "#2c3e50", borderBottom: "2px solid #eee", paddingBottom: "5px" }}>
                                    📅 Ngày {todo.dateOnly}
                                </h4>
                            )}
                            
                            <TodoItem 
                                todo={todo}
                                index={index}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodo} // Truyền hàm sửa xuống
                                dragHandlers={filter === "all" ? {
                                    draggable: true,
                                    onDragStart: (e) => handleDragStart(e, index),
                                    onDragEnter: (e) => handleDragEnter(e, index),
                                    onDragEnd: handleDragEnd,
                                    onDragOver: (e) => e.preventDefault()
                                } : {}} // Chỉ cho kéo thả ở tab Tất cả để tránh loạn index
                            />
                        </div>
                    );
                })
            )}
            
            {todos.length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", padding: "10px", background: "#f1f2f6", borderRadius: "4px", fontSize: "14px" }}>
                    <span style={{ fontWeight: "bold" }}>Tổng: {todos.length}</span>
                    <span style={{ color: "#27ae60" }}>Đã xong: {todos.filter(t => t.done).length}</span>
                    <span style={{ color: "#e67e22" }}>Chưa xong: {todos.filter(t => !t.done).length}</span>
                </div>
            )}
        </div>
    );
}

export default App;