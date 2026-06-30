import { FEATURES } from "../../data/landing";

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-500">Features</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-navy-900 sm:text-5xl dark:text-white">
          Everything you need to transact with confidence
        </h2>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-navy-800 dark:bg-white/5 dark:text-brand-400">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy-900 dark:text-white">{f.title}</h3>
              <p className="mt-2.5 text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}