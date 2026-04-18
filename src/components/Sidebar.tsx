"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Sparkles, Users, MessageSquare,
  Calendar, Settings, Brain, Bell, LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/match", icon: Sparkles, label: "AI 매칭", badge: "NEW" },
  { href: "/builders", icon: Users, label: "빌더 탐색" },
  { href: "/messages", icon: MessageSquare, label: "메시지", count: 3 },
  { href: "/meetings", icon: Calendar, label: "미팅" },
  { href: "/settings", icon: Settings, label: "설정" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const displayName = user?.user_metadata?.name ?? user?.email?.split("@")[0] ?? "사용자";
  const displayRole = user?.user_metadata?.role === "builder" ? "커뮤니티 빌더" : "솔로프리너";
  const avatarChar = displayName[0] ?? "U";

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-white border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-foreground">BrainImpact</span>
          <span className="block text-xs text-muted-foreground -mt-0.5">Connect</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, badge, count }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                active
                  ? "bg-accent text-[#6C3BFF]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-[#6C3BFF]" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded gradient-brand text-white">
                  {badge}
                </span>
              )}
              {count && (
                <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-[#6C3BFF] hover:bg-[#6C3BFF]">
                  {count}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="px-3 pb-4 border-t border-border pt-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
            {avatarChar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{displayRole}</p>
          </div>
          <Bell className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
