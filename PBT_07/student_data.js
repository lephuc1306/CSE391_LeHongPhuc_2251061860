const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1 & 2. Tính điểm TB và xếp loại (Thêm 2 thuộc tính mới vào object)
const processedStudents = students.map(student => {
    const avg = (student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3);
    let grade = "";
    
    if (avg >= 8.0) grade = "Giỏi";
    else if (avg >= 6.5) grade = "Khá";
    else if (avg >= 5.0) grade = "Trung bình";
    else grade = "Yếu";
    
    return { ...student, avg: avg, grade: grade };
});

// 3. In bảng kết quả bằng console.table (hoặc in chuỗi)
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
processedStudents.forEach((s, index) => {
    // padEnd giúp căn lề cột cho đẹp
    console.log(`| ${String(index + 1).padEnd(3)} | ${s.name.padEnd(6)} | ${s.avg.toFixed(1).padEnd(4)} | ${s.grade.padEnd(11)} |`);
});

// 4. Đếm số SV mỗi xếp loại (Dùng reduce)
const gradeCounts = processedStudents.reduce((acc, curr) => {
    acc[curr.grade] = (acc[curr.grade] || 0) + 1;
    return acc;
}, {});
console.log("\n4. Số SV mỗi xếp loại:", gradeCounts);

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
let highest = processedStudents[0];
let lowest = processedStudents[0];
processedStudents.forEach(s => {
    if (s.avg > highest.avg) highest = s;
    if (s.avg < lowest.avg) lowest = s;
});
console.log(`\n5. SV điểm cao nhất: ${highest.name} (${highest.avg.toFixed(1)}), Thấp nhất: ${lowest.name} (${lowest.avg.toFixed(1)})`);

// 6. Tính điểm TB toàn lớp cho từng môn
const totalScores = students.reduce((acc, curr) => {
    acc.math += curr.math;
    acc.physics += curr.physics;
    acc.cs += curr.cs;
    return acc;
}, { math: 0, physics: 0, cs: 0 });

const numStudents = students.length;
console.log(`\n6. TB toàn lớp -> Toán: ${(totalScores.math / numStudents).toFixed(2)}, Lý: ${(totalScores.physics / numStudents).toFixed(2)}, CS: ${(totalScores.cs / numStudents).toFixed(2)}`);

// 7. Bonus: Tính điểm TB theo giới tính
const genderStats = processedStudents.reduce((acc, curr) => {
    if (!acc[curr.gender]) acc[curr.gender] = { totalAvg: 0, count: 0 };
    acc[curr.gender].totalAvg += curr.avg;
    acc[curr.gender].count += 1;
    return acc;
}, {});

console.log("\n7. TB theo giới tính:");
console.log(`- Nam (M): ${(genderStats['M'].totalAvg / genderStats['M'].count).toFixed(2)}`);
console.log(`- Nữ (F): ${(genderStats['F'].totalAvg / genderStats['F'].count).toFixed(2)}`);