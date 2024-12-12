import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProviders } from "@/providers/AppProviders";
import { Toaster } from "sonner";
import { neobrutalism } from "@clerk/themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Automation | New",
  description: "Write your automation flows in a simple and intuitive way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signUpForceRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL
      }
      afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-sm !shadow-none",
        },
        baseTheme: [neobrutalism],
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={(inter.className, "h-screen overflow-hidden antialiased")}
        >
          <AppProviders
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark", "modern"]}
            // disableTransitionOnChange
          >
            {children}
          </AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
