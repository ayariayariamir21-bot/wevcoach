import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alex Coach — Marathon Coach & Runner",
  description:
    "Personalized marathon training plans, 1:1 coaching, ebooks, and running gear.",
  openGraph: {
    title: "Alex Coach — Marathon Coach & Runner",
    description:
      "Personalized marathon training plans, 1:1 coaching, ebooks, and running gear.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alex Coach — Marathon Coach & Runner",
    description:
      "Personalized marathon training plans, 1:1 coaching, ebooks, and running gear.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
