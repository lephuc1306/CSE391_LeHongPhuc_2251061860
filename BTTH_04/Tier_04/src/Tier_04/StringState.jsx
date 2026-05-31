import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div style={{ padding: "20px", border: "2px solid #e67e22", marginBottom: "15px" }}>
            <h2>2. State với Chuỗi (String)</h2>
            
            <div>
                <label>Nhập văn bản: </label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="Nhập tối đa 100 ký tự..."
                />
                <span style={{ marginLeft: "10px", color: name.length === 100 ? "red" : "gray" }}>
                    {name.length}/100
                </span>
            </div>
            
            <div style={{ marginTop: "10px" }}>
                <label>Mật khẩu: </label>
                <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "5px" }}>
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>
        </div>
    );
}

export default StringState;