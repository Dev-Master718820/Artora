import type { Metadata } from "next";
import { DemoProvider } from "@/context/demo-context";
import { Header, Footer } from "@/components/layout/header";
import "./globals.css";
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: {
    default: "Artora — Original Art. Real People. Your Story.",
    template: "%s | Artora",
  },
  description:
    "Discover original art, commission a painting, connect with creative people, and keep learning. A beautifully human world of art. Frontend demo.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
