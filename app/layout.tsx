import type { Metadata } from "next";
import "@/app/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SideNav from "@/components/side-nav";

export const metadata: Metadata = {
  title: "Product",
  description: "Product app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col text-slate-700">
        <Header />

        <div className="mt-14 flex flex-1">
          <SideNav />

          <main className="flex-1">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
