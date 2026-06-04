
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);
console.log("Test pipe():", process(5)); // → "Kết quả: 20"

function memoize(fn) {
    const cache = {}; // Biến private lưu trữ kết quả
    return function(...args) {
        // Biến mảng args thành chuỗi để làm key
        const key = JSON.stringify(args); 
        
        // Nếu đã tính rồi thì lấy từ cache ra
        if (cache[key] !== undefined) {
            return cache[key];
        }
        
        // Chưa tính thì gọi hàm fn để tính, sau đó lưu vào cache
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\nTest memoize():");
console.log(expensiveCalc(1000000)); // Lần đầu: Sẽ in ra "Đang tính..." và kết quả
console.log(expensiveCalc(1000000)); // Lần hai: Trả luôn kết quả (không in "Đang tính...")


function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        // Nếu hàm tiếp tục bị gọi, xoá lịch hẹn cũ đi
        clearTimeout(timeoutId);
        // Đặt lại lịch hẹn mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\nTest debounce(): (Đợi 500ms...)");
search("a"); // Bị hủy
search("ap"); // Bị hủy
search("app"); // Bị hủy
search("apple"); // Chỉ lần gọi cuối cùng này mới được thực thi sau 500ms


async function retry(fn, maxAttempts = 3) {
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            // Cố gắng chạy hàm
            return await fn();
        } catch (error) {
            // Nếu là lần thử cuối cùng mà vẫn lỗi thì ném lỗi ra ngoài
            if (i === maxAttempts) throw error;
            console.log(`Lần ${i} thất bại. Đang thử lại...`);
        }
    }
}