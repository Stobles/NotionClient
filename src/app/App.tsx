import { Inter } from "next/font/google";
import { AppProvider } from "./Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
