function ProductCard({ name, price, image }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            margin: "10px",
            width: "200px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
            <img src={image} alt={name} style={{ width: "100%", borderRadius: "4px" }} />
            <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold" }}>{price}đ</p>
            <button style={{ 
                background: "#3498db", 
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%"
            }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default ProductCard;