'use client';

import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
      <TanStackQueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </TanStackQueryClientProvider>
  );
}
