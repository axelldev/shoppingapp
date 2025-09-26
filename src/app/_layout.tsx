import QueryClientProvider from "@/components/providers/QueryClientProvider";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Shop",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
