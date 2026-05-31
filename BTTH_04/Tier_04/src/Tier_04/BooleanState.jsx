import { useState } from "react";

function BooleanState() {
    const [isOn, setIsOn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71", marginBottom: "15px", background: isOn ? "#fff9c4" : "#f5f6fa" }}>
            <h2>3. State với Boolean (Toggle)</h2>
            
            {/* Toggle Đèn */}
            <button onClick={() => setIsOn(!isOn)} style={{ fontSize: "20px", padding: "10px" }}>
                {isOn ? "💡 Tắt đèn" : "💡 Bật đèn"}
            </button>
            
            {/* Accordion cơ bản */}
            <div style={{ marginTop: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <div 
                    onClick={() => setIsOpen(!isOpen)} 
                    style={{ background: "#eee", padding: "10px", cursor: "pointer", fontWeight: "bold" }}
                >
                    {isOpen ? "🔽 Đóng lại" : "▶️ Bấm để mở nội dung"}
                </div>
                {isOpen && (
                    <div style={{ padding: "10px" }}>
                        Đây là nội dung bí mật được ẩn/hiện nhờ useState!
                    </div>
                )}
            </div>
        </div>
    );
}

export default BooleanState;