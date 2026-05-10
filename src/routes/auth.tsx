import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { Plane, MapPin, Compass } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Traveloop" }, { name: "description", content: "Log in or sign up to plan your next trip with Traveloop." }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Illustration */}
      <div className="hidden lg:flex relative bg-gradient-primary text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <Logo className="text-primary-foreground [&_span:last-child]:text-primary-foreground" />
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
            <defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
            <rect width="600" height="600" fill="url(#dots)" />
            <path d="M50 400 Q 200 200 400 350 T 580 100" stroke="white" strokeWidth="2" strokeDasharray="6 8" fill="none" />
          </svg>
        </div>
        <div className="relative space-y-8">
          <Plane className="h-12 w-12 opacity-90" />
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-balance">Your next adventure begins with a single click.</h2>
            <p className="mt-3 opacity-90 max-w-md">Join thousands of travelers building beautiful itineraries every week.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 200+ cities</div>
            <div className="flex items-center gap-2"><Compass className="h-4 w-4" /> Smart routing</div>
          </div>
        </div>
        <p className="relative text-xs opacity-80">"Traveloop made our honeymoon stress-free." — Priya S.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-bold tracking-tight">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-muted-foreground">{mode === "login" ? "Sign in to continue planning your trip." : "Start planning multi-city adventures in minutes."}</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Amelia Wright" className="h-11" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" className="h-11" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === "login" && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="h-11" />
            </div>
            <Button asChild className="w-full h-11 shadow-glow"><Link to="/dashboard">{mode === "login" ? "Sign in" : "Create account"}</Link></Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border" />OR<div className="flex-1 h-px bg-border" /></div>
          <Button variant="outline" className="w-full h-11">Continue with Google</Button>

          <p className="mt-8 text-sm text-center text-muted-foreground">
            {mode === "login" ? "New to Traveloop?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
