import { metrics, meetings } from "../../../lib/mockData";

export default function DashboardPage() {
  return (
    <main>
      <div className="container">
        <h1>Dashboard</h1>
        <p style={{ color: "var(--muted)" }}>
          Visão em tempo real do pipeline de transcrição e produtividade do time.
        </p>
        <section className="kpis" style={{ marginTop: 24 }}>
          {metrics.map((metric) => (
            <div key={metric.label} className="kpi">
              <span style={{ color: "var(--muted)" }}>{metric.label}</span>
              <strong>{metric.value}</strong>
              <span style={{ color: "var(--success)" }}>{metric.trend}</span>
            </div>
          ))}
        </section>

        <section className="card" style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h2>Fila de processamento</h2>
            <button className="button secondary">Reprocessar pendentes</button>
          </div>
          <div className="list">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="list-item">
                <div>
                  <strong>{meeting.title}</strong>
                  <div style={{ color: "var(--muted)" }}>{meeting.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="badge">{meeting.status}</span>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{meeting.platform}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
