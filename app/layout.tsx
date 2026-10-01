import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";

const display = Archivo({
  // latin-ext carries the dotless ı used in the hero
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaavin's Portfolio",
  description:
    "Kaavin Balasubramanian is a computer science master’s student at Rice University working on ML engineering: LLM and vision-language model fine-tuning, model evaluation and MLOps.",
  openGraph: {
    title: "Kaavin's Portfolio",
    description: "Machine learning engineering: LLM fine-tuning, model evaluation and MLOps.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#034694",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide not-yet-revealed content only when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
