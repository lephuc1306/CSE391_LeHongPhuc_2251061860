import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setSuccessMsg("");
    }
    
    function saveEdit() {
        if (editName.trim() === "" || editAge === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName, age: parseInt(editAge) }
                : item
        ));
        
        setEditingId(null);
        setSuccessMsg("Đã lưu thành công!");
        setTimeout(() => setSuccessMsg(""), 3000);
    }
    
    function handleKeyDown(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") setEditingId(null);
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #f39c12", marginBottom: "15px" }}>
            <h2>4. Sửa phần tử (UPDATE)</h2>
            
            {successMsg && <p style={{ color: "#27ae60", fontWeight: "bold" }}>✅ {successMsg}</p>}
            
            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", margin: "5px 0", background: "#f9f9f9" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                style={{ padding: "6px", backgroundColor: "#fff9c4", border: "1px solid #f39c12" }}
                            />
                            <input 
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{ padding: "6px", width: "60px", backgroundColor: "#fff9c4", border: "1px solid #f39c12" }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "4px 10px", cursor: "pointer" }}>
                                ✓ Lưu
                            </button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 10px", cursor: "pointer" }}>
                                ✕ Hủy
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#f39c12", color: "white", border: "none", padding: "4px 10px", cursor: "pointer" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;