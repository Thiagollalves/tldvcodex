import { meetings } from "../../../../lib/mockData";

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  const meeting = meetings.find((item) => item.id === params.id) ?? meetings[0];

  return (
    <main>
      <div className="container">
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <div>
              <span className="badge">{meeting.status}</span>
              <h1 style={{ marginTop: 12 }}>{meeting.title}</h1>
              <p style={{ color: "var(--muted)" }}>
                {meeting.date} · {meeting.duration} · {meeting.platform} · {meeting.language}
              </p>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <button className="button secondary">Copiar resumo para WhatsApp</button>
              <button className="button secondary">Exportar PDF</button>
              <button className="button secondary">Exportar Markdown</button>
              <button className="button secondary">Enviar para Notion</button>
              <button className="button secondary">Enviar para Slack</button>
              <button className="button secondary">Enviar por e-mail</button>
            </div>
          </div>
        </section>

        <section className="two-col" style={{ marginTop: 24 }}>
          <div className="grid">
            <div className="card">
              <h2>Resumo estruturado</h2>
              <p>{meeting.summary.headline}</p>
              <ul>
                {meeting.summary.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Decisões</h3>
              <ul>
                {meeting.summary.decisions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Riscos</h3>
              <ul>
                {meeting.summary.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2>Transcrição sincronizada</h2>
              <div className="list">
                {meeting.participants.map((participant, index) => (
                  <div key={participant.name} className="list-item">
                    <div>
                      <strong>{participant.name}</strong> · {participant.role}
                      <p style={{ color: "var(--muted)" }}>
                        [{index * 2}:0{index}] Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Vivamus pulvinar.
                      </p>
                    </div>
                    <button className="button ghost">Criar clipe</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="grid">
            <div className="card">
              <h3>Participantes</h3>
              <ul>
                {meeting.participants.map((participant) => (
                  <li key={participant.name}>
                    {participant.name} · {participant.role}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Tarefas</h3>
              <ul>
                {meeting.tasks.map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong>
                    <div style={{ color: "var(--muted)" }}>
                      {task.owner} · {task.due}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Status do processamento</h3>
              <p style={{ color: "var(--muted)" }}>Pipeline executando com retries automáticos.</p>
              <ul>
                <li>Extração de áudio ✅</li>
                <li>Transcrição com diarização ✅</li>
                <li>Resumo estruturado ✅</li>
                <li>Extração de tarefas ✅</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
