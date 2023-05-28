import { Outlet } from "@remix-run/react";
import React from "react";
import { Footer, Header } from "~/components/layout";

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
