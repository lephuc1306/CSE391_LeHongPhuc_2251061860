function TernaryDemo() {
    const isLoggedIn = true;
    const score = 85;
    
    return (
        <div style={{ padding: "20px", border: "2px solid #e67e22", marginBottom: "15px" }}>
            <h2>2. Điều Kiện (Toán tử 3 ngôi)</h2>
            <h3>{isLoggedIn ? "Chào mừng bạn!" : "Vui lòng đăng nhập"}</h3>
            
            <p>Kết quả: <strong>{score >= 5 ? "Đậu" : "Rớt"}</strong></p>
            
            <p>Xếp loại: <strong>{
                score >= 90 ? "Xuất sắc" :
                score >= 80 ? "Giỏi" :
                score >= 70 ? "Khá" :
                score >= 50 ? "Trung bình" : "Yếu"
            }</strong></p>
        </div>
    );
}

export default TernaryDemo;