function TodoFilter({ filter, setFilter }) {
    const filters = [
        { key: "all", label: "Tất cả" },
        { key: "active", label: "Chưa xong" },
        { key: "completed", label: "Hoàn thành" }
    ];
    
    return (
        <div style={{ display: "flex", marginBottom: "15px", gap: "5px" }}>
            {filters.map(f => (
                <button 
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{ 
                        flex: 1, padding: "8px", border: "none", borderRadius: "4px", cursor: "pointer",
                        background: filter === f.key ? "#3498db" : "#f0f0f0",
                        color: filter === f.key ? "white" : "#333",
                        fontWeight: filter === f.key ? "bold" : "normal"
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;