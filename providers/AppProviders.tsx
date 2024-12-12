"use client";
import { useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider {...props}>{children}</ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
