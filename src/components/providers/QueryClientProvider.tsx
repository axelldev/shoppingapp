import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <Provider client={queryClient}>{children}</Provider>;
}
