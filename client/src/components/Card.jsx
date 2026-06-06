export default function Card({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="card"
            style={{
                /* original card visuals */
                padding: "1.25rem",
                borderRadius: "12px",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: onClick ? "pointer" : "default",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",

                /* containment fixes */
                overflow: "hidden",
                width: "100%",
                boxSizing: "border-box",
                wordWrap: "break-word",
                display: "flex",
                flexDirection: "column",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}
        >
            {children}
        </div>
    );
}
