import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaavin's Portfolio",
  description: "Portfolio website of Kaavin Balasubramanian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={
          {
            "--font-geist-sans":
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            "--font-geist-mono":
              '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            "--font-editorial":
              '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
