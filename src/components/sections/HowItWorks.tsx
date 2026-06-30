import { STEPS } from "../../data/landing";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-slate-50 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-500">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy-900 sm:text-5xl dark:text-white">
          Four steps to safer service payments
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white p-8 dark:bg-navy-900">
              <div className="font-mono text-4xl font-bold text-slate-200 dark:text-white/15">{s.n}</div>
              <h3 className="mt-6 text-xl font-bold text-navy-900 dark:text-white">{s.title}</h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}