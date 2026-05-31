import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    const inputRef = useRef(null);
    
    function handleAdd() {
        if (newName.trim() === "") {
            alert("Tên môn học không được để trống!");
            return;
        }
        
        const newItem = {
            id: Date.now(), 
            name: newName.trim()
        };
        
        setItems([...items, newItem]);
        setNewName("");
        
        setSuccessMsg(`Đã thêm thành công môn "${newItem.name}"!`);
        setTimeout(() => setSuccessMsg(""), 3000);
        
        inputRef.current.focus();
    }
    
    function handleKeyPress(event) {
        if (event.key === "Enter") handleAdd();
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71", marginBottom: "15px" }}>
            <h2>2. Thêm phần tử (CREATE)</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    ref={inputRef} 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px", width: "200px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#27ae60", color: "white", border: "none", cursor: "pointer" }}>
                    ➕ Thêm
                </button>
            </div>
            
            {successMsg && <p style={{ color: "#27ae60", fontWeight: "bold" }}>{successMsg}</p>}
            
            <h3>Danh sách ({items.length} môn):</h3>
            {items.map(item => (
                <div key={item.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    📘 {item.name}
                </div>
            ))}
        </div>
    );
}

export default CreateItem;