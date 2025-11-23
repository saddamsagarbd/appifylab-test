import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/common.css";
import "../public/assets/css/main.css";
import "../public/assets/css/responsive.css";
import { AuthProvider } from "./context/AuthContext";
import BootstrapClient from "./components/BootstrapClient";
import Toast from "./components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buddy Script",
  description: "Appift Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <BootstrapClient />
          {children}
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
