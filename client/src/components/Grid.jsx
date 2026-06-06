export default function Grid({ children }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
                marginTop: "1rem",
            }}
        >
            {children}
        </div>
    );
}
