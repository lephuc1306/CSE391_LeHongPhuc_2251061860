import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    
    const [deletedItem, setDeletedItem] = useState(null);
    
    function handleDelete(itemToDelete) {
        if (window.confirm(`Em có chắc muốn xóa sinh viên ${itemToDelete.name}?`)) {
            setItems(items.filter(item => item.id !== itemToDelete.id));
            
            setDeletedItem(itemToDelete);
            
            setTimeout(() => {
                setDeletedItem(null);
            }, 5000);
        }
    }
    
    function handleUndo() {
        if (deletedItem) {
            setItems([...items, deletedItem]);
            setDeletedItem(null);
        }
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #e74c3c", marginBottom: "15px" }}>
            <h2>3. Xóa phần tử (DELETE)</h2>
            
            {deletedItem && (
                <div style={{ background: "#f8d7da", padding: "10px", marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#721c24" }}>Đã xóa <strong>{deletedItem.name}</strong></span>
                    <button onClick={handleUndo} style={{ background: "#f5c6cb", border: "none", cursor: "pointer", padding: "2px 10px" }}>
                        ↩️ Hoàn tác
                    </button>
                </div>
            )}
            
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ 
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px", margin: "5px 0", background: "#f9f9f9"
                    }}>
                        <span>{item.name}</span>
                        <button 
                            onClick={() => handleDelete(item)}
                            style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default DeleteItem;