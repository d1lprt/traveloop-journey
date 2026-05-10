import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Trash2 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile & settings — Traveloop" }] }),
  component: Profile,
});

const saved = ["Lisbon", "Kyoto", "Reykjavík", "Cape Town", "Mexico City"];

function Profile() {
  return (
    <AppShell title="Profile & settings" subtitle="Manage your account and travel preferences.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <Card className="p-7 rounded-2xl shadow-soft border-border/60">
            <h3 className="font-semibold">Personal details</h3>
            <div className="mt-6 flex items-center gap-5">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-2 ring-border">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-semibold">AW</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-soft"><Camera className="h-3.5 w-3.5" /></Button>
              </div>
              <div>
                <p className="font-semibold">Amelia Wright</p>
                <p className="text-sm text-muted-foreground">amelia@traveloop.app</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Amelia Wright" className="h-11" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="amelia@traveloop.app" className="h-11" /></div>
              <div className="space-y-1.5"><Label>Home city</Label><Input defaultValue="London, UK" className="h-11" /></div>
              <div className="space-y-1.5"><Label>Currency</Label><Input defaultValue="USD" className="h-11" /></div>
            </div>
            <div className="mt-4 space-y-1.5">
              <Label>Bio</Label>
              <Textarea rows={3} defaultValue="Slow traveler, coffee snob, mountain person." />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="shadow-glow">Save changes</Button>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-7 rounded-2xl shadow-soft border-border/60">
            <h3 className="font-semibold">Preferences</h3>
            <div className="mt-5 space-y-5">
              {[
                { label: "Email notifications", desc: "Trip reminders and weekly suggestions.", on: true },
                { label: "Public profile", desc: "Let others discover your shared trips.", on: false },
                { label: "Marketing updates", desc: "Occasional travel inspiration in your inbox.", on: true },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-sm">Language</p>
                  <p className="text-xs text-muted-foreground">Currently English (US)</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </Card>

          {/* Danger */}
          <Card className="p-7 rounded-2xl border-destructive/30 bg-destructive/5">
            <h3 className="font-semibold text-destructive">Delete account</h3>
            <p className="text-sm text-muted-foreground mt-1.5">This will permanently remove your trips, notes and shared links. This cannot be undone.</p>
            <Button variant="destructive" className="mt-4"><Trash2 className="h-4 w-4 mr-1" /> Delete my account</Button>
          </Card>
        </div>

        {/* Saved destinations */}
        <Card className="p-6 rounded-2xl shadow-soft border-border/60 self-start">
          <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Saved destinations</h3>
          <ul className="mt-4 space-y-2">
            {saved.map((s) => (
              <li key={s} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
                <span className="font-medium text-sm">{s}</span>
                <Badge variant="secondary">Saved</Badge>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full mt-4">Browse cities</Button>
        </Card>
      </div>
    </AppShell>
  );
}
