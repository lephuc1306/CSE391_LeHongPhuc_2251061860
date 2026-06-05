// Dữ liệu sản phẩm (Ít nhất 12 SP, 4 Category)
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200x200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/200x200?text=Galaxy+S24", rating: 4.5, inStock: true },
    { id: 3, name: "Google Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/200x200?text=Pixel+9", rating: 4.6, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200x200?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200x200?text=Dell+XPS", rating: 4.7, inStock: true },
    { id: 6, name: "ThinkPad X1 Carbon", price: 32990000, category: "laptop", image: "https://placehold.co/200x200?text=ThinkPad", rating: 4.8, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 25990000, category: "tablet", image: "https://placehold.co/200x200?text=iPad+Pro", rating: 4.9, inStock: true },
    { id: 8, name: "Samsung Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200x200?text=Tab+S9", rating: 4.4, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200x200?text=Xiaomi+Pad", rating: 4.2, inStock: false },
    { id: 10, name: "AirPods Pro 2", price: 5990000, category: "audio", image: "https://placehold.co/200x200?text=AirPods", rating: 4.7, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 7990000, category: "audio", image: "https://placehold.co/200x200?text=Sony+XM5", rating: 4.8, inStock: true },
    { id: 12, name: "Marshall Motif II", price: 4500000, category: "audio", image: "https://placehold.co/200x200?text=Marshall", rating: 4.3, inStock: true }
];

// === STATE ===
let currentProducts = [...products];
let cartCount = 0;
let activeCategory = "all";

// === DOM ELEMENTS ===
const grid = document.getElementById("productGrid");
const categoryContainer = document.getElementById("categoryContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartBadge = document.getElementById("cartBadge");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

// === HÀM RENDER ===

// 1. Tiện ích format tiền
const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';

// 2. Render Danh mục sản phẩm (Tạo tự động từ JS)
function renderCategories() {
    const categories = ["all", "phone", "laptop", "tablet", "audio"];
    const labels = { all: "Tất cả", phone: "Điện thoại", laptop: "Laptop", tablet: "Máy tính bảng", audio: "Âm thanh" };

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `category-btn ${cat === activeCategory ? "active" : ""}`;
        btn.textContent = labels[cat];
        btn.dataset.category = cat;
        
        btn.addEventListener("click", () => filterByCategory(cat, btn));
        categoryContainer.appendChild(btn);
    });
}

// 3. Render Lưới Sản phẩm (Bắt buộc dùng createElement theo yêu cầu đề)
function renderProducts(productList) {
    grid.innerHTML = ""; // Xóa dữ liệu cũ
    
    if (productList.length === 0) {
        grid.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
        return;
    }

    productList.forEach(p => {
        // Tạo thẻ cha
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = p.id;

        // Dùng innerHTML cho nội dung BÊN TRONG card để code sạch sẽ
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <div class="price">${formatPrice(p.price)}</div>
            <div class="rating">⭐ ${p.rating} / 5.0</div>
            <button class="add-to-cart-btn" ${!p.inStock ? "disabled" : ""}>
                ${p.inStock ? "🛒 Thêm vào giỏ" : "❌ Hết hàng"}
            </button>
        `;
        grid.appendChild(card);
    });
}

// === CÁC HÀM XỬ LÝ LOGIC ===

// 1. Lọc theo Danh mục
function filterByCategory(category, btnElement) {
    activeCategory = category;
    
    // Đổi active class cho button
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btnElement.classList.add("active");

    // Lọc data
    currentProducts = category === "all" ? [...products] : products.filter(p => p.category === category);
    
    // Áp dụng thêm sort và search hiện tại
    searchAndSort();
}

// 2. Tìm kiếm và Sắp xếp kết hợp
function searchAndSort() {
    const keyword = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    // A. Lọc tìm kiếm trên mảng (đã filter category)
    let result = currentProducts.filter(p => p.name.toLowerCase().includes(keyword));

    // B. Sắp xếp
    if (sortValue === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortValue === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortValue === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === "rating-desc") result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}

// 3. Xử lý mở Modal chi tiết
function openModal(productId) {
    const p = products.find(item => item.id === productId);
    if (!p) return;

    modalBody.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 8px;">
        <h2 style="margin: 15px 0;">${p.name}</h2>
        <h3 style="color: #e84118;">${formatPrice(p.price)}</h3>
        <p style="margin: 10px 0;">Danh mục: <strong>${p.category.toUpperCase()}</strong></p>
        <p>Đánh giá: ⭐ ${p.rating}</p>
        <p>Trạng thái: ${p.inStock ? "<span style='color:green'>Còn hàng</span>" : "<span style='color:red'>Hết hàng</span>"}</p>
    `;
    modal.classList.add("show");
}

// === GÁN SỰ KIỆN (EVENTS) ===

// Lắng nghe gõ tìm kiếm (Realtime)
searchInput.addEventListener("input", searchAndSort);

// Lắng nghe thay đổi sắp xếp
sortSelect.addEventListener("change", searchAndSort);

// Event Delegation trên Lưới Sản Phẩm (Click Modal & Add to Cart)
grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    
    const id = Number(card.dataset.id);

    // Nếu click đúng vào nút "Thêm vào giỏ"
    if (e.target.classList.contains("add-to-cart-btn")) {
        cartCount++;
        cartBadge.textContent = cartCount;
        
        // Hiệu ứng nút xịn xò
        const btn = e.target;
        btn.textContent = "✅ Đã thêm";
        btn.style.background = "#44bd32";
        setTimeout(() => {
            btn.innerHTML = "🛒 Thêm vào giỏ";
            btn.style.background = "";
        }, 1000);
    } 
    // Nếu click vào thẻ (vùng ảnh/chữ) thì mở Modal
    else {
        openModal(id);
    }
});

// Đóng Modal
closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show"); // Click nền đen để đóng
});

// Chuyển đổi Dark/Light Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// === CHẠY APP LẦN ĐẦU ===
renderCategories();
renderProducts(currentProducts);