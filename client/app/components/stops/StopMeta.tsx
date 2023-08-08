import { Link } from "@remix-run/react";

export function StopMeta({
  date,
  country,
}: {
  date: string;
  country?: { title: string; slug: string[] };
}) {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="text-slate-600 dark:text-slate-400">{date}</div>
      {country && (
        <Link
          to={country.slug.join("/")}
          className="px-4 py-1 bg-emerald-800 rounded-full no-underline"
        >
          {country.title}
        </Link>
      )}
    </div>
  );
}
