import { useState } from "react";

function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    // Thử thách 3: Tính tuổi trung bình
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const averageAge = (totalAge / students.length).toFixed(1);
    
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", marginBottom: "15px" }}>
            <h2>1. Đọc danh sách (READ)</h2>
            
            <h3>Danh sách trái cây</h3>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <h3>Danh sách sinh viên</h3>
            {students.map((student, index) => (
                <div key={student.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderLeft: "4px solid #3498db",
                    color: student.age >= 20 ? "#27ae60" : "#333",
                    fontWeight: student.age >= 20 ? "bold" : "normal"
                }}>
                    {index + 1}. {student.name} - {student.age} tuổi
                </div>
            ))}
            
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                📊 Tuổi trung bình của lớp: {averageAge} tuổi
            </p>
        </div>
    );
}

export default ListBasics;