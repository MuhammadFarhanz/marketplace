import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import Navbar from "~/components/navbar/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
