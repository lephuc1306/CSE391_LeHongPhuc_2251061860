// Khai báo import 2 component vừa tạo
import UserProfile from './UserProfile';
import ProductInfo from './ProductInfo';

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Thực hành Tier 0 - Component</h1>
      <hr style={{ marginBottom: "20px" }} />
      
      {/* Hiển thị Component UserProfile */}
      <UserProfile />

      {/* Hiển thị Component ProductInfo */}
      <ProductInfo />
      
    </div>
  );
}

export default App;