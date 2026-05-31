import { useState } from "react";

function TodoItem({ todo, index, onToggle, onDelete, onEdit, dragHandlers }) {
    // Level 2: Trạng thái sửa inline
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text);

    function handleSave() {
        if (editValue.trim() !== "") {
            onEdit(todo.id, editValue);
        } else {
            setEditValue(todo.text); // Hủy nếu để trống
        }
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
            setEditValue(todo.text);
            setIsEditing(false);
        }
    }

    // Màu sắc cho Tag (Level 3)
    const tagColors = {
        "Học tập": "#3498db",
        "Cá nhân": "#9b59b6",
        "Công việc": "#e67e22"
    };

    return (
        <div 
            {...dragHandlers} // Cấp quyền kéo thả cho thẻ div này (Level 3)
            style={{ 
                display: "flex", alignItems: "center", padding: "12px", margin: "5px 0",
                background: todo.done ? "#f0fff0" : "#fff",
                border: "1px solid #eee", borderRadius: "4px",
                cursor: "grab", // Hiện hình bàn tay để biết có thể kéo
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
        >
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "10px", cursor: "pointer" }}
            />
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }} onDoubleClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <input 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave} // Click ra ngoài tự lưu
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{ padding: "4px", fontSize: "16px", border: "1px solid #3498db" }}
                    />
                ) : (
                    <span style={{ 
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#999" : "#333",
                        fontWeight: "bold"
                    }}>
                        {todo.text}
                    </span>
                )}
                
                <div style={{ display: "flex", gap: "10px", marginTop: "4px", alignItems: "center" }}>
                    {/* Thử thách 1: Hiển thị thời gian */}
                    <span style={{ fontSize: "12px", color: "#888" }}>🕒 {todo.time}</span>
                    
                    {/* Thử thách 3: Hiển thị Tag/Category */}
                    <span style={{ 
                        fontSize: "11px", color: "white", padding: "2px 6px", 
                        borderRadius: "10px", background: tagColors[todo.category] || "#95a5a6" 
                    }}>
                        {todo.category}
                    </span>
                </div>
            </div>

            <button 
                onClick={() => setIsEditing(!isEditing)}
                style={{ background: "#f39c12", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", marginLeft: "10px" }}
            >
                ✏️
            </button>
            <button 
                onClick={() => onDelete(todo.id)}
                style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", marginLeft: "5px" }}
            >
                🗑
            </button>
        </div>
    );
}

export default TodoItem;