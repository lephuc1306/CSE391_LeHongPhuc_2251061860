import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

function App() {
    // Dữ liệu giả lập lấy từ database
    const products = [
        { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200/3498db/FFFFFF?text=iPhone+15" },
        { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200/e74c3c/FFFFFF?text=Samsung+S24" },
        { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200/f1c40f/FFFFFF?text=Xiaomi+14" }
    ];

    return (
        <div style={{ fontFamily: "sans-serif" }}>
            {/* Gắn Header lên đầu */}
            <Header />

            {/* Phần nội dung chính (Main Content) */}
            <main style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center" }}>Sản phẩm nổi bật</h2>
                
                {/* Dùng flexbox để xếp các card nằm ngang */}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </main>

            {/* Gắn Footer xuống cuối */}
            <Footer />
        </div>
    );
}

export default App;