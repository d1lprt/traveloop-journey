import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Calendar, Clock, MapPin, Share2, Download, List, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/itinerary-view")({
  head: () => ({ meta: [{ title: "Itinerary preview — Traveloop" }] }),
  component: View,
});

const days = [
  { day: "Day 1 · Apr 4", city: "Tokyo", items: [
    { time: "09:00", title: "Arrive at Haneda Airport", cost: "—" },
    { time: "13:00", title: "Check in to Shibuya hotel", cost: "$140" },
    { time: "19:00", title: "Dinner in Omotesando", cost: "$45" },
  ]},
  { day: "Day 2 · Apr 5", city: "Tokyo", items: [
    { time: "08:00", title: "Tsukiji breakfast tour", cost: "$25" },
    { time: "11:00", title: "Imperial Palace gardens", cost: "Free" },
    { time: "20:00", title: "Shinjuku jazz bar", cost: "$30" },
  ]},
  { day: "Day 3 · Apr 6", city: "Tokyo", items: [
    { time: "10:00", title: "TeamLab Planets", cost: "$32" },
    { time: "16:00", title: "Asakusa walking tour", cost: "$18" },
  ]},
];

function View() {
  const [mode, setMode] = useState<"list" | "calendar">("list");
  return (
    <AppShell
      title="Japan Cherry Blossoms"
      subtitle="Tokyo · Kyoto · Osaka · Hakone"
      actions={
        <>
          <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export</Button>
          <Button className="shadow-glow"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
        </>
      }
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" /> Apr 4 – Apr 18 · 14 days
        </div>
        <div className="inline-flex rounded-xl bg-muted p-1">
          <button onClick={() => setMode("list")} className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 ${mode === "list" ? "bg-card shadow-soft font-semibold" : "text-muted-foreground"}`}><List className="h-3.5 w-3.5" /> List</button>
          <button onClick={() => setMode("calendar")} className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5 ${mode === "calendar" ? "bg-card shadow-soft font-semibold" : "text-muted-foreground"}`}><CalendarDays className="h-3.5 w-3.5" /> Calendar</button>
        </div>
      </div>

      {mode === "list" ? (
        <div className="space-y-5">
          {days.map((d) => (
            <Card key={d.day} className="rounded-2xl shadow-soft border-border/60 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{d.day}</p>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mt-0.5"><MapPin className="h-4 w-4 text-primary" /> {d.city}</h3>
                </div>
                <Badge variant="secondary">{d.items.length} activities</Badge>
              </div>
              <ul className="divide-y">
                {d.items.map((it) => (
                  <li key={it.title} className="flex items-center gap-5 px-6 py-4">
                    <div className="text-sm font-semibold text-primary w-16 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{it.time}</div>
                    <div className="flex-1">
                      <p className="font-medium">{it.title}</p>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">{it.cost}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl shadow-soft border-border/60 p-6">
          <div className="grid grid-cols-7 gap-2 text-center">
            {["S","M","T","W","T","F","S"].map((d) => <div key={d} className="text-xs font-semibold text-muted-foreground py-2">{d}</div>)}
            {Array.from({length: 35}).map((_, i) => {
              const day = i - 2;
              const inMonth = day >= 1 && day <= 30;
              const hasEvent = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].includes(day);
              return (
                <div key={i} className={`aspect-square rounded-xl p-2 text-left text-xs ${inMonth ? "bg-muted/30" : "opacity-30"} ${hasEvent ? "bg-primary/10 ring-1 ring-primary/30" : ""}`}>
                  {inMonth && <span className={hasEvent ? "font-bold text-primary" : ""}>{day}</span>}
                  {hasEvent && <div className="mt-1 h-1 w-full rounded-full bg-primary/60" />}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
