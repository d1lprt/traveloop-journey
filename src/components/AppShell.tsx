import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  PlusCircle,
  Compass,
  Wallet,
  ListChecks,
  Share2,
  User,
  StickyNote,
  Search,
  MapPinned,
  Bell,
} from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const nav = [
  { group: "Overview", items: [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/trips", label: "My Trips", icon: Map },
    { to: "/trips/new", label: "Plan New Trip", icon: PlusCircle },
  ]},
  { group: "Planning", items: [
    { to: "/itinerary", label: "Itinerary Builder", icon: MapPinned },
    { to: "/cities", label: "Discover Cities", icon: Compass },
    { to: "/activities", label: "Activities", icon: Search },
    { to: "/budget", label: "Budget", icon: Wallet },
    { to: "/packing", label: "Packing List", icon: ListChecks },
    { to: "/notes", label: "Trip Notes", icon: StickyNote },
  ]},
  { group: "Account", items: [
    { to: "/share", label: "Shared Trip", icon: Share2 },
    { to: "/profile", label: "Profile", icon: User },
  ]},
];

export function AppShell({ children, title, subtitle, actions }: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r bg-sidebar sticky top-0 h-screen">
        <div className="px-5 h-16 flex items-center border-b">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {nav.map((g) => (
            <div key={g.group}>
              <p className="px-3 mb-2 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{g.group}</p>
              <ul className="space-y-1">
                {g.items.map((it) => {
                  const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
                        }`}
                      >
                        <it.icon className="h-4 w-4" />
                        {it.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 m-3 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <p className="text-sm font-semibold">Upgrade to Pro</p>
          <p className="text-xs opacity-90 mt-1">Unlimited trips, AI suggestions and offline maps.</p>
          <Button size="sm" variant="secondary" className="mt-3 w-full">Upgrade</Button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b bg-card/70 backdrop-blur sticky top-0 z-20 flex items-center gap-4 px-4 lg:px-8">
          <div className="lg:hidden"><Logo /></div>
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cities, trips, activities…" className="pl-9 bg-muted/60 border-transparent" />
          </div>
          <div className="flex-1 md:flex-none" />
          <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-4 w-4" /></Button>
          <Avatar className="h-9 w-9 ring-2 ring-border">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">AM</AvatarFallback>
          </Avatar>
        </header>

        {(title || actions) && (
          <div className="px-4 lg:px-8 pt-8 pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              {title && <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>}
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        )}

        <main className="flex-1 px-4 lg:px-8 pb-12">{children}</main>
      </div>
    </div>
  );
}
