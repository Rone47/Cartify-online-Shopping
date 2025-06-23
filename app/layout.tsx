import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%S - Cartify online store",
    default: "%S - Cartify online store",
  },
  description:
    "Cartify is an online store, Your one stop shop for all your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="font-poppins">
        <body className="font-poppins antialiased">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main > {children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
