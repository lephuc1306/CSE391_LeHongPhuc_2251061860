// === CÁC THÀNH PHẦN DOM ===
const galleryGrid = document.getElementById("galleryGrid");
const galleryModal = document.getElementById("galleryModal");
const mainImage = document.getElementById("mainImage");
const closeGalleryBtn = document.getElementById("closeGallery");
const slideshowIndicator = document.getElementById("slideshowIndicator");

const commandPalette = document.getElementById("commandPalette");
const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");

// === DỮ LIỆU ===
// Khởi tạo 9 ảnh giả lập (Dùng ảnh từ picsum)
const images = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/id/${i + 10}/800/600`);

// Danh sách lệnh cho Command Palette
const commands = [
    { id: 1, name: "Trang chủ", icon: "🏠" },
    { id: 2, name: "Đăng xuất", icon: "🚪" },
    { id: 3, name: "Chế độ ban đêm", icon: "🌙" },
    { id: 4, name: "Cài đặt tài khoản", icon: "⚙️" },
    { id: 5, name: "Mở thư viện ảnh", icon: "🖼️" }
];

// === STATE ===
let currentImageIndex = 0;
let isSlideshowPlaying = false;
let slideshowInterval;
let isGalleryOpen = false;
let isPaletteOpen = false;

// === LOGIC THƯ VIỆN ẢNH (GALLERY) ===

// Render ảnh ra màn hình
images.forEach((src, index) => {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", `Xem ảnh số ${index + 1}`);
    btn.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
    btn.addEventListener("click", () => openImage(index));
    galleryGrid.appendChild(btn);
});

function openImage(index) {
    currentImageIndex = index;
    mainImage.src = images[currentImageIndex];
    galleryModal.classList.add("show");
    isGalleryOpen = true;
    closeGalleryBtn.focus(); // A11y: Tự động focus vào nút đóng khi mở Modal
}

function closeGallery() {
    galleryModal.classList.remove("show");
    isGalleryOpen = false;
    stopSlideshow();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    mainImage.src = images[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    mainImage.src = images[currentImageIndex];
}

function toggleSlideshow() {
    isSlideshowPlaying = !isSlideshowPlaying;
    if (isSlideshowPlaying) {
        slideshowIndicator.textContent = "Slideshow: Đang chạy (2s/ảnh)";
        slideshowInterval = setInterval(nextImage, 2000);
    } else {
        stopSlideshow();
    }
}

function stopSlideshow() {
    isSlideshowPlaying = false;
    clearInterval(slideshowInterval);
    slideshowIndicator.textContent = "Slideshow: Đang dừng";
}

document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);
closeGalleryBtn.addEventListener("click", closeGallery);

// === LOGIC COMMAND PALETTE ===

function openCommandPalette() {
    isPaletteOpen = true;
    commandPalette.classList.add("show");
    commandInput.value = "";
    renderCommands(commands); // Render toàn bộ lệnh
    commandInput.focus(); // Tự động focus vào ô search
}

function closeCommandPalette() {
    isPaletteOpen = false;
    commandPalette.classList.remove("show");
}

function renderCommands(list) {
    commandList.innerHTML = "";
    if (list.length === 0) {
        commandList.innerHTML = `<li style="padding: 15px; color: #7f8fa6;">Không tìm thấy lệnh nào.</li>`;
        return;
    }
    list.forEach(cmd => {
        const btn = document.createElement("button");
        btn.className = "command-btn";
        btn.innerHTML = `${cmd.icon} ${cmd.name}`;
        
        // Khi bấm phím Enter hoặc Click chuột vào Lệnh
        btn.addEventListener("click", () => {
            alert(`Đã thực thi lệnh: ${cmd.name}`);
            closeCommandPalette();
            // Xử lý riêng lệnh mở thư viện
            if (cmd.id === 5) openImage(0);
        });
        
        // Gắn vào danh sách 
        const li = document.createElement("li");
        li.appendChild(btn);
        commandList.appendChild(li);
    });
}

// Xử lý tìm kiếm lệnh (Real-time)
commandInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(keyword));
    renderCommands(filtered);
});

// === QUẢN LÝ PHÍM TẮT TOÀN CỤC (GLOBAL SHORTCUTS) ===

document.addEventListener("keydown", (e) => {
    // 1. Tổ hợp Ctrl + K để mở Command Palette
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Ngăn trình duyệt mở thanh search mặc định
        if (isPaletteOpen) closeCommandPalette();
        else openCommandPalette();
        return;
    }

    // 2. Nếu Gallery đang mở
    if (isGalleryOpen) {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === " ") {
            e.preventDefault(); // Ngăn trình duyệt cuộn trang xuống
            toggleSlideshow();
        }
        // Phím 1 đến 9
        if (e.key >= "1" && e.key <= "9") {
            const index = parseInt(e.key) - 1;
            if (index < images.length) {
                openImage(index);
            }
        }
    }

    // 3. Nếu Command Palette đang mở
    if (isPaletteOpen) {
        if (e.key === "Escape") {
            closeCommandPalette();
        }
        // Lưu ý: Người dùng có thể dùng phím Tab để nhảy xuống các lệnh bên dưới và ấn Enter.
    }
});