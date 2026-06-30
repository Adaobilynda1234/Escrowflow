import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-5 w-5 text-brand-400" />
          <span className="font-bold">EscrowFlow</span>
        </a>
        <p className="text-sm">© {new Date().getFullYear()} EscrowFlow. All rights reserved.</p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}