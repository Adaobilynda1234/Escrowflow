import {
  Lock,
  Zap,
  ShieldCheck,
  TrendingUp,
  Users,
  DollarSign,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const STATS = [
  { value: "₦2.4B+", label: "Funds protected" },
  { value: "18,400+", label: "Projects completed" },
  { value: "99.2%", label: "Dispute-free rate" },
  { value: "4.9/5", label: "User satisfaction" },
];

export const STEPS = [
  { n: "01", title: "Create a Project", desc: "Define your project, set milestones, and invite your service provider." },
  { n: "02", title: "Fund the Escrow", desc: "Deposit funds into a dedicated project account — secured until work is done." },
  { n: "03", title: "Track Milestones", desc: "Monitor progress in real time. Approve completed stages as you go." },
  { n: "04", title: "Release Payment", desc: "Funds flow automatically when a milestone is approved. Zero disputes." },
];

export type Feature = { icon: LucideIcon; title: string; desc: string };

export const FEATURES: Feature[] = [
  { icon: Lock, title: "Escrow-Protected Funds", desc: "Your money is held securely until each milestone is verified and approved by you." },
  { icon: Zap, title: "Instant Milestone Releases", desc: "Approve a milestone and the provider gets paid within seconds — no delays." },
  { icon: ShieldCheck, title: "Dispute Resolution", desc: "Raise a dispute to pause payments. Our team mediates fairly and transparently." },
  { icon: TrendingUp, title: "Real-time Tracking", desc: "Live dashboards for both clients and providers. Everyone stays on the same page." },
  { icon: Users, title: "Dual Roles", desc: "One account lets you act as both a client and a service provider across projects." },
  { icon: DollarSign, title: "Transparent Fees", desc: "Flat, predictable transaction fees. No hidden charges, ever." },
];

export type Testimonial = { quote: string; name: string; role: string; initials: string; accent: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I hired a contractor for my renovation and paid ₦800k upfront before — and lost it. EscrowFlow changed how I hire forever.",
    name: "Adaeze Okonkwo",
    role: "Homeowner, Lagos",
    initials: "AO",
    accent: "bg-indigo-500",
  },
  {
    quote:
      "Clients used to ghost me after delivery. Now I get paid per milestone. My income is predictable and protected.",
    name: "Tunde Fashola",
    role: "Freelance Developer, Abuja",
    initials: "TF",
    accent: "bg-brand-500",
  },
  {
    quote:
      "My clients trust me more now because they know their money is safe. EscrowFlow helped me close 3× more deals.",
    name: "Chisom Eze",
    role: "Event Planner, Port Harcourt",
    initials: "CE",
    accent: "bg-purple-500",
  },
];

export type Tier = { name: string; rate: string; band: string; features: string[]; featured?: boolean };

export const TIERS: Tier[] = [
  {
    name: "Starter",
    rate: "1.5%",
    band: "Projects up to ₦500,000",
    features: [
      "Up to 5 milestones per project",
      "Bank transfer funding",
      "Email notifications",
      "Basic dispute submission",
      "Client & provider dashboards",
    ],
  },
  {
    name: "Standard",
    rate: "1.0%",
    band: "Projects ₦500k – ₦5M",
    featured: true,
    features: [
      "Unlimited milestones",
      "Card + bank transfer funding",
      "SMS & email notifications",
      "Priority dispute resolution",
      "Activity history & exports",
      "Multiple projects at once",
    ],
  },
  {
    name: "Business",
    rate: "0.75%",
    band: "Projects above ₦5M",
    features: [
      "Everything in Standard",
      "Dedicated account manager",
      "Custom milestone templates",
      "API access",
      "Volume discounts available",
      "SLA-backed dispute resolution",
    ],
  },
];

export const FAQS = [
  {
    q: "What is EscrowFlow and how does it work?",
    a: "EscrowFlow is a milestone-based escrow platform for service payments. A client funds a project up front, the money is held safely in a dedicated escrow account, and each portion is released to the provider only after the matching milestone is completed and approved.",
  },
  {
    q: "Who pays the transaction fee — client or provider?",
    a: "Only the party receiving funds pays the fee. It's deducted automatically from each milestone release, so clients never pay extra on top of the project amount.",
  },
  {
    q: "What happens if the provider doesn't complete the work?",
    a: "Any funds tied to unfinished milestones stay locked in escrow. You can raise a dispute to pause releases, and our team steps in to mediate before any money moves.",
  },
  {
    q: "How quickly is a payment released after I approve a milestone?",
    a: "Releases are near-instant. Once you approve a milestone, the funds are sent to the provider within seconds.",
  },
  {
    q: "Can I use EscrowFlow as both a client and a service provider?",
    a: "Yes. A single account supports both roles, so you can hire on one project and get hired on another without switching accounts.",
  },
  {
    q: "Is my money safe if EscrowFlow has a technical issue?",
    a: "Funds are held in dedicated, segregated project accounts kept separate from our operating funds, so your balance is always protected and accounted for.",
  },
  {
    q: "What service categories does EscrowFlow support?",
    a: "Freelancers, developers, tailors, plumbers, electricians, caterers, mechanics, event planners, contractors — any service that can be broken into milestones.",
  },
];