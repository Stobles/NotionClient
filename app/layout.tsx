import { Metadata } from "next";
import { App } from "@/app";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Stobletion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/logo.png",
        href: "/images/logo.png",
      },
    ],
  },
};

export default App;
