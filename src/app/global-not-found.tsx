export default function GlobalNotFound() {
  return (
    <html lang="en" data-global-not-found="true">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>Page Not Found</h1>
            <p style={{ marginTop: 12, color: "#a1a1aa", lineHeight: 1.6 }}>
              The page you requested does not exist.
            </p>
            <div style={{ marginTop: 24 }}>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  border: "1px solid #404040",
                  borderRadius: 8,
                  padding: "10px 16px",
                  color: "#fafafa",
                  textDecoration: "none",
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
