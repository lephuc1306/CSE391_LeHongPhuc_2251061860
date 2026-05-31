import { useState } from "react";

function GoodCounter() {
    // useState báo cho React biết: "Khi biến count này đổi, hãy cập nhật lại màn hình!"
    const [count, setCount] = useState(0); 
    
    function handleClick() {
        setCount(count + 1); 
        console.log("Count hiện tại (Good):", count + 1);
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71", marginBottom: "10px" }}>
            <h2>✅ Counter "tốt" (dùng useState)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick} style={{ padding: "5px 10px" }}>Tăng (+1)</button>
            <p style={{ color: "green" }}>
                ✅ Nhấn nút → Số trên màn hình CẬP NHẬT NGAY LẬP TỨC!
            </p>
        </div>
    );
}

export default GoodCounter;