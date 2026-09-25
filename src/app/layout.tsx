import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { CvDialogProvider } from "@/components/cv/cv-dialog";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Kevin Acebuche — Electronics Engineer building for the web",
  description:
    "Portfolio of Kevin Acebuche, an Electronics Engineering graduate from Teresa, Rizal, Philippines, moving into IT and web development. Technical support, CRM automation and self-taught web projects built with AI, including Daywell, a full-stack planner.",
  icons: { icon: "/assets/icons/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#16100b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", inter.variable, sora.variable)}>
      <body className="min-h-dvh">
        <ThemeProvider>
          <MotionProvider>
            <TooltipProvider>
              <CvDialogProvider>{children}</CvDialogProvider>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
