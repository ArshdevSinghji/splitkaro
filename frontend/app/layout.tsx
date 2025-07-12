import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StoreProvider from "./redux/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Splitkaro",
  description: "Made With Love!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StoreProvider>
            {children}
            <Toaster position="top-right" theme="dark" />
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
