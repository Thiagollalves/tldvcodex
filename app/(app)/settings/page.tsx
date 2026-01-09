export default function SettingsPage() {
  return (
    <main>
      <div className="container">
        <h1>Configurações</h1>
        <p style={{ color: "var(--muted)" }}>Controle de acesso, retenção de dados e LGPD.</p>
        <section className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Time & permissões</h3>
            <p style={{ color: "var(--muted)" }}>
              Convide membros, defina papéis (Admin, Editor, Viewer) e políticas de acesso.
            </p>
            <button className="button secondary">Gerenciar time</button>
          </div>
          <div className="card">
            <h3>Retenção de dados</h3>
            <p style={{ color: "var(--muted)" }}>
              Defina políticas de exclusão automática e exportação completa dos dados.
            </p>
            <button className="button secondary">Configurar retenção</button>
          </div>
          <div className="card">
            <h3>Integrações</h3>
            <p style={{ color: "var(--muted)" }}>
              Slack, Notion, Google Drive, Zapier e webhooks empresariais.
            </p>
            <button className="button secondary">Conectar apps</button>
          </div>
        </section>
      </div>
    </main>
  );
}
