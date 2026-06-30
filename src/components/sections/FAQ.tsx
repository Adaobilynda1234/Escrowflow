import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { FAQS } from "../../data/landing";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 dark:bg-navy-900">
      <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy-900 sm:text-5xl dark:text-white">
          Frequently asked questions
        </h2>

        <div className="mt-12 divide-y divide-slate-200 dark:divide-white/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-navy-900 dark:text-white">{item.q}</span>
                  <ChevronDown
                    className={"h-5 w-5 shrink-0 text-slate-400 transition-transform " + (isOpen ? "rotate-180" : "")}
                  />
                </button>
                <div
                  className={
                    "grid overflow-hidden transition-all duration-200 " +
                    (isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")
                  }
                >
                  <p className="overflow-hidden text-slate-500 dark:text-slate-400">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl bg-indigo-50 p-6 sm:flex-row sm:items-center dark:bg-white/5">
          <div>
            <p className="font-bold text-navy-900 dark:text-white">Still have questions?</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Our support team replies within 2 hours on business days.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            <MessageSquare className="h-4 w-4" /> Contact support
          </a>
        </div>
      </div>
    </section>
  );
}