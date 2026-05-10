import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, MapPin, Clock, Trash2, Pencil, Eye, Calendar } from "lucide-react";

export const Route = createFileRoute("/itinerary")({
  head: () => ({ meta: [{ title: "Itinerary builder — Traveloop" }] }),
  component: Itinerary,
});

const stops = [
  {
    city: "Tokyo", country: "Japan", dates: "Apr 4 – Apr 8", color: "from-sunset/30 to-sand/30",
    activities: [
      { time: "09:00", title: "Tsukiji Outer Market breakfast", cost: "$25", tag: "Food" },
      { time: "13:00", title: "Senso-ji Temple", cost: "Free", tag: "Culture" },
      { time: "19:00", title: "Shibuya night walk", cost: "$15", tag: "Sightseeing" },
    ],
  },
  {
    city: "Kyoto", country: "Japan", dates: "Apr 8 – Apr 12", color: "from-teal/30 to-accent/40",
    activities: [
      { time: "08:00", title: "Fushimi Inari hike", cost: "Free", tag: "Adventure" },
      { time: "14:00", title: "Tea ceremony in Gion", cost: "$45", tag: "Culture" },
    ],
  },
  {
    city: "Osaka", country: "Japan", dates: "Apr 12 – Apr 15", color: "from-sky/40 to-accent/30",
    activities: [
      { time: "11:00", title: "Dotonbori street food tour", cost: "$60", tag: "Food" },
    ],
  },
];

const tagColor: Record<string, string> = {
  Food: "bg-sunset/20 text-foreground",
  Culture: "bg-accent text-accent-foreground",
  Sightseeing: "bg-sky/40 text-foreground",
  Adventure: "bg-success/20 text-foreground",
};

function Itinerary() {
  return (
    <AppShell
      title="Japan Cherry Blossoms"
      subtitle="Apr 4 – Apr 18 · 4 cities · 14 days"
      actions={
        <>
          <Button variant="outline" asChild><Link to="/itinerary-view"><Eye className="h-4 w-4 mr-1" /> Preview</Link></Button>
          <Button className="shadow-glow"><Plus className="h-4 w-4 mr-1" /> Add stop</Button>
        </>
      }
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border" aria-hidden />
          <div className="space-y-5">
            {stops.map((stop, idx) => (
              <div key={stop.city} className="relative pl-16">
                <div className="absolute left-0 top-3 h-14 w-14 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center font-bold shadow-glow">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <Card className="rounded-2xl shadow-soft border-border/60 overflow-hidden">
                  <div className={`h-20 bg-gradient-to-r ${stop.color} flex items-center justify-between px-6`}>
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-foreground/40 cursor-grab" />
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2"><MapPin className="h-4 w-4" /> {stop.city}, {stop.country}</h3>
                        <p className="text-xs text-foreground/70 flex items-center gap-1 mt-0.5"><Calendar className="h-3 w-3" />{stop.dates}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    {stop.activities.map((a) => (
                      <div key={a.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors group">
                        <GripVertical className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 cursor-grab" />
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground w-16"><Clock className="h-3 w-3" />{a.time}</div>
                        <div className="flex-1">
                          <p className="font-medium">{a.title}</p>
                        </div>
                        <Badge className={`${tagColor[a.tag]} border-transparent`} variant="outline">{a.tag}</Badge>
                        <span className="text-sm font-semibold w-14 text-right">{a.cost}</span>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground border border-dashed border-border hover:border-primary hover:text-primary mt-2"><Plus className="h-4 w-4 mr-1" /> Add activity</Button>
                  </div>
                </Card>
              </div>
            ))}
            <div className="relative pl-16">
              <div className="absolute left-0 top-3 h-14 w-14 rounded-2xl border-2 border-dashed grid place-items-center text-muted-foreground"><Plus /></div>
              <button className="w-full p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-accent/30 transition-colors text-muted-foreground hover:text-primary font-medium">
                Add a new city stop
              </button>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <Card className="p-5 rounded-2xl shadow-soft border-border/60">
            <h3 className="font-semibold">Trip overview</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Stops</dt><dd className="font-semibold">3</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Activities</dt><dd className="font-semibold">6</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Estimated cost</dt><dd className="font-semibold">$2,840</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Pace</dt><dd className="font-semibold">Balanced</dd></div>
            </dl>
          </Card>
          <Card className="p-5 rounded-2xl shadow-soft border-border/60 bg-accent/30">
            <h3 className="font-semibold">Suggestions</h3>
            <p className="text-sm text-muted-foreground mt-1">Add a 1-day stop in <strong>Hakone</strong> for hot springs between Tokyo and Kyoto.</p>
            <Button size="sm" className="mt-3 w-full">Add suggestion</Button>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
