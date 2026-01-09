import Link from "next/link";
import { meetings } from "../../../lib/mockData";

export default function MeetingsPage() {
  return (
    <main>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>Reuniões</h1>
            <p style={{ color: "var(--muted)" }}>
              Busque por participantes, tags, datas ou palavras-chave da transcrição.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="button secondary">Upload</button>
            <button className="button">Gravar no navegador</button>
          </div>
        </div>

        <section className="card" style={{ marginTop: 24 }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Buscar</span>
              <input
                style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}
                placeholder="Ex: decisões, prazos, time comercial"
              />
            </label>
            <label>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Data</span>
              <input
                type="date"
                style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}
              />
            </label>
            <label>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Participante</span>
              <input
                style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}
                placeholder="Nome"
              />
            </label>
            <label>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Tipo</span>
              <select
                style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}
              >
                <option>Todos</option>
                <option>Daily</option>
                <option>1:1</option>
                <option>Comercial</option>
                <option>Executivo</option>
              </select>
            </label>
          </div>
        </section>

        <section className="list" style={{ marginTop: 24 }}>
          {meetings.map((meeting) => (
            <div key={meeting.id} className="list-item">
              <div>
                <h3>{meeting.title}</h3>
                <div style={{ color: "var(--muted)" }}>
                  {meeting.date} · {meeting.duration} · {meeting.platform}
                </div>
                <div style={{ marginTop: 8 }}>
                  {meeting.tags.map((tag) => (
                    <span key={tag} className="badge" style={{ marginRight: 8 }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="badge">{meeting.status}</span>
                <div style={{ marginTop: 12 }}>
                  <Link className="button secondary" href={`/meetings/${meeting.id}`}>
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
