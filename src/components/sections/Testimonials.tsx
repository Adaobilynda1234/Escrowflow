import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/landing";

export default function Testimonials() {
  return (
    <section className="bg-slate-50 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-500">Testimonials</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-5xl dark:text-white">
          What our users say
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-navy-950"
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-navy-900 dark:text-slate-200">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white ${t.accent}`}>
                  {t.initials}
                </span>
                <span>
                  <span className="block font-bold text-navy-900 dark:text-white">{t.name}</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}