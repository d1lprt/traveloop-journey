import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Plus, Pencil, Trash2, StickyNote, Clock } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Trip notes — Traveloop" }] }),
  component: Notes,
});

type Note = { id: string; title: string; body: string; date: string; tag: string };

const seed: Note[] = [
  { id: "1", title: "Tokyo arrival checklist", body: "Pick up Suica card at airport. Reserve Shinkansen seats early. The hotel is a 12 minute walk from Shibuya station.", date: "Apr 3 · 7:42 PM", tag: "Tokyo" },
  { id: "2", title: "Best ramen spots", body: "Ichiran in Shibuya for late night. Afuri for yuzu-shio. Tsuta for michelin-starred shoyu — book ahead.", date: "Apr 4 · 11:10 AM", tag: "Food" },
  { id: "3", title: "Kyoto temple loop", body: "Start at Kinkaku-ji at opening, then Ryoan-ji, lunch in Arashiyama, finish at Fushimi Inari for sunset.", date: "Apr 8 · 9:00 AM", tag: "Kyoto" },
];

function Notes() {
  const [notes, setNotes] = useState<Note[]>(seed);
  const [editing, setEditing] = useState<Note | null>(null);
  const [draft, setDraft] = useState({ title: "", body: "", tag: "General" });

  const startNew = () => { setEditing({ id: "", title: "", body: "", date: "", tag: "General" }); setDraft({ title: "", body: "", tag: "General" }); };
  const startEdit = (n: Note) => { setEditing(n); setDraft({ title: n.title, body: n.body, tag: n.tag }); };
  const save = () => {
    if (!draft.title.trim()) return;
    const now = new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    if (editing && editing.id) {
      setNotes((ns) => ns.map((n) => n.id === editing.id ? { ...n, ...draft, date: `${now} · edited` } : n));
    } else {
      setNotes((ns) => [{ id: Date.now().toString(), ...draft, date: now }, ...ns]);
    }
    setEditing(null);
  };
  const remove = (id: string) => setNotes((ns) => ns.filter((n) => n.id !== id));

  return (
    <AppShell
      title="Trip notes"
      subtitle="Quick thoughts, reminders and journal entries."
      actions={<Button className="shadow-glow" onClick={startNew}><Plus className="h-4 w-4 mr-1" /> New note</Button>}
    >
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {notes.length === 0 && (
            <Card className="col-span-full p-12 rounded-2xl border-dashed text-center">
              <StickyNote className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-3 font-semibold">No notes yet</p>
              <p className="text-sm text-muted-foreground mt-1">Capture an idea, a recommendation, or a memory.</p>
              <Button className="mt-5" onClick={startNew}><Plus className="h-4 w-4 mr-1" /> Write your first note</Button>
            </Card>
          )}
          {notes.map((n) => (
            <Card key={n.id} className="p-5 rounded-2xl shadow-soft border-border/60 hover:shadow-card transition-all bg-gradient-to-br from-card to-sand/10 group">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-snug">{n.title}</h3>
                <Badge variant="secondary" className="shrink-0">{n.tag}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">{n.body}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />{n.date}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(n)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(n.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 rounded-2xl shadow-soft border-border/60 self-start lg:sticky lg:top-24">
          {editing ? (
            <>
              <h3 className="font-semibold">{editing.id ? "Edit note" : "New note"}</h3>
              <div className="mt-4 space-y-3">
                <Input placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="h-11 text-base font-medium" />
                <Input placeholder="Tag (e.g. Tokyo, Food)" value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} />
                <Textarea rows={10} placeholder="Start writing…" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={save} className="shadow-glow">Save note</Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <StickyNote className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-3 font-semibold">Pick a note to edit</p>
              <p className="text-sm text-muted-foreground mt-1">Or write a new one to capture a thought.</p>
              <Button className="mt-5" onClick={startNew}><Plus className="h-4 w-4 mr-1" /> New note</Button>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
