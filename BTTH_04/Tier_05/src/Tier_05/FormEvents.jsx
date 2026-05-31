import { useState } from "react";

function FormEvents() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [submitted, setSubmitted] = useState(false);

    // Bắt sự thay đổi của mọi input trong form
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Xử lý khi bấm nút Submit
    function handleSubmit(e) {
        e.preventDefault(); // Cực kỳ quan trọng: Ngăn trình duyệt reload lại trang!

        if (!formData.email.includes("@")) {
            alert("Email phải chứa ký tự @");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        setSubmitted(true);
    }

    // Kiểm tra lỗi Realtime cho ô Xác nhận mật khẩu
    const isPasswordMatch = formData.confirmPassword === "" || formData.password === formData.confirmPassword;

    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71" }}>
            <h2>4. Xử lý Form Events</h2>
            
            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "15px" }}>
                    
                    <div>
                        <label>Email:</label><br/>
                        <input 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            style={{ width: "100%", padding: "5px" }}
                        />
                    </div>
                    
                    <div>
                        <label>Mật khẩu:</label><br/>
                        <input 
                            name="password" 
                            type="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            style={{ width: "100%", padding: "5px" }}
                        />
                    </div>

                    <div>
                        <label>Xác nhận mật khẩu:</label><br/>
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                            style={{ width: "100%", padding: "5px", outlineColor: isPasswordMatch ? "green" : "red" }}
                        />
                        {/* Lỗi realtime */}
                        {!isPasswordMatch && <span style={{ color: "red", fontSize: "12px" }}>❌ Mật khẩu không khớp!</span>}
                    </div>

                    <button type="submit" style={{ padding: "10px", background: "#27ae60", color: "white", border: "none", cursor: "pointer" }}>
                        Đăng ký tài khoản
                    </button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "5px", color: "#155724" }}>
                    <h3>🎉 Đăng ký thành công!</h3>
                    <p>Hệ thống đã ghi nhận email: <strong>{formData.email}</strong></p>
                    <button onClick={() => setSubmitted(false)} style={{ marginTop: "10px", padding: "5px 10px" }}>
                        Quay lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;