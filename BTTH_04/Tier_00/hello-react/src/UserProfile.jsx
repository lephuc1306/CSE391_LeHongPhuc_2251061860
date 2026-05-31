function UserProfile() {
    return (
        <div className="profile" style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
            <h1>Hồ sơ cá nhân</h1>
            <img 
                src="https://via.placeholder.com/150" 
                alt="Ảnh đại diện" 
                style={{ borderRadius: "50%", width: "100px", height: "100px" }} 
            />
            <table style={{ marginTop: "10px", width: "100%", textAlign: "left" }}>
                <tbody>
                    <tr>
                        <td style={{ fontWeight: "bold", width: "80px" }}>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: "bold" }}>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;