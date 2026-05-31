import { useState } from "react";

function MultipleStates() {
    // Khai báo nhiều state cho form
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Thử thách 1: Thêm trường Email
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    function handleSubmit() {
        // Validate dữ liệu cơ bản
        if (name.trim() === "" || email.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin (Tên, Email, Tuổi)!");
            return;
        }
        
        // Thử thách 2: Validate tuổi phải > 0 và < 100
        const ageNumber = Number(age);
        if (ageNumber <= 0 || ageNumber >= 100) {
            alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        // Thử thách của Bài 4.2: Validate email có chữ "@"
        if (!email.includes("@")) {
            alert("Email không hợp lệ (phải chứa ký tự @)!");
            return;
        }
        
        setSubmitted(true);
    }
    
    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }
    
    return (
        <div style={{ padding: "20px", border: "2px solid #9b59b6", marginBottom: "15px" }}>
            <h2>4. Form Đăng Ký (Nhiều State)</h2>
            
            {!submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
                    <div>
                        <label>Tên: </label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    
                    <div>
                        <label>Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    
                    <div>
                        <label>Tuổi: </label>
                        <input 
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ cursor: "pointer" }}>
                            <input 
                                type="checkbox"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            {" "}Là sinh viên
                        </label>
                    </div>
                    
                    <button 
                        onClick={handleSubmit}
                        style={{ background: "#3498db", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
                    >
                        Đăng ký
                    </button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px", border: "1px solid #c3e6cb" }}>
                    {/* Thử thách 3: Hiển thị câu chào */}
                    <h3 style={{ color: "#155724", marginTop: 0 }}>🎉 Xin chào {name}! Đăng ký thành công.</h3>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Tuổi:</strong> {age}</p>
                    <p><strong>Sinh viên:</strong> {isStudent ? "Có ✅" : "Không ❌"}</p>
                    <button 
                        onClick={handleReset}
                        style={{ background: "#6c757d", color: "white", padding: "5px 15px", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Quay lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;