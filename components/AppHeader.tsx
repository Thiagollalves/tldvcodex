import Link from "next/link";

const navLinks = [
  { href: "/", label: "Visão geral" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/meetings", label: "Reuniões" },
  { href: "/chat", label: "Chat" },
  { href: "/settings", label: "Configurações" }
];

export function AppHeader() {
  return (
    <header>
      <div className="header-inner">
        <div>
          <strong>tl;dv Codex</strong>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Reuniões com IA + LGPD</div>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="badge">PT-BR / EN</span>
          <Link className="button secondary" href="/login">
            Entrar
          </Link>
          <button className="button">Criar reunião</button>
        </div>
      </div>
    </header>
  );
}
