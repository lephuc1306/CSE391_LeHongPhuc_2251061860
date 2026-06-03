function startGame() {
    // 1. Máy random 1 số từ 1-100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    let attempts = 0;
    let history = []; // Lưu các số đã đoán

    while (attempts < maxAttempts) {
        // 2. User nhập số
        let input = prompt(`Lượt ${attempts + 1}/${maxAttempts}\nHãy đoán một số từ 1 đến 100:`);
        
        // Nếu người dùng bấm Cancel
        if (input === null) {
            alert("Bạn đã thoát game!");
            return;
        }

        let guess = parseInt(input, 10);

        // Yêu cầu thêm: Validate input
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi! Chỉ chấp nhận số từ 1 đến 100.");
            continue; // Bỏ qua lượt này, không tính attempt
        }

        // Yêu cầu thêm: Check trùng lặp
        if (history.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
            continue;
        }

        // Hợp lệ thì tính 1 lượt đoán và lưu lịch sử
        history.push(guess);
        attempts++;

        // Kiểm tra kết quả
        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return; // Kết thúc game
        } else if (guess > targetNumber) {
            alert("Cao hơn! Hãy đoán số nhỏ hơn.");
        } else {
            alert("Thấp hơn! Hãy đoán số lớn hơn.");
        }
    }

    // 5. Hết 7 lượt
    alert(`Hết lượt! Bạn đã thua.\nĐáp án chính xác là: ${targetNumber}`);
}

// Chạy game khi file load
setTimeout(startGame, 500); // Delay nửa giây cho browser kịp render HTML