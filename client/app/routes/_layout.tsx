import { Outlet } from "@remix-run/react";
import React from "react";
import { Footer, Header } from "~/components/layout";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
