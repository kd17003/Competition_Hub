"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitCompare,
  Home,
  MessageSquare,
  Settings,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { OpuraIcon } from "./OpuraLogo";
import { useCompare } from "@/context/CompareContext";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/", icon: MessageSquare, label: "Chat" },
  { href: "/compare", icon: GitCompare, label: "Compare" },
  { href: "/", icon: ShoppingBag, label: "Shop" },
  { href: "/", icon: Sparkles, label: "AI" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { compareList } = useCompare();

  return (
    <aside className="flex h-screen w-[72px] shrink-0 flex-col items-center border-r border-card-border bg-sidebar-bg py-6">
      <Link href="/" title="Opura AI">
        <OpuraIcon className="h-10 w-10" />
      </Link>

      <nav className="mt-10 flex flex-1 flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/compare" ? pathname === "/compare" : pathname === "/" && item.icon === Home;
          const Icon = item.icon;
          const showBadge = item.label === "Compare" && compareList.length > 0;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-muted hover:bg-slate-100 hover:text-primary"
              }`}
            >
              <Icon className="h-5 w-5" />
              {showBadge && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {compareList.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        title="Settings"
        className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-slate-100 hover:text-primary"
      >
        <Settings className="h-5 w-5" />
      </Link>
    </aside>
  );
}
