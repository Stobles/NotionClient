import { Inter } from "next/font/google";
import { AppProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
