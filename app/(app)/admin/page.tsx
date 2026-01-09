export default function AdminPage() {
  return (
    <main>
      <div className="container">
        <h1>Painel Admin</h1>
        <p style={{ color: "var(--muted)" }}>
          Monitoramento de jobs, erros, retries automáticos e trilha de auditoria.
        </p>
        <section className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Fila de processamento</h3>
            <ul>
              <li>Jobs em execução: 4</li>
              <li>Jobs com retry: 1</li>
              <li>Último erro: Timeout na diarização (m-002)</li>
            </ul>
          </div>
          <div className="card">
            <h3>Logs de acesso</h3>
            <ul>
              <li>09:12 · Maria (Admin) · Exportou PDF (m-001)</li>
              <li>09:25 · Lucas (Viewer) · Visualizou reunião (m-003)</li>
            </ul>
          </div>
          <div className="card">
            <h3>LGPD</h3>
            <ul>
              <li>Solicitações de exclusão pendentes: 0</li>
              <li>Dados criptografados: Ativo</li>
              <li>Consentimento explícito: Ativo</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
