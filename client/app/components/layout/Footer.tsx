import { Link } from "@remix-run/react";
import { FaGithub, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-16 grid grid-cols-layout justify-items-center gap-x-8 gap-y-4 bg-white pb-16 pt-8 dark:bg-slate-900">
      <div className="col-start-2">Made by Matt Welson</div>
      <div className="col-start-2">
        <Link to="/about">About</Link>
      </div>
      <div className="col-start-2 grid grid-cols-2 justify-items-center">
        <a
          className="group grid justify-items-center transition-colors hover:dark:text-slate-200"
          href="https://www.instagram.com/m.welson/"
        >
          <FaInstagram className="text-4xl text-white group-hover:dark:text-emerald-400" />
          @m.welson
        </a>
        <a
          className="group grid justify-items-center transition-colors hover:dark:text-slate-200"
          href="https://www.instagram.com/alice.adventuring"
        >
          <FaInstagram className="text-4xl text-white group-hover:dark:text-emerald-400" />
          @alice.adventuring
        </a>
      </div>
      <div className="col-start-2">
        <a href="https://github.com/mattwelson/travels.mattwelson.com">
          <FaGithub className="text-4xl" />
        </a>
      </div>
    </footer>
  );
}
