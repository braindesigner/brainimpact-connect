import AppShell from "@/components/AppShell";
import BuilderCard from "@/components/BuilderCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mockBuilders } from "@/lib/mockData";
import { Brain, Sparkles, Filter, SlidersHorizontal } from "lucide-react";

export default function MatchResultPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#6C3BFF] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI 매칭 완료
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            당신을 위한 최적 빌더 <span className="text-gradient-brand">5명</span>을 찾았습니다
          </h1>
          <p className="text-muted-foreground text-sm">
            HR SaaS 솔루션 · 스타트업 HR 담당자 타겟 · 초기 사용자 확보 목표 기준
          </p>
        </div>

        {/* AI Summary Card */}
        <Card className="p-5 border border-[#6C3BFF]/20 bg-accent/30 mb-8">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#6C3BFF] mb-1">AI 분석 요약</p>
              <p className="text-sm text-foreground leading-relaxed">
                입력하신 정보를 바탕으로 <strong>1,200개</strong>의 빌더 프로필을 분석했습니다.
                HR 도메인 전문성, 스타트업 멤버 구성, 초기 사용자 확보 협업 이력을 종합적으로 평가해
                매칭 점수 <strong>65점 이상</strong>의 빌더 5명을 선별했습니다.
              </p>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-2 flex-1 flex-wrap">
            {["전체", "Slack", "Discord", "카카오", "Notion", "점수 높은순", "멤버 많은순"].map((f, i) => (
              <Badge
                key={f}
                variant={i === 0 ? "default" : "secondary"}
                className={
                  i === 0
                    ? "bg-[#6C3BFF] hover:bg-[#5028CC] cursor-pointer"
                    : "cursor-pointer hover:bg-accent hover:text-[#6C3BFF]"
                }
              >
                {f}
              </Badge>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            필터
          </button>
        </div>

        {/* Builder grid */}
        <div className="grid grid-cols-2 gap-5">
          {mockBuilders.map((builder) => (
            <BuilderCard key={builder.id} builder={builder} showMatchScore />
          ))}
        </div>

        {/* Tip */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-secondary rounded-xl text-sm text-muted-foreground">
          <Filter className="w-4 h-4 mt-0.5 shrink-0 text-[#6C3BFF]" />
          <p>
            미팅 요청은 수락까지 평균 <strong>24시간</strong> 소요됩니다.
            관심 있는 빌더에게 미리 메시지를 보내두면 응답률이 2배 높아집니다.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
