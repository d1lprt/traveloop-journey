import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, ArrowRight, MapPin, Calendar, TrendingUp, Wallet, Plane, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Traveloop" }] }),
  component: Dashboard,
});

const trips = [
  { name: "Japan Cherry Blossoms", dates: "Apr 4 – Apr 18", cities: 4, status: "Upcoming", color: "from-sunset/30 to-sand/30" },
  { name: "Italian Coast Escape", dates: "Jun 12 – Jun 22", cities: 3, status: "Draft", color: "from-teal/30 to-sky/30" },
  { name: "Norway Fjords", dates: "Aug 1 – Aug 10", cities: 5, status: "Upcoming", color: "from-sky/40 to-accent/30" },
];

const recommended = [
  { city: "Lisbon", country: "Portugal", budget: "$$", emoji: "🌅" },
  { city: "Kyoto", country: "Japan", budget: "$$$", emoji: "⛩️" },
  { city: "Marrakech", country: "Morocco", budget: "$", emoji: "🕌" },
  { city: "Reykjavík", country: "Iceland", budget: "$$$", emoji: "❄️" },
];

function Dashboard() {
  return (
    <AppShell>
      {/* Welcome banner */}
      <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-10 shadow-glow relative overflow-hidden mt-6">
        <Plane className="absolute -right-6 -bottom-6 h-44 w-44 opacity-15 -rotate-12" />
        <div className="relative">
          <p className="opacity-90 text-sm">Welcome back,</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">Amelia ✨</h1>
          <p className="mt-2 opacity-90 max-w-lg">You have <strong>2 upcoming trips</strong> and a draft waiting for you. Ready to plan your next adventure?</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="lg" className="h-11"><Link to="/trips/new"><Plus className="h-4 w-4 mr-1" /> Plan New Trip</Link></Button>
            <Button asChild variant="ghost" size="lg" className="h-11 text-primary-foreground hover:bg-white/15"><Link to="/itinerary">Open builder <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {[
          { icon: MapPin, label: "Active trips", value: "3", hint: "+1 this month" },
          { icon: Wallet, label: "Total budget", value: "$8,420", hint: "$1,200 remaining" },
          { icon: TrendingUp, label: "Cities planned", value: "12", hint: "Across 6 countries" },
        ].map((s) => (
          <Card key={s.label} className="p-5 rounded-2xl shadow-soft border-border/60">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center"><s.icon className="h-4 w-4 text-accent-foreground" /></div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{s.hint}</p>
          </Card>
        ))}
      </div>

      {/* Recent trips */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent trips</h2>
        <Button variant="ghost" asChild><Link to="/trips">View all <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {trips.map((t) => (
          <Card key={t.name} className="overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-shadow border-border/60 group">
            <div className={`h-32 bg-gradient-to-br ${t.color} relative`}>
              <Badge className="absolute top-3 right-3 bg-card/90 text-foreground hover:bg-card">{t.status}</Badge>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{t.dates}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{t.cities} cities</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Planning progress</span><span className="font-semibold">68%</span></div>
                <Progress value={68} className="h-1.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommended */}
      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Recommended for you</h2>
          <p className="text-sm text-muted-foreground">Based on your saved destinations</p>
        </div>
        <Button variant="ghost" asChild><Link to="/cities">Browse cities <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {recommended.map((d) => (
          <Card key={d.city} className="p-5 rounded-2xl shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 border-border/60 cursor-pointer">
            <div className="text-3xl">{d.emoji}</div>
            <h3 className="mt-3 font-semibold">{d.city}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">{d.country}</p>
              <Badge variant="secondary">{d.budget}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
