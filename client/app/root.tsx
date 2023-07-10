import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

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
    charset: "utf-8",
  },{
    title: "Travels - Matt Welson",
  }
];


export default function App() {
  return (
    <html lang="en" className="sm:text-[20px]">
      <head>
        {process.env.NODE_ENV === "development" ? null : (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-WCB53BF66H"></script>
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
