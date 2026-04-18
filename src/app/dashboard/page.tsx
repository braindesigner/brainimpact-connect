import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import MatchScoreRing from "@/components/MatchScoreRing";
import { mockBuilders } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Sparkles, ArrowRight, TrendingUp, MessageSquare,
  Calendar, Users, Clock, CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "매칭 진행 중", value: "3", icon: Sparkles, color: "text-[#6C3BFF]", bg: "bg-accent" },
  { label: "받은 메시지", value: "7", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "예정 미팅", value: "2", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "연결된 빌더", value: "5", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
];

const activities = [
  { icon: CheckCircle2, text: "박지현 빌더가 미팅 요청을 수락했습니다", time: "10분 전", color: "text-emerald-500" },
  { icon: Sparkles, text: "AI 매칭 분석이 완료되었습니다 — 5명 추천", time: "1시간 전", color: "text-[#6C3BFF]" },
  { icon: MessageSquare, text: "이민수 빌더로부터 새 메시지가 도착했습니다", time: "2시간 전", color: "text-blue-500" },
  { icon: Clock, text: "최수연 빌더와 미팅이 내일 오전 10시로 예정되어 있습니다", time: "어제", color: "text-orange-500" },
];

export default function DashboardPage() {
  const topBuilders = mockBuilders.slice(0, 3);

  return (
    <AppShell>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">안녕하세요, 김솔로님 👋</h1>
            <p className="text-muted-foreground text-sm mt-1">오늘도 성장을 향해 나아가고 있습니다</p>
          </div>
          <Link href="/match" className={cn(buttonVariants(), "gradient-brand text-white hover:opacity-90 border-0 bg-transparent")}>
            <Sparkles className="w-4 h-4 mr-2" />
            AI 매칭 시작
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {metrics.map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label} className="p-5 border border-border bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* AI Match Banner + Top Builders */}
          <div className="col-span-2 space-y-6">
            <Card className="p-6 border-0 gradient-brand text-white overflow-hidden relative">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -right-2 bottom-4 w-20 h-20 bg-white/5 rounded-full" />
              <div className="relative">
                <Badge className="bg-[#FFD84D] text-gray-900 hover:bg-[#FFD84D] text-xs font-bold mb-3">
                  AI 추천
                </Badge>
                <h2 className="text-xl font-bold mb-2">새로운 매칭 결과가 있습니다</h2>
                <p className="text-white/80 text-sm mb-5">
                  HR SaaS 서비스 기준으로 5명의 최적 빌더를 발견했습니다
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["박", "이", "최", "정", "강"].map((ch, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold"
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                  <Link href="/match/result" className={cn(buttonVariants({ size: "sm" }), "bg-white text-[#6C3BFF] hover:bg-white/90 border-0 font-semibold")}>
                    결과 보기
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Top Matched Builders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">최근 매칭 추천</h2>
                <Link href="/match/result" className="text-sm text-[#6C3BFF] hover:underline flex items-center gap-1">
                  전체 보기 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {topBuilders.map((builder) => (
                  <Card key={builder.id} className="p-4 flex items-center gap-4 border border-border bg-white card-hover">
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold shrink-0">
                      {builder.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{builder.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{builder.title}</p>
                    </div>
                    <MatchScoreRing score={builder.matchScore!} size={48} strokeWidth={4} />
                    <Link href={`/builders/${builder.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}>
                      보기
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground">최근 활동</h2>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <Card className="p-5 border border-border bg-white">
              <div className="space-y-4">
                {activities.map(({ icon: Icon, text, time, color }, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground leading-snug">{text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick actions */}
            <div className="mt-4 space-y-2">
              {[
                { href: "/match", label: "새 매칭 분석 요청", icon: Sparkles },
                { href: "/builders", label: "빌더 직접 탐색", icon: Users },
                { href: "/messages", label: "메시지 확인", icon: MessageSquare },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white hover:bg-secondary transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#6C3BFF]" />
                  <span className="text-sm text-foreground">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
