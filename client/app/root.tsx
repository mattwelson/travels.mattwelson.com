import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { useEffect } from "react";
import { pageview } from "./util/gtag.client";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Rubik:wght@400;700&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: V2_MetaFunction = () => [
  {
    title: "Travels - Matt Welson",
  },
];

export default function App() {
  const location = useLocation();
  useEffect(() => {
    pageview(location.pathname, "G-WCB53BF66H");
  }, [location]);

  return (
    <html lang="en" className="sm:text-[20px] dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme" content="#293B57" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:site_name" content="Travels - Matt Welson" />
        <Meta />
        <Links />
        {process.env.NODE_ENV === "development" ? null : (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-WCB53BF66H"
            ></script>
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-WCB53BF66H', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
      </head>
      <body className="dark:bg-slate-800">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
