import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/lib/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://marsflixbd.vercel.app"),
  title: {
    default: "MarsFlixBD | Download Anime, Movies, Series",
    template: "%s | MarsFlixBD | Download Anime, Movies, Series",
  },
  description:
    "Download the latest anime, Bangla, Bollywood, Hollywood movies, and series for free at MarsFlixBD. Enjoy high-quality content with easy downloads.",
  applicationName: "MarsFlixBD",
  keywords: [
    "free movie downloads",
    "download latest movies",
    "Bollywood movie downloads",
    "Hollywood movie downloads",
    "anime movie downloads",
    "Bangla movie downloads",
    "free series downloads",
    "latest movie releases",
    "download movies online",
    "Bollywood series downloads",
    "Hollywood series downloads",
    "anime series downloads",
    "Bangla series downloads",
    "Hindi web series downloads",
    "English TV series downloads",
    "Korean TV series downloads",
    "high quality movie downloads",
    "free movie streaming",
    "bangla blog website",
    "marsflixbd",
  ],
  authors: [
    { name: "Mars Rian", url: "https://afzal-hussain-rian.vercel.app/" },
  ],
  creator: "Mars Rian",
  publisher: "Mars Rian",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title:
      "MarsFlixBD | Download Movies & Series - Anime, Bollywood, Hollywood",
    description:
      "Download the latest anime, Bangla, Bollywood, Hollywood movies, and series for free at MarsFlixBD. Enjoy high-quality content with easy downloads.",
    url: "https://marsflixbd.vercel.app",
    siteName: "MarsFlixBD",
    type: "website",
    local: "en_US",
    icons: {
      icon: ["/favicon.ico?v=4"],
      apple: ["/apple-touch-icon.png?v=4"],
      shortcut: ["/apple-touch-icon.png"],
    },
  },
  twitter: {
    title:
      "MarsFlixBD | Download Movies & Series - Anime, Bollywood, Hollywood",
    description:
      "Download the latest anime, Bangla, Bollywood, Hollywood movies, and series for free at MarsFlixBD. Enjoy high-quality content with easy downloads.",
    handle: "@marsflixbd",
    site: "MarsFlixBD",
    cardType: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console: */}
        <meta
          name="google-site-verification"
          content="G_temG5Xk7nXWyY11Hv0-ETRuShv-gT5Uw9Pd6t0YQ0"
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <div className="min-h-[calc(100vh-450px)]">{children}</div>
            <Toaster />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
