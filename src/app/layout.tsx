import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/header/navbar";
import { Toaster } from "sonner";

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
      <body
        suppressHydrationWarning
        className="min-h-screen antialiased dark:bg-gray-800">
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen max-w-7xl mx-auto ">
              <Navbar />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "dark:bg-gray-800 dark:text-white dark:border-gray-700",
          }}
        />
      </body>
    </html>
  );
}
