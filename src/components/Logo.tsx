import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
        <Compass className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <span className="text-lg">Traveloop</span>
    </Link>
  );
}
