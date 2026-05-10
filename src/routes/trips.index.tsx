import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, MapPin, MoreHorizontal, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/trips/")({
  head: () => ({ meta: [{ title: "My Trips — Traveloop" }] }),
  component: Trips,
});

const trips = [
  { name: "Japan Cherry Blossoms", dates: "Apr 4 – Apr 18, 2026", cities: 4, status: "Upcoming", color: "from-sunset/40 to-sand/40" },
  { name: "Italian Coast Escape", dates: "Jun 12 – Jun 22, 2026", cities: 3, status: "Draft", color: "from-teal/40 to-sky/40" },
  { name: "Norway Fjords", dates: "Aug 1 – Aug 10, 2026", cities: 5, status: "Upcoming", color: "from-sky/50 to-accent/50" },
  { name: "Portugal Road Trip", dates: "Sep 5 – Sep 15, 2025", cities: 6, status: "Completed", color: "from-accent/40 to-sand/40" },
  { name: "Vietnam Backpacking", dates: "Feb 1 – Feb 18, 2025", cities: 7, status: "Completed", color: "from-teal/40 to-accent/40" },
  { name: "Canada Rockies", dates: "Jul 10 – Jul 20, 2026", cities: 3, status: "Draft", color: "from-sky/40 to-teal/40" },
];

const statusVariant: Record<string, string> = {
  Upcoming: "bg-primary/10 text-primary border-primary/20",
  Draft: "bg-warning/15 text-foreground border-warning/30",
  Completed: "bg-success/15 text-foreground border-success/30",
};

function Trips() {
  return (
    <AppShell
      title="My Trips"
      subtitle="All your adventures, in one place."
      actions={<Button asChild className="shadow-glow"><Link to="/trips/new"><Plus className="h-4 w-4 mr-1" /> New trip</Link></Button>}
    >
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips…" className="pl-9 bg-card" />
        </div>
        <div className="flex gap-2">
          {["All", "Upcoming", "Draft", "Completed"].map((f, i) => (
            <Button key={f} variant={i === 0 ? "default" : "outline"} size="sm">{f}</Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trips.map((t) => (
          <Card key={t.name} className="overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all border-border/60 group">
            <div className={`h-36 bg-gradient-to-br ${t.color} relative`}>
              <Badge className={`absolute top-3 left-3 border ${statusVariant[t.status]}`} variant="outline">{t.status}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/90 hover:bg-card"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View</DropdownMenuItem>
                  <DropdownMenuItem><Pencil className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{t.dates}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{t.cities} cities</span>
              </div>
              <div className="mt-5 flex gap-2">
                <Button asChild size="sm" className="flex-1"><Link to="/itinerary">Open</Link></Button>
                <Button asChild size="sm" variant="outline"><Link to="/share">Share</Link></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
