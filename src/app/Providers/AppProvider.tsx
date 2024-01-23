import { QueryClientProvider } from "./QueryClientProvider";
import { Toaster } from "sonner";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider>
      <Toaster position="bottom-center" richColors />
      {children}
    </QueryClientProvider>
  );
}
