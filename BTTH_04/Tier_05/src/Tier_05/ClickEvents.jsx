import { useState } from "react";

function ClickEvents() {
    // State cho thử thách
    const [bgColor, setBgColor] = useState("#f9f9f9");
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // Hàm tạo màu HEX ngẫu nhiên
    const changeRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setBgColor(randomColor);
    };

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", marginBottom: "15px", backgroundColor: bgColor, transition: "0.3s" }}>
            <h2>1. Xử lý Click Events</h2>
            
            {/* Thử thách 1: Đổi màu nền */}
            <button onClick={changeRandomColor} style={{ marginBottom: "15px", padding: "8px" }}>
                🎨 Đổi màu nền ngẫu nhiên
            </button>

            {/* Thử thách 2: Đếm độc lập */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <button onClick={() => setCountA(countA + 1)} style={{ padding: "8px" }}>
                    Nút A (Click: {countA})
                </button>
                <button onClick={() => setCountB(countB + 1)} style={{ padding: "8px" }}>
                    Nút B (Click: {countB})
                </button>
            </div>

            {/* Thử thách 3: Nút Like */}
            <button 
                onClick={() => setIsLiked(!isLiked)} 
                style={{ fontSize: "20px", background: "transparent", border: "1px solid #ccc", padding: "5px 15px", cursor: "pointer", borderRadius: "20px" }}
            >
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
        </div>
    );
}

export default ClickEvents;