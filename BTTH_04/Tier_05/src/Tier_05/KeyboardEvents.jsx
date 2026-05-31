import { useState } from "react";

function KeyboardEvents() {
    // Tọa độ của khối vuông (Thử thách 2)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(false);

    function handleKeyDown(e) {
        // Thử thách 3: Nhấn Ctrl + B để đổi giao diện
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
            e.preventDefault(); // Ngăn trình duyệt mở Bookmark
            setIsDarkMode(!isDarkMode);
        }

        // Thử thách 2: Di chuyển khối vuông bằng 4 phím mũi tên
        const step = 20; // Mỗi lần di chuyển 20px
        if (e.key === "ArrowUp") setPosition(prev => ({ ...prev, y: prev.y - step }));
        if (e.key === "ArrowDown") setPosition(prev => ({ ...prev, y: prev.y + step }));
        if (e.key === "ArrowLeft") setPosition(prev => ({ ...prev, x: prev.x - step }));
        if (e.key === "ArrowRight") setPosition(prev => ({ ...prev, x: prev.x + step }));
    }

    return (
        <div 
            onKeyDown={handleKeyDown} 
            tabIndex={0} // tabIndex bắt buộc để thẻ div có thể nhận sự kiện bàn phím
            style={{ 
                padding: "20px", 
                border: "2px solid #9b59b6", 
                marginBottom: "15px",
                backgroundColor: isDarkMode ? "#2c3e50" : "#ffffff",
                color: isDarkMode ? "#ecf0f1" : "#000000",
                position: "relative",
                height: "300px",
                overflow: "hidden"
            }}
        >
            <h2>3. Xử lý Keyboard Events</h2>
            <p>1. Click chuột vào khung này để bắt đầu.</p>
            <p>2. Dùng phím <strong>↑ ↓ ← →</strong> để di chuyển khối vuông đỏ.</p>
            <p>3. Nhấn <strong>Ctrl + B</strong> để bật/tắt Dark Mode.</p>

            {/* Khối vuông di chuyển */}
            <div style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#e74c3c",
                position: "absolute",
                top: `calc(50% + ${position.y}px)`, // Căn giữa và cộng trừ tọa độ
                left: `calc(50% + ${position.x}px)`,
                transition: "0.1s" // Chuyển động mượt hơn
            }}></div>
        </div>
    );
}

export default KeyboardEvents;