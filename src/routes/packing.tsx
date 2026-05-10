import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Plus, RotateCcw, Shirt, FileText, Smartphone, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/packing")({
  head: () => ({ meta: [{ title: "Packing list — Traveloop" }] }),
  component: Packing,
});

const initial = {
  Clothing: { icon: Shirt, items: [
    { id: "1", text: "5 t-shirts", done: true },
    { id: "2", text: "Light rain jacket", done: false },
    { id: "3", text: "Comfortable walking shoes", done: true },
    { id: "4", text: "Swimwear", done: false },
  ]},
  Documents: { icon: FileText, items: [
    { id: "5", text: "Passport", done: true },
    { id: "6", text: "Travel insurance", done: false },
    { id: "7", text: "Hotel confirmations", done: true },
  ]},
  Electronics: { icon: Smartphone, items: [
    { id: "8", text: "Phone charger", done: true },
    { id: "9", text: "Power adapter (Type A)", done: false },
    { id: "10", text: "Camera", done: false },
  ]},
  Health: { icon: HeartPulse, items: [
    { id: "11", text: "Sunscreen", done: false },
    { id: "12", text: "Daily medication", done: true },
  ]},
};

function Packing() {
  const [data, setData] = useState(initial);
  const [adding, setAdding] = useState<string | null>(null);
  const [text, setText] = useState("");

  const toggle = (cat: string, id: string) => {
    setData((d) => ({
      ...d,
      [cat]: { ...d[cat as keyof typeof d], items: d[cat as keyof typeof d].items.map((i) => i.id === id ? { ...i, done: !i.done } : i) }
    }));
  };

  const add = (cat: string) => {
    if (!text.trim()) return;
    setData((d) => ({
      ...d,
      [cat]: { ...d[cat as keyof typeof d], items: [...d[cat as keyof typeof d].items, { id: Date.now().toString(), text: text.trim(), done: false }] }
    }));
    setText("");
    setAdding(null);
  };

  const reset = () => {
    setData((d) => Object.fromEntries(Object.entries(d).map(([k, v]) => [k, { ...v, items: v.items.map((i) => ({ ...i, done: false })) }])) as typeof initial);
  };

  const all = Object.values(data).flatMap((c) => c.items);
  const done = all.filter((i) => i.done).length;

  return (
    <AppShell
      title="Packing checklist"
      subtitle={`${done} of ${all.length} items packed`}
      actions={<Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4 mr-1" /> Reset</Button>}
    >
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(data).map(([cat, group]) => {
          const Icon = group.icon;
          const catDone = group.items.filter((i) => i.done).length;
          return (
            <Card key={cat} className="p-6 rounded-2xl shadow-soft border-border/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center text-accent-foreground"><Icon className="h-4 w-4" /></div>
                  <div>
                    <h3 className="font-semibold">{cat}</h3>
                    <p className="text-xs text-muted-foreground">{catDone} / {group.items.length}</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors">
                    <Checkbox checked={item.done} onCheckedChange={() => toggle(cat, item.id)} />
                    <span className={`flex-1 text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>{item.text}</span>
                  </li>
                ))}
              </ul>
              {adding === cat ? (
                <div className="mt-3 flex gap-2">
                  <Input autoFocus value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add(cat)} placeholder="New item…" />
                  <Button size="sm" onClick={() => add(cat)}>Add</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="mt-3 w-full text-muted-foreground border border-dashed hover:text-primary hover:border-primary" onClick={() => setAdding(cat)}><Plus className="h-3.5 w-3.5 mr-1" /> Add item</Button>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
