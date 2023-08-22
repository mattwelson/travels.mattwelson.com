import React from "react";

// Note the mix of selectors used for figure - specificity was a bit of a pain here, could use important to override original issue
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <article
      className={`grid-cols-layout
      prose
      prose-slate
      grid
      max-w-full
      gap-x-8
      dark:prose-invert 
      prose-headings:font-serif 
      prose-figure:mx-auto 
      prose-figure:max-w-fit
      prose-figcaption:ml-8
      [&>*]:col-start-2
      [&>figure]:col-start-1
      [&>figure]:col-end-[-1]
      prose-blockquote:py-4
      prose-blockquote:border-l-emerald-500
      prose-blockquote:border-l-8
      prose-blockquote:bg-slate-900
      prose-blockquote:-mx-8
      prose-blockquote:px-6
      prose-h1:text-xl
      prose-h1:sm:text-2xl
      prose-h1:md:text-4xl
      `}
    >
      {children}
    </article>
  );
}
