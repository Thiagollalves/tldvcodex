import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <div className="grid" style={{ gap: 32 }}>
          <section className="card">
            <span className="badge">MVP focado em upload + gravação no navegador</span>
            <h1 style={{ fontSize: 40, margin: "12px 0" }}>
              Reuniões com gravação, transcrição e resumos acionáveis em minutos.
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)" }}>
              Inspire-se no tl;dv com pipeline completo de IA, multi-idiomas, LGPD e integrações
              corporativas. Centralize tarefas, decisões e conhecimento das reuniões.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button className="button">Começar agora</button>
              <Link className="button secondary" href="/dashboard">
                Ver dashboard
              </Link>
            </div>
          </section>

          <section className="grid grid-3">
            {[
              {
                title: "Captura completa",
                description:
                  "Upload, gravação no navegador e arquitetura pronta para bots de reunião e apps desktop."
              },
              {
                title: "Resumos inteligentes",
                description:
                  "Templates por contexto, extração de tarefas, decisões e riscos com validação de schema."
              },
              {
                title: "Busca + Chat",
                description:
                  "Encontre momentos-chave e consulte a reunião usando chat contextual privado."
              }
            ].map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p style={{ color: "var(--muted)" }}>{item.description}</p>
              </div>
            ))}
          </section>

          <section className="card">
            <h2>Plataformas suportadas</h2>
            <div className="grid grid-3">
              {["Google Meet", "Zoom", "Microsoft Teams", "Presencial", "Upload"].map(
                (platform) => (
                  <div key={platform} className="list-item">
                    <div>
                      <strong>{platform}</strong>
                      <p style={{ color: "var(--muted)" }}>
                        Pronto para captura via bot, extensão ou upload seguro.
                      </p>
                    </div>
                    <span className="badge">Em evolução</span>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
