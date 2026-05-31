function AndDemo() {
    const hasNotification = true;
    const notificationCount = 5;
    
    return (
        <div style={{ padding: "20px", border: "2px solid #9b59b6", marginBottom: "15px" }}>
            <h2>3. Điều Kiện (Dùng &&)</h2>
            
            {/* Hiện khi có thông báo */}
            {hasNotification && (
                <div style={{ background: "#fff3cd", padding: "10px", color: "#856404", borderRadius: "5px" }}>
                    Bạn có {notificationCount} thông báo mới!
                </div>
            )}
            
            {/* Không hiện gì khi không có */}
            {!hasNotification && <p>Không có thông báo</p>}
        </div>
    );
}

export default AndDemo;