function ProductInfo() {
    return (
        <div className="product" style={{ border: "1px solid #3498db", padding: "15px", borderRadius: "8px", backgroundColor: "#f9fbfd" }}>
            <h2 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>iPhone 15</h2>
            <p className="price" style={{ color: "#e74c3c", fontSize: "20px", fontWeight: "bold" }}>
                25.000.000đ
            </p>
            <ul style={{ lineHeight: "1.8" }}>
                <li><strong>Màn hình:</strong> 6.1 inch</li>
                <li><strong>Camera:</strong> 48MP</li>
                <li><strong>Pin:</strong> 3349 mAh</li>
            </ul>
            <button style={{ backgroundColor: "#3498db", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                Mua ngay
            </button>
        </div>
    );
}

export default ProductInfo;