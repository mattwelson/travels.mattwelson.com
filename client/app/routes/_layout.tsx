import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React from "react";
import { Footer, Header } from "~/components/layout";

export default function Layout() {
  return (
    <div className=" grid min-h-screen grid-rows-[auto_1fr_auto] items-start dark:bg-slate-800 dark:text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
