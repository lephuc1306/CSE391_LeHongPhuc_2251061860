import { useState } from "react";

function InputEvents() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Hàm tính số từ: Xóa khoảng trắng thừa ở hai đầu, tách theo dấu cách
    const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "20px", border: "2px solid #e67e22", marginBottom: "15px" }}>
            <h2>2. Xử lý Input Events</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <label>Nhập Email của bạn: </label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "5px", outlineColor: isEmailValid ? "green" : "red" }}
                />
                {!isEmailValid && email.length > 0 && (
                    <span style={{ color: "red", marginLeft: "10px" }}>⚠️ Email phải chứa ký tự @</span>
                )}
                {isEmailValid && (
                    <span style={{ color: "green", marginLeft: "10px" }}>✅ Hợp lệ</span>
                )}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label>Nhập nội dung (Đếm từ): </label><br/>
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    style={{ width: "100%", marginTop: "5px", padding: "5px" }}
                />
                <p>Số từ đã nhập: <strong>{wordCount}</strong> từ</p>
            </div>

            {/* Preview Realtime */}
            <div style={{ background: "#f1f2f6", padding: "10px", borderRadius: "5px" }}>
                <strong>👀 Xem trước:</strong>
                <p>Email: {email}</p>
                <p>Nội dung: {message}</p>
            </div>
        </div>
    );
}

export default InputEvents;