function SimpleVariables() {
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React"];
    
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", marginBottom: "15px" }}>
            <h2>1. Biến Đơn Giản</h2>
            <h1>Xin chào {ten}!</h1>
            <p>Tuổi: {tuoi}</p>
            <p>Năm sau: {tuoi + 1}</p>
            <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>
            
            <h3>Môn học yêu thích:</h3>
            <p>{monHoc.join(", ")}</p>
        </div>
    );
}

export default SimpleVariables;