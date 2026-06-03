// Mảng chứa danh sách các món ăn hiện tại
let currentOrder = [];

// Các elements trên giao diện
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const itemQtyInput = document.getElementById('itemQty');
const chkWednesday = document.getElementById('chkWednesday');
const chkTip = document.getElementById('chkTip');

// Hàm tính toán và cập nhật hóa đơn
function updateBill() {
    const isWednesday = chkWednesday.checked;
    const includeTip = chkTip.checked;

    // 1. Tính tổng tiền
    const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // 2. Tính phần trăm giảm giá
    let discountPercent = 0;
    if (subtotal > 1000000) discountPercent = 15;
    else if (subtotal > 500000) discountPercent = 10;
    
    if (isWednesday) discountPercent += 5;

    // 3. Tính chi phí
    const discountAmount = (subtotal * discountPercent) / 100;
    const afterDiscount = subtotal - discountAmount;
    const vat = afterDiscount * 0.08;
    const tip = includeTip ? afterDiscount * 0.05 : 0;
    const total = afterDiscount + vat + tip;

    // Hàm phụ trợ định dạng tiền tệ
    const formatMoney = (amount) => amount.toLocaleString("vi-VN") + "đ";

    // 4. In danh sách món ra HTML
    const itemsContainer = document.getElementById("order-items");
    itemsContainer.innerHTML = ""; // Xóa trắng

    if (currentOrder.length === 0) {
        itemsContainer.innerHTML = '<div style="text-align: center; color: #888; font-style: italic;">Chưa có món ăn nào</div>';
    } else {
        currentOrder.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "item-row";
            const lineTotal = item.price * item.qty;
            
            itemElement.innerHTML = `
                <div class="item-details">
                    <span class="item-name">${index + 1}. ${item.name}</span>
                    <span>x${item.qty}</span>
                    <span>@${item.price / 1000}k</span>
                </div>
                <span>${lineTotal / 1000}k</span>
            `;
            itemsContainer.appendChild(itemElement);
        });
    }

    // 5. Cập nhật các con số tổng kết
    document.getElementById("subtotal").textContent = formatMoney(subtotal);
    document.getElementById("discount-label").textContent = `Giảm giá (${discountPercent}%):`;
    document.getElementById("discount").textContent = formatMoney(discountAmount);
    document.getElementById("vat").textContent = formatMoney(vat);
    document.getElementById("tip-label").textContent = `Tip (${includeTip ? '5%' : '0%'}):`;
    document.getElementById("tip").textContent = formatMoney(tip);
    document.getElementById("total").textContent = formatMoney(total);
}

// BẮT SỰ KIỆN: KHI BẤM NÚT "THÊM VÀO HÓA ĐƠN"
document.getElementById('btnAddItem').addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const price = parseInt(itemPriceInput.value);
    const qty = parseInt(itemQtyInput.value);

    // Kiểm tra tính hợp lệ
    if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty <= 0) {
        alert("Vui lòng nhập đầy đủ và đúng thông tin món ăn!");
        return;
    }

    // Thêm món vào mảng và cập nhật lại bill
    currentOrder.push({ name: name, price: price, qty: qty });
    updateBill();

    // Xóa trắng ô nhập liệu để nhập món tiếp theo
    itemNameInput.value = '';
    itemPriceInput.value = '';
    itemQtyInput.value = '1';
    itemNameInput.focus();
});

// BẮT SỰ KIỆN: KHI BẤM NÚT XÓA LÀM LẠI
document.getElementById('btnClear').addEventListener('click', () => {
    currentOrder = [];
    chkWednesday.checked = false;
    chkTip.checked = false;
    updateBill();
});

// BẮT SỰ KIỆN: KHI TÍCH VÀO CHECKBOX (Cập nhật bill ngay lập tức)
chkWednesday.addEventListener('change', updateBill);
chkTip.addEventListener('change', updateBill);

// Gọi lần đầu để setup giao diện trống
updateBill();