import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getNav } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "Bubble Mew — UMAD Strats",
    template: "%s · Bubble Mew",
  },
  description:
    "Bubble Mew's phase-by-phase strategy guide for Dancing Mad Ultimate (UMAD) in Final Fantasy XIV.",
};

// Runs before paint to set the theme from storage (or system preference),
// preventing a flash of the wrong theme on first load.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = getNav();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
          <Sidebar nav={nav} />
          <main className="min-w-0 flex-1 px-5 py-8 md:px-12 md:py-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
