import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import NavBar from "@/components/navbar/nav";
import { cn } from "@/lib/utils";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Meteo Vallauri Velletri",
  description:
    "Applicazione web in grado di immagazzinare i dati raccolti dalla stazione meteo di Velletri creata dall'istituto I.T.I. G. Vallauri di Velletri",
  icons: {
    icon: "/site-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen overflow-x-hidden w-screen bg-background font-sans antialiased pb-40",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NavBar />
          {children}
          <ModeToggle className="fixed bottom-10 left-5" />
        </ThemeProvider>
      </body>
    </html>
  );
}
