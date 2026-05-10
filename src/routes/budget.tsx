import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Utensils, Ticket, AlertTriangle, TrendingUp, Wallet } from "lucide-react";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget — Traveloop" }] }),
  component: Budget,
});

const breakdown = [
  { label: "Transport", icon: Plane, value: 980, total: 1200, color: "bg-chart-1", text: "text-chart-1" },
  { label: "Stays", icon: Hotel, value: 1450, total: 1800, color: "bg-chart-2", text: "text-chart-2" },
  { label: "Meals", icon: Utensils, value: 520, total: 600, color: "bg-chart-3", text: "text-chart-3" },
  { label: "Activities", icon: Ticket, value: 410, total: 500, color: "bg-chart-4", text: "text-chart-4" },
];

function Budget() {
  const spent = breakdown.reduce((a, b) => a + b.value, 0);
  const total = breakdown.reduce((a, b) => a + b.total, 0);
  return (
    <AppShell title="Budget" subtitle="Stay on top of every dollar — gracefully.">
      {/* Summary */}
      <Card className="p-8 rounded-3xl shadow-soft border-border/60 bg-gradient-to-br from-card to-accent/30">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Wallet className="h-4 w-4" /> Total budget</p>
            <p className="text-4xl font-bold mt-1">${total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Spent so far</p>
            <p className="text-4xl font-bold mt-1 text-primary">${spent.toLocaleString()}</p>
            <Progress value={(spent / total) * 100} className="mt-3 h-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-4xl font-bold mt-1 text-success">${(total - spent).toLocaleString()}</p>
            <p className="text-xs mt-2 text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> $204 avg / day</p>
          </div>
        </div>
      </Card>

      {/* Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 rounded-2xl shadow-soft border-border/60">
          <h3 className="font-semibold">Category breakdown</h3>
          <div className="mt-5 space-y-5">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-9 w-9 rounded-xl bg-muted grid place-items-center ${b.text}`}><b.icon className="h-4 w-4" /></div>
                    <span className="font-medium text-sm">{b.label}</span>
                  </div>
                  <span className="text-sm font-semibold">${b.value} <span className="text-muted-foreground font-normal">/ ${b.total}</span></span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${b.color} transition-all`} style={{ width: `${(b.value / b.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut visual */}
        <Card className="p-6 rounded-2xl shadow-soft border-border/60">
          <h3 className="font-semibold">Spending share</h3>
          <div className="mt-5 flex items-center gap-8">
            <Donut data={breakdown} />
            <ul className="space-y-2.5 text-sm flex-1">
              {breakdown.map((b) => (
                <li key={b.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${b.color}`} /> {b.label}</span>
                  <span className="font-semibold">{Math.round((b.value / spent) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Alerts + per-day */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2 p-6 rounded-2xl shadow-soft border-border/60">
          <h3 className="font-semibold">Daily spend</h3>
          <div className="mt-5 flex items-end gap-2 h-40">
            {[120, 80, 240, 180, 95, 310, 220, 140, 200, 175, 95, 260, 180, 130].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-full rounded-t-md ${v > 250 ? "bg-destructive/70" : "bg-primary/70"} hover:opacity-100 opacity-80 transition-opacity`} style={{ height: `${(v / 320) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 rounded-2xl shadow-soft border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-warning/20 grid place-items-center"><AlertTriangle className="h-4 w-4" /></div>
            <div>
              <h3 className="font-semibold">Heads up</h3>
              <p className="text-sm text-muted-foreground mt-1">Day 6 (Apr 9) exceeded daily budget by $80. Consider rebalancing.</p>
              <Button size="sm" variant="outline" className="mt-4">View day</Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Donut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];
  let acc = 0;
  const segments = data.map((d, i) => {
    const start = acc;
    acc += (d.value / total) * 360;
    return `${colors[i]} ${start}deg ${acc}deg`;
  }).join(", ");
  return (
    <div className="relative h-36 w-36 shrink-0 rounded-full" style={{ background: `conic-gradient(${segments})` }}>
      <div className="absolute inset-3 rounded-full bg-card grid place-items-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-lg font-bold">${total}</p>
        </div>
      </div>
    </div>
  );
}
