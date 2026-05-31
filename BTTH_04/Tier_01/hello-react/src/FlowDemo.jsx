import { useState } from "react";

function FlowDemo() {
    console.log("🔄 FlowDemo Component đang render!");
    
    const [step, setStep] = useState(1);
    
    return (
        <div style={{ padding: "20px", border: "2px solid #9b59b6" }}>
            <h2>Luồng hoạt động (Flow)</h2>
            <p>Bước hiện tại: <strong>{step}</strong></p>
            
            <button onClick={() => setStep(step + 1)} style={{ marginRight: "10px", padding: "5px" }}>
                Bước tiếp theo →
            </button>
            
            <button onClick={() => setStep(1)} style={{ padding: "5px" }}>
                Quay lại đầu
            </button>
            
            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step >= 4 && <p>🎉 Bước {step}: Hoàn thành!</p>}
            </div>
        </div>
    );
}

export default FlowDemo;