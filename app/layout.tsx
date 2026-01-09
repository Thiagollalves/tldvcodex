import "./globals.css";
import type { ReactNode } from "react";
import { AppHeader } from "../components/AppHeader";
import { AppFooter } from "../components/AppFooter";

export const metadata = {
  title: "tl;dv Codex | Reuniões inteligentes",
  description: "Gravação, transcrição e resumo inteligente de reuniões para equipes modernas."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
