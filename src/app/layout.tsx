import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Book Booking App",
    template: "%s | Book Booking App",
  },
  description:
    "Browse and book your favorite books with our easy-to-use booking system",
  keywords: ["books", "booking", "library", "reading"],
  authors: [{ name: "Satya Ranjan Sharma" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen antialiased">
        <AuthProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
