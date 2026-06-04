function createCart() {
    // Private data: Biến items được bảo vệ bởi Closure
    let items = [];
    let discountCode = "";

    // Hàm phụ trợ định dạng tiền tệ
    const formatMoney = (amount) => amount.toLocaleString("vi-VN");

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Dùng spread operator để copy thuộc tính và thêm field quantity
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        // Tính tổng tiền (đã bao gồm giảm giá nếu có)
        getTotal() {
            // Tính tổng tiền gốc
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Tính toán giảm giá
            let discountAmount = 0;
            if (discountCode === "SALE10") {
                discountAmount = subtotal * 0.10;
            } else if (discountCode === "SALE20") {
                discountAmount = subtotal * 0.20;
            } else if (discountCode === "FREESHIP") {
                discountAmount = 30000;
            }
            
            return Math.max(0, subtotal - discountAmount);
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discountCode = code;
        },
        
        // In giỏ hàng dạng bảng bằng ASCII art
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống!");
                return;
            }

            console.log("┌────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá      │ Tổng       │");
            
            items.forEach((item, index) => {
                const num = String(index + 1).padStart(1);
                const name = item.name.padEnd(13).substring(0, 13);
                const qty = String(item.quantity).padStart(2);
                const price = formatMoney(item.price).padStart(12);
                const lineTotal = formatMoney(item.price * item.quantity).padStart(10);
                
                console.log(`│ ${num} │ ${name} │ ${qty} │ ${price} │ ${lineTotal} │`);
            });
            
            console.log("├────────────────────────────────────────────────────┤");
            
            const totalStr = formatMoney(this.getTotal()) + "đ";
            // In ra dòng tổng cộng kèm mã giảm giá nếu có
            let discountText = discountCode ? `(Áp dụng mã: ${discountCode})` : "";
            console.log(`│ Tổng cộng ${discountText.padEnd(21)}: ${totalStr.padStart(16)} │`);
            console.log("└────────────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountCode = "";
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng số lượng lên 2

console.log("=== TRƯỚC KHI GIẢM GIÁ ===");
cart.printCart();

console.log("\n=== SAU KHI ÁP DỤNG SALE10 ===");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP hiện tại:", cart.getItemCount()); // Kỳ vọng: 4

cart.removeItem(3);
console.log("Số SP sau khi xóa AirPods (id 3):", cart.getItemCount()); // Kỳ vọng: 2