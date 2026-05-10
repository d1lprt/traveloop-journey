import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Clock, MapPin, Heart } from "lucide-react";

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Activities — Traveloop" }] }),
  component: Activities,
});

const activities = [
  { title: "Sunset sailboat tour", city: "Lisbon", type: "Adventure", duration: "2h", cost: "$45", emoji: "⛵", color: "from-sunset/30 to-sand/30" },
  { title: "Geisha district walk", city: "Kyoto", type: "Culture", duration: "3h", cost: "$30", emoji: "🏮", color: "from-accent/40 to-sky/30" },
  { title: "Souk food crawl", city: "Marrakech", type: "Food", duration: "4h", cost: "$55", emoji: "🥘", color: "from-sunset/40 to-accent/30" },
  { title: "Northern lights chase", city: "Reykjavík", type: "Adventure", duration: "5h", cost: "$120", emoji: "🌌", color: "from-sky/50 to-accent/30" },
  { title: "Tango lesson", city: "Buenos Aires", type: "Culture", duration: "2h", cost: "$25", emoji: "💃", color: "from-accent/30 to-sand/40" },
  { title: "Pho cooking class", city: "Hanoi", type: "Food", duration: "3h", cost: "$40", emoji: "🍜", color: "from-teal/40 to-success/30" },
];

const typeColor: Record<string, string> = {
  Adventure: "bg-success/15 text-foreground",
  Culture: "bg-accent text-accent-foreground",
  Food: "bg-sunset/20 text-foreground",
};

function Activities() {
  return (
    <AppShell title="Activities" subtitle="From sunrise hikes to sunset dinners.">
      <Card className="p-5 rounded-2xl shadow-soft border-border/60 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search activities…" className="pl-9 h-11" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Sightseeing", "Food", "Adventure", "Culture", "Nightlife"].map((t, i) => (
              <Button key={t} variant={i === 0 ? "default" : "outline"} size="sm">{t}</Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.map((a) => (
          <Card key={a.title} className="overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all border-border/60 group">
            <div className={`h-36 bg-gradient-to-br ${a.color} grid place-items-center text-5xl relative`}>
              {a.emoji}
              <Button size="icon" variant="secondary" className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/90"><Heart className="h-4 w-4" /></Button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-snug">{a.title}</h3>
                <Badge className={`${typeColor[a.type]} border-transparent shrink-0`} variant="outline">{a.type}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.city}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.duration}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{a.cost}</span>
                <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1" /> Add to trip</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
