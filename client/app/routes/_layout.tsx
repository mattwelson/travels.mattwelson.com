import { Outlet } from "@remix-run/react";
import { LayoutGroup, motion } from "framer-motion";
import { Footer, Header } from "~/components/layout";

export default function Layout() {
  return (
    <motion.div className=" grid min-h-screen grid-rows-[auto_1fr_auto] items-start dark:bg-slate-800 dark:text-white">
      <Header />
      <LayoutGroup>
        <Outlet />
      </LayoutGroup>
      <Footer />
    </motion.div>
  );
}
