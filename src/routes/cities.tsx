import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/cities")({
  head: () => ({ meta: [{ title: "Discover cities — Traveloop" }] }),
  component: Cities,
});

const cities = [
  { city: "Lisbon", country: "Portugal", region: "Europe", budget: "$$", rating: 4.8, emoji: "🌅", color: "from-sunset/40 to-sand/40" },
  { city: "Kyoto", country: "Japan", region: "Asia", budget: "$$$", rating: 4.9, emoji: "⛩️", color: "from-accent/40 to-sky/40" },
  { city: "Marrakech", country: "Morocco", region: "Africa", budget: "$", rating: 4.6, emoji: "🕌", color: "from-sunset/40 to-accent/40" },
  { city: "Reykjavík", country: "Iceland", region: "Europe", budget: "$$$", rating: 4.7, emoji: "❄️", color: "from-sky/50 to-accent/30" },
  { city: "Mexico City", country: "Mexico", region: "Americas", budget: "$$", rating: 4.7, emoji: "🌮", color: "from-sand/40 to-sunset/30" },
  { city: "Hanoi", country: "Vietnam", region: "Asia", budget: "$", rating: 4.5, emoji: "🍜", color: "from-teal/40 to-success/30" },
  { city: "Cape Town", country: "South Africa", region: "Africa", budget: "$$", rating: 4.8, emoji: "🏔️", color: "from-sky/40 to-teal/40" },
  { city: "Buenos Aires", country: "Argentina", region: "Americas", budget: "$$", rating: 4.6, emoji: "💃", color: "from-accent/40 to-sand/40" },
];

function Cities() {
  return (
    <AppShell title="Discover cities" subtitle="Find your next favorite place.">
      <Card className="p-5 rounded-2xl shadow-soft border-border/60 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cities or countries…" className="pl-9 h-11" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All regions", "Europe", "Asia", "Americas", "Africa"].map((r, i) => (
              <Button key={r} variant={i === 0 ? "default" : "outline"} size="sm">{r}</Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t flex-wrap">
          <span className="text-xs text-muted-foreground self-center mr-2">Budget</span>
          {["Any", "$", "$$", "$$$"].map((b, i) => (
            <Badge key={b} variant={i === 0 ? "default" : "outline"} className="cursor-pointer">{b}</Badge>
          ))}
          <span className="text-xs text-muted-foreground self-center ml-4 mr-2">Sort</span>
          <Badge variant="outline" className="cursor-pointer">Popular</Badge>
          <Badge variant="outline" className="cursor-pointer">Trending</Badge>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cities.map((c) => (
          <Card key={c.city} className="overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 border-border/60 group">
            <div className={`h-32 bg-gradient-to-br ${c.color} grid place-items-center text-5xl`}>{c.emoji}</div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{c.city}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{c.country}</p>
                </div>
                <Badge variant="secondary">{c.budget}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs flex items-center gap-1 text-muted-foreground"><Star className="h-3 w-3 fill-sunset text-sunset" />{c.rating}</span>
                <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
