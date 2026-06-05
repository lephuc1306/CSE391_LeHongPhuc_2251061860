// === DOM ELEMENTS ===
const grid = document.getElementById("gallery-grid");
const loadTrigger = document.getElementById("load-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

// === STATE ===
let currentPage = 1;
let isFetching = false;

// === 1. OBSERVER CHO LAZY LOADING ẢNH ===
// Chỉ tải ảnh thực tế khi khung ảnh cuộn vào màn hình
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Thay data-src thành src thật
            img.src = img.dataset.src;
            
            // Khi ảnh tải xong, thêm class để chạy hiệu ứng fade-in
            img.onload = () => img.classList.add("loaded");
            
            // Ngừng theo dõi ảnh này để tiết kiệm bộ nhớ
            observer.unobserve(img);
        }
    });
}, { rootMargin: "50px" }); // Bắt đầu load trước khi ảnh vào màn hình 50px

// === 2. OBSERVER CHO INFINITE SCROLL ===
// Khi lướt tới cuối trang (thấy thẻ trigger) -> Gọi API tải thêm
const scrollObserver = new IntersectionObserver((entries) => {
    const trigger = entries[0];
    if (trigger.isIntersecting && !isFetching) {
        fetchPhotos();
    }
}, { rootMargin: "100px" }); // Bắt đầu gọi API trước khi chạm đáy 100px

// Kích hoạt theo dõi thẻ cuộn cuối trang
scrollObserver.observe(loadTrigger);

// === GỌI API & RENDER ===
async function fetchPhotos() {
    isFetching = true;
    loadTrigger.classList.add("active"); // Hiện loading spinner

    try {
        // Dùng API của Picsum để có ảnh đẹp
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=20`);
        if (!response.ok) throw new Error("Lỗi tải dữ liệu");
        
        const photos = await response.json();
        renderPhotos(photos);
        
        currentPage++; // Tăng trang lên cho lần cuộn tiếp theo
    } catch (error) {
        console.error("Fetch Error:", error);
        loadTrigger.innerHTML = `<span style="color:red">Lỗi tải ảnh. Vui lòng tải lại trang.</span>`;
    } finally {
        isFetching = false;
        loadTrigger.classList.remove("active");
    }
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";
        
        // Dùng URL chất lượng thấp cho Grid, URL chất lượng cao (full) cho Lightbox
        const thumbUrl = `https://picsum.photos/id/${photo.id}/400/300`;
        const fullUrl = `https://picsum.photos/id/${photo.id}/1200/900`;

        // Dùng data-src thay vì src để chặn việc tải ảnh ngay lập tức
        card.innerHTML = `
            <img class="lazy-image" 
                 data-src="${thumbUrl}" 
                 data-full="${fullUrl}" 
                 data-author="${photo.author}" 
                 alt="Photo by ${photo.author}">
            <div class="overlay">📸 ${photo.author}</div>
        `;
        
        grid.appendChild(card);

        // Đăng ký thẻ img vừa tạo vào imageObserver
        const newImg = card.querySelector(".lazy-image");
        imageObserver.observe(newImg);
    });
}

// === LIGHTBOX (MODAL XEM ẢNH) EVENT DELEGATION ===
grid.addEventListener("click", (e) => {
    const card = e.target.closest(".photo-card");
    if (!card) return;

    const img = card.querySelector("img");
    
    // Lấy link ảnh chất lượng cao và tên tác giả
    lightboxImg.src = img.dataset.full;
    lightboxCaption.textContent = `Nhiếp ảnh gia: ${img.dataset.author}`;
    lightbox.classList.add("show");
});

// Đóng Lightbox
lightbox.addEventListener("click", (e) => {
    // Chỉ đóng khi click vào nền đen hoặc nút X (Không đóng khi click vào ảnh)
    if (e.target !== lightboxImg) {
        lightbox.classList.remove("show");
        lightboxImg.src = ""; // Xóa src để giải phóng bộ nhớ
    }
});