import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ImagePlus, Users, Globe } from "lucide-react";

export const Route = createFileRoute("/trips/new")({
  head: () => ({ meta: [{ title: "Plan a new trip — Traveloop" }] }),
  component: NewTrip,
});

function NewTrip() {
  return (
    <AppShell title="Plan a new trip" subtitle="A few details and we'll set up your canvas.">
      <div className="grid lg:grid-cols-3 gap-6 mt-2">
        <Card className="lg:col-span-2 p-8 rounded-2xl shadow-soft border-border/60 space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="name">Trip name</Label>
            <Input id="name" placeholder="e.g. Spring in Japan" className="h-11" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="start">Start date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="start" type="date" className="h-11 pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="end">End date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="end" type="date" className="h-11 pl-9" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={4} placeholder="What's the vibe of this trip? Add notes for yourself or your travel companions." />
          </div>

          <div className="space-y-1.5">
            <Label>Cover image (optional)</Label>
            <button type="button" className="w-full rounded-2xl border-2 border-dashed border-border bg-muted/40 hover:bg-muted transition-colors p-10 text-center">
              <ImagePlus className="h-7 w-7 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Click to upload, or drop a photo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 8MB</p>
            </button>
          </div>

          <div className="space-y-1.5">
            <Label>Travel style</Label>
            <div className="flex flex-wrap gap-2">
              {["Solo", "Couple", "Family", "Friends", "Business"].map((t, i) => (
                <Badge key={t} variant={i === 1 ? "default" : "outline"} className="px-3 py-1.5 cursor-pointer hover:bg-accent">{t}</Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button asChild size="lg" className="shadow-glow"><Link to="/itinerary">Save & start planning</Link></Button>
            <Button variant="outline" size="lg">Save as draft</Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 rounded-2xl shadow-soft border-border/60">
            <h3 className="font-semibold flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Quick tips</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>• Give it a name you'll smile at later.</li>
              <li>• Dates can be flexible — change anytime.</li>
              <li>• Add cities next, then activities per day.</li>
            </ul>
          </Card>
          <Card className="p-6 rounded-2xl shadow-soft border-border/60 bg-accent/30">
            <h3 className="font-semibold flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Invite collaborators</h3>
            <p className="mt-2 text-sm text-muted-foreground">Plan together — invite friends after creating the trip.</p>
            <Button variant="outline" size="sm" className="mt-4 w-full">Coming soon</Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
