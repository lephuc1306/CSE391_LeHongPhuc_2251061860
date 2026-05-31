function Challenge2() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px", border: "2px solid #e67e22", marginBottom: "15px" }}>
            <h2>Thử thách 2: Hiển thị có điều kiện</h2>
            
            <p>Trạng thái: {isOnline ? "🟢 Đang hoạt động" : "🔴 Ngoại tuyến"}</p>

            {isLoggedIn && (
                <ul style={{ background: "#ecf0f1", padding: "10px 30px", borderRadius: "5px" }}>
                    <li>Trang cá nhân</li>
                    <li>Cài đặt bảo mật</li>
                    <li>Đăng xuất</li>
                </ul>
            )}

            <div style={{ marginTop: "15px", padding: "10px", border: "1px dashed #7f8c8d" }}>
                Sản phẩm: Áo thun mùa hè
                <br />
                Tình trạng: {stock === 0 ? (
                    <strong style={{ color: "red" }}>Hết hàng</strong>
                ) : (
                    <strong style={{ color: "green" }}>Còn {stock} chiếc</strong>
                )}
            </div>
        </div>
    );
}

export default Challenge2;