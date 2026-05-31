function Challenge3() {
    const products = [
        { id: 1, name: "Bàn phím cơ", price: 1200000 },
        { id: 2, name: "Chuột không dây", price: 450000 },
        { id: 3, name: "Màn hình 24 inch", price: 3500000 },
        { id: 4, name: "Lót chuột", price: 150000 },
        { id: 5, name: "Tai nghe Gaming", price: 1050000 }
    ];

    const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71" }}>
            <h2>Thử thách 3: Danh sách & Tính tổng</h2>
            
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map((product) => (
                    <li 
                        key={product.id} 
                        style={{ 
                            padding: "8px", 
                            borderBottom: "1px solid #ccc",
                            color: product.price > 1000000 ? "red" : "black",
                            fontWeight: product.price > 1000000 ? "bold" : "normal"
                        }}
                    >
                        {product.name} - {product.price.toLocaleString("vi-VN")} VNĐ
                    </li>
                ))}
            </ul>
            
            <h3 style={{ borderTop: "2px solid #27ae60", paddingTop: "10px" }}>
                Tổng cộng: {totalPrice.toLocaleString("vi-VN")} VNĐ
            </h3>
        </div>
    );
}

export default Challenge3;