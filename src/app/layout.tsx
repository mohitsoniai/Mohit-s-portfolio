import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/lenis-provider";
import CustomCursor from "@/components/ui/custom-cursor";
import CanvasParticles from "@/components/ui/canvas-particles";
import AuroraBg from "@/components/ui/aurora-bg";
import CommandPalette from "@/components/ui/command-palette";
import AskMohitWidget from "@/components/chatbot/ask-mohit-widget";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohit Swarnkar | Azure Cloud, DevOps & Full Stack Engineer",
  description: "Personal Portfolio of Mohit Swarnkar - Azure Cloud Engineer, DevOps Engineer, Full Stack Developer, and AI Specialist. Crafting next-generation cloud architectures and intelligent web experiences.",
  keywords: [
    "Mohit Swarnkar",
    "Azure Cloud Engineer",
    "DevOps Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Cloud Architect",
    "Kubernetes AKS",
    "Terraform IaC",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Mohit Swarnkar" }],
  creator: "Mohit Swarnkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohitswarnkar.dev",
    title: "Mohit Swarnkar | Azure Cloud & DevOps Architect",
    description: "Architecting enterprise cloud scaling, automated CI/CD infrastructures, and immersive web platforms.",
    siteName: "Mohit Swarnkar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Swarnkar | Azure Cloud & DevOps Architect",
    description: "Architecting enterprise cloud scaling, automated CI/CD infrastructures, and immersive web platforms.",
    creator: "@mohitswarnkar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-accent/30 selection:text-white flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohit Swarnkar",
              "url": "https://mohitswarnkar.dev",
              "sameAs": [
                "https://github.com/mohitsoniai",
                "https://linkedin.com/in/mohitswarnkar"
              ],
              "jobTitle": "Azure Cloud & DevOps Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Parul University"
              },
              "description": "Personal Portfolio of Mohit Swarnkar - Azure Cloud Engineer, DevOps Engineer, Full Stack Developer, and AI Specialist. Crafting next-generation cloud architectures and intelligent web experiences."
            })
          }}
        />
        <LenisProvider>
          <AuroraBg />
          <CanvasParticles />
          <CustomCursor />
          <CommandPalette />
          
          <main className="relative z-10 flex-1 flex flex-col">
            {children}
          </main>

          <AskMohitWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
