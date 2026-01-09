export default function LoginPage() {
  return (
    <main>
      <div className="container">
        <section className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
          <h1>Entrar no tl;dv Codex</h1>
          <p style={{ color: "var(--muted)" }}>
            Login com Google OAuth ou magic link. Suporte multi-tenant com times e permissões.
          </p>
          <div className="grid" style={{ marginTop: 20 }}>
            <button className="button">Entrar com Google</button>
            <button className="button secondary">Enviar link mágico por e-mail</button>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: "var(--muted)" }}>
            Ao continuar, você concorda com a política de privacidade e consentimento de gravação.
          </div>
        </section>
      </div>
    </main>
  );
}
