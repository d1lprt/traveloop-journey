import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowRight, Map, Wallet, Share2, Sparkles, Globe2, Plane, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Traveloop — Plan multi-city trips, effortlessly" },
      { name: "description", content: "Build, organize, and share beautiful multi-city itineraries with smart budgets, activities and packing checklists." },
      { property: "og:title", content: "Traveloop — Effortless travel planning" },
      { property: "og:description", content: "Personalized multi-city itineraries with budgets and shared trip plans." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#testimonials" className="hover:text-foreground">Loved by</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/auth">Log in</Link></Button>
            <Button asChild><Link to="/dashboard">Get started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <img src={heroImg} alt="" className="w-full h-full object-cover mix-blend-multiply" width={1536} height={1152} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border px-4 py-1.5 text-xs font-medium shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New — AI itinerary suggestions
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl mx-auto">
            Plan unforgettable trips,<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">one city at a time.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Traveloop is the calmest way to build, organize and share multi-city itineraries — with smart budgets, activities and packing lists baked in.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="h-12 px-7 text-base shadow-glow">
              <Link to="/trips/new">Plan Your Trip <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-7 text-base bg-card/70 backdrop-blur">
              <Link to="/dashboard">Explore Demo</Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-sunset text-sunset" /> 4.9 on Product Hunt</div>
            <div>120k+ trips planned</div>
            <div className="hidden sm:block">Used in 80+ countries</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Features</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Everything you need to travel well.</h2>
          <p className="mt-3 text-muted-foreground">Thoughtful tools that disappear into the background, so you can focus on the journey.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Map, title: "Multi-city itineraries", desc: "Drag, drop and reorder stops on a beautiful timeline." },
            { icon: Wallet, title: "Smart budgets", desc: "Track transport, stays, food and activities at a glance." },
            { icon: Globe2, title: "City discovery", desc: "Find hidden gems with curated activities and tips." },
            { icon: Share2, title: "One-click sharing", desc: "Send a polished public link to friends and family." },
          ].map((f) => (
            <Card key={f.title} className="p-6 rounded-2xl shadow-soft hover:shadow-card transition-shadow border-border/60">
              <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/40 border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">From idea to itinerary in minutes.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Create a trip", desc: "Name your adventure, set dates, add a cover image." },
              { n: "02", title: "Add cities & activities", desc: "Search destinations, drop them into a timeline, plan each day." },
              { n: "03", title: "Share & travel", desc: "Send a public link, track your budget, and enjoy the journey." },
            ].map((s) => (
              <div key={s.n} className="relative p-8 rounded-3xl bg-card shadow-soft border">
                <span className="text-sm font-bold text-primary/60">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Loved by travelers</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">A calmer way to plan.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { name: "Amina K.", role: "Backpacker", quote: "Planned a 6-city Europe trip in one evening. The drag-and-drop builder is magical." },
            { name: "Jonas P.", role: "Digital nomad", quote: "Budget tracking saved me from overspending in Tokyo. Beautifully designed." },
            { name: "Priya S.", role: "Honeymoon planner", quote: "Sharing the itinerary with family was just one click. They loved it." },
          ].map((t) => (
            <Card key={t.name} className="p-6 rounded-2xl shadow-soft border-border/60">
              <div className="flex gap-0.5 text-sunset">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center text-xs font-semibold">{t.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-12 md:p-16 text-center shadow-glow overflow-hidden relative">
          <Plane className="absolute -top-4 -right-4 h-40 w-40 opacity-15 -rotate-12" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Your next adventure starts here.</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">Free to get started. No credit card required.</p>
          <Button size="lg" variant="secondary" asChild className="mt-7 h-12 px-7">
            <Link to="/trips/new">Plan Your Trip <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">© 2026 Traveloop. Crafted for the wanderers.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
