import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);
    
    // Đổi màu dựa theo giá trị count
    const color = count > 0 ? "green" : count < 0 ? "red" : "black";
    
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", marginBottom: "15px", textAlign: "center" }}>
            <h2>1. State với Số (Number)</h2>
            <h3 style={{ color: color }}>Bộ đếm: {count}</h3>
            <p>{count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Số không"}</p>
            
            <button onClick={() => setCount(count + 1)} style={{ margin: "5px" }}>Tăng (+1)</button>
            <button onClick={() => setCount(count - 1)} style={{ margin: "5px" }}>Giảm (-1)</button>
            <button onClick={() => setCount(count + 5)} style={{ margin: "5px", fontWeight: "bold" }}>Tăng (+5)</button>
            <button onClick={() => setCount(0)} style={{ margin: "5px", background: "#e74c3c", color: "white" }}>Reset</button>
        </div>
    );
}

export default NumberState;