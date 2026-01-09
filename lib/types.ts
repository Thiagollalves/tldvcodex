export type MeetingStatus = "queued" | "processing" | "ready" | "error";

export type Meeting = {
  id: string;
  title: string;
  date: string;
  duration: string;
  platform: "Google Meet" | "Zoom" | "Microsoft Teams" | "Presencial" | "Upload";
  status: MeetingStatus;
  language: "pt-BR" | "en";
  tags: string[];
  summary: {
    headline: string;
    bullets: string[];
    decisions: string[];
    risks: string[];
  };
  tasks: Array<{ id: string; title: string; owner: string; due: string }>;
  participants: Array<{ name: string; role: string }>;
};

export type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};
