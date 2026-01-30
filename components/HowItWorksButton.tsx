import Link from "next/link";

interface HowItWorksButtonProps {
  className?: string;
}

const HowItWorksButton = ({ className }: HowItWorksButtonProps) => {
  return (
    <Link
      href="/guide"
      className={className || "inline-flex items-center justify-center bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"}
    >
      How it Works
    </Link>
  );
};

export default HowItWorksButton;
