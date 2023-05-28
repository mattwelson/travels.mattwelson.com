import { Link } from "@remix-run/react";
import { ScrollProgress } from "./ScrollProgress";

export function Header() {
  return (
    <header className="sticky top-0 grid grid-cols-layout gap-x-8 bg-white dark:bg-slate-800">
      <div className="col-start-2 justify-self-center py-4 font-serif text-xl">
        <Link to="/">Travels</Link>
      </div>
      <ScrollProgress />
    </header>
  );
}
