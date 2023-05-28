import { Link } from "@remix-run/react";

export function Header() {
  return (
    <header className="sticky top-0 grid grid-cols-layout gap-x-8 bg-white py-4 dark:bg-slate-800">
      <div className="col-start-2 justify-self-center font-serif text-xl">
        <Link to="/">Travels</Link>
      </div>
    </header>
  );
}
