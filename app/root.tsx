import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Quartz Clean: Code-only Favicon (SVG Data URI)
  {
    rel: "icon",
    type: "image/svg+xml",
    href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2224%22 fill=%22%234F46E5%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22900%22 font-size=%2250%22 letter-spacing=%22-2%22>CV</text></svg>`,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="bg-quartz-hero min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[40px] border border-white shadow-2xl max-w-2xl w-full">
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
          {message}
        </h1>
        <p className="text-xl font-bold text-slate-500 tracking-tight mb-8">
          {details}
        </p>

        {stack && (
          <div className="text-left bg-slate-900 rounded-2xl p-6 overflow-hidden border border-slate-800 shadow-inner">
            <pre className="overflow-x-auto text-xs font-mono text-indigo-300">
              <code>{stack}</code>
            </pre>
          </div>
        )}

        <a
          href="/"
          className="inline-block mt-8 primary-button px-10 py-4 text-sm font-black uppercase tracking-widest"
        >
          Return Home
        </a>
      </div>
    </main>
  );
}
