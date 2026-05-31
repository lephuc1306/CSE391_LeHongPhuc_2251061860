function Challenge1() {
    const name = "Lê Hồng Phúc";
    const studentId = "2251061860";
    
    const currentHour = new Date().getHours();
    let greeting = "";
    if (currentHour < 12) greeting = "Chào buổi sáng 🌅";
    else if (currentHour < 18) greeting = "Chào buổi chiều ☕";
    else greeting = "Chào buổi tối 🌙";

    const weight = 65; 
    const height = 1.70; 
    const bmi = (weight / (height * height)).toFixed(2); 

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", marginBottom: "15px" }}>
            <h2>Thử thách 1: Tính toán & Biến</h2>
            
            <h3 style={{ color: "#2980b9" }}>{greeting}, {name}!</h3>
            <p>Mã số sinh viên: <strong>{studentId}</strong></p>
            
            <div style={{ background: "#f0f8ff", padding: "10px", marginTop: "10px" }}>
                <h4>Chỉ số BMI của em:</h4>
                <p>Cân nặng: {weight} kg | Chiều cao: {height} m</p>
                <p>Kết quả BMI: <strong style={{ color: "#e74c3c", fontSize: "18px" }}>{bmi}</strong></p>
            </div>
        </div>
    );
}

export default Challenge1;