// ==========================================
// VERSION 1: Classic FizzBuzz (1-100)
// ==========================================
console.log("--- VERSION 1: Classic FizzBuzz ---");
for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    
    // Nếu output rỗng (không chia hết cho 3 hay 5), thì in ra số đó
    console.log(output || i);
}

// ==========================================
// VERSION 2: Custom FizzBuzz (Hoạt động với BẤT KỲ rule nào)
// ==========================================
console.log("\n--- VERSION 2: Custom FizzBuzz ---");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Duyệt qua từng rule trong mảng
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        console.log(`${i}: ${output || i}`);
    }
}

// Test đúng như đề bài yêu cầu
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);