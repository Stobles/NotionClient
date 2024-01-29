import { Metadata } from "next";
import { App } from "@/app";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Stobletion",
  description: "Проект для портфолио 'Клон Notion'.",
  icons: {
    icon: [
      {
        url: "/images/logo.png",
        href: "/images/logo.png",
      },
    ],
  },
  openGraph: {
    title: "Главная страница. Stobletion",
    description: "Главная страница проекта для портфолио 'Клон Notion'.",
    url: "https://stoble.ru",
    siteName: "Stobletion",
    images: [
      {
        url: "/images/logo.png",
        width: 600,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default App;
