import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { Copy, Twitter, Facebook, Link as LinkIcon, MapPin, Calendar, Clock, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/share")({
  head: () => ({ meta: [{ title: "Japan Cherry Blossoms — Shared trip on Traveloop" }] }),
  component: Shared,
});

const days = [
  { city: "Tokyo", dates: "Apr 4 – Apr 8", color: "from-sunset/40 to-sand/40", items: [
    { time: "Morning", title: "Tsukiji breakfast tour", note: "Try tamagoyaki." },
    { time: "Afternoon", title: "Senso-ji Temple" },
    { time: "Evening", title: "Shibuya crossing & dinner" },
  ]},
  { city: "Kyoto", dates: "Apr 8 – Apr 12", color: "from-accent/40 to-sky/30", items: [
    { time: "Morning", title: "Fushimi Inari hike" },
    { time: "Afternoon", title: "Tea ceremony in Gion" },
  ]},
  { city: "Osaka", dates: "Apr 12 – Apr 15", color: "from-sky/40 to-teal/30", items: [
    { time: "Evening", title: "Dotonbori street food crawl" },
  ]},
];

function Shared() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="min-h-screen bg-hero">
      <header className="bg-card/70 backdrop-blur border-b sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Button>Sign up to plan</Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Badge variant="outline" className="bg-card/80">Public itinerary</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-balance">Japan Cherry Blossoms</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">A 14-day spring journey through Tokyo, Kyoto, Osaka and Hakone — chasing sakura, soaking in onsen, and eating everything along the way.</p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Apr 4 – Apr 18</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> 4 cities</span>
          <span className="inline-flex items-center gap-1.5">By <strong className="text-foreground">Amelia W.</strong></span>
        </div>

        <Card className="mt-6 p-5 rounded-2xl shadow-soft border-border/60 flex flex-wrap items-center gap-3 bg-card/90 backdrop-blur">
          <div className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-muted truncate text-sm font-mono text-muted-foreground">
            traveloop.app/share/japan-cherry-blossoms-amelia
          </div>
          <Button onClick={() => { navigator.clipboard.writeText("traveloop.app/share/japan-cherry-blossoms"); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            {copied ? <Check className="h-4 w-4 mr-1" /> : <LinkIcon className="h-4 w-4 mr-1" />}
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button variant="outline" className="shadow-glow"><Copy className="h-4 w-4 mr-1" /> Copy trip</Button>
          <Button variant="ghost" size="icon"><Twitter className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Facebook className="h-4 w-4" /></Button>
        </Card>

        <div className="mt-10 space-y-5">
          {days.map((d, idx) => (
            <Card key={d.city} className="rounded-2xl shadow-soft border-border/60 overflow-hidden bg-card/95 backdrop-blur">
              <div className={`h-24 bg-gradient-to-r ${d.color} flex items-end justify-between px-6 py-4`}>
                <div>
                  <p className="text-xs uppercase tracking-wider text-foreground/70 font-semibold">Stop {idx + 1}</p>
                  <h2 className="text-2xl font-bold tracking-tight">{d.city}</h2>
                </div>
                <span className="text-sm text-foreground/70">{d.dates}</span>
              </div>
              <ul className="divide-y">
                {d.items.map((it) => (
                  <li key={it.title} className="px-6 py-4 flex gap-5">
                    <div className="text-xs font-semibold text-primary w-24 flex items-center gap-1.5 shrink-0"><Clock className="h-3.5 w-3.5" />{it.time}</div>
                    <div>
                      <p className="font-medium">{it.title}</p>
                      {it.note && <p className="text-sm text-muted-foreground mt-0.5">{it.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-10 rounded-3xl bg-gradient-primary text-primary-foreground text-center shadow-glow">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Inspired? Plan your own.</h3>
          <p className="mt-2 opacity-90">Copy this trip or start fresh — it's free.</p>
          <Button variant="secondary" size="lg" className="mt-5">Start planning</Button>
        </Card>
      </div>
    </div>
  );
}
