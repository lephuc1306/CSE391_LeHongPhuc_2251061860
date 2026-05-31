function Header() {
    return (
        <header style={{ background: "#2c3e50", color: "white", padding: "15px", textAlign: "center" }}>
            <h1>Cửa Hàng Điện Thoại</h1>
            <nav>
                <a href="/" style={{ color: "#3498db", margin: "0 10px", textDecoration: "none" }}>Trang chủ</a>
                <a href="/about" style={{ color: "#3498db", margin: "0 10px", textDecoration: "none" }}>Giới thiệu</a>
            </nav>
        </header>
    );
}

export default Header;