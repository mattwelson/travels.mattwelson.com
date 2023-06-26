export function StopMeta({ date, region }: { date: string; region?: string }) {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="text-slate-600 dark:text-slate-400">{date}</div>
      {region && (
        <div className="px-4 py-1 bg-emerald-800 rounded-full">{region}</div>
      )}
    </div>
  );
}
