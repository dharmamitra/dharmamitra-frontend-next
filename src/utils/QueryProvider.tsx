"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // 1 hour
        staleTime: 60 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000,
        // 2 days
        gcTime: 2 * 24 * 60 * 60 * 1000,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      {children}
    </QueryClientProvider>
  )
}
