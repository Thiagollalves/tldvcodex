import { chatMessages, meetings } from "../../../lib/mockData";

export default function ChatPage() {
  return (
    <main>
      <div className="container">
        <h1>Chat com a reunião</h1>
        <p style={{ color: "var(--muted)" }}>
          Pergunte sobre decisões, tarefas ou momentos da reunião. Respostas baseadas somente
          no conteúdo gravado.
        </p>
        <section className="card" style={{ marginTop: 24 }}>
          <label>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Selecionar reunião</span>
            <select
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}
            >
              {meetings.map((meeting) => (
                <option key={meeting.id}>{meeting.title}</option>
              ))}
            </select>
          </label>
          <div className="chat-box" style={{ marginTop: 16 }}>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className="chat-message"
                style={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start" }}
              >
                <strong>{message.role === "user" ? "Você" : "Assistente"}</strong>
                <div>{message.content}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <input
              style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid var(--border)" }}
              placeholder="Pergunte algo..."
            />
            <button className="button">Enviar</button>
          </div>
        </section>
      </div>
    </main>
  );
}
