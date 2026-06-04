const miniArray = {
    // Nhận vào mảng và 1 hàm callback
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Push kết quả của hàm callback vào mảng mới
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu callback trả về true thì mới push vào mảng kết quả
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        let startIndex = 0;
        
        // Xử lý trường hợp không truyền initialValue
        if (initialValue === undefined) {
            acc = arr[0];
            startIndex = 1;
        }
        
        for (let i = startIndex; i < arr.length; i++) {
            // acc (accumulator) được cập nhật liên tục qua mỗi vòng lặp
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// ================= TEST =================
console.log(miniArray.map([1,2,3], x => x * 2));          // → [2, 4, 6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));     // → [3, 4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));// → 10