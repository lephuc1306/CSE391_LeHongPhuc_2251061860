function BadCounter() {
    let count = 0; 
    
    function handleClick() {
        count = count + 1;
        console.log("Count hiện tại (Bad):", count); 
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #e74c3c", marginBottom: "10px" }}>
            <h2>❌ Counter "tệ" (dùng biến thường)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick} style={{ padding: "5px 10px" }}>Tăng (+1)</button>
            <p style={{ color: "red" }}>
                ⚠️ Nhấn nút → Console tăng, nhưng số trên màn hình KHÔNG đổi!
            </p>
        </div>
    );
}

export default BadCounter;