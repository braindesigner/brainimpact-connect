import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MatchScoreRing from "@/components/MatchScoreRing";
import { mockBuilders } from "@/lib/mockData";
import {
  Users, Star, MessageSquare, Calendar,
  CheckCircle2, ExternalLink, MapPin, Globe,
} from "lucide-react";

const portfolioItems = [
  { client: "HR SaaS 스타트업 A사", result: "베타 유저 200명 확보", period: "2024.03~06", tags: ["HR", "SaaS"] },
  { client: "피플팀 솔루션 B사", result: "커뮤니티 기반 인바운드 리드 150건", period: "2024.08~10", tags: ["HR", "B2B"] },
  { client: "인재 관리 툴 C사", result: "초기 사용자 피드백 500개 수집", period: "2025.01~03", tags: ["HR", "리서치"] },
];

export default function BuilderProfilePage({ params }: { params: { id: string } }) {
  const builder = mockBuilders.find((b) => b.id === params.id) ?? mockBuilders[0];

  return (
    <AppShell>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Profile header */}
        <Card className="p-7 border border-border bg-white mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-3xl">
                {builder.avatar}
              </div>
              <span className="absolute -bottom-2 -right-2 text-xs bg-white border border-border rounded-full px-2 py-1 font-medium">
                {builder.platform}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{builder.name}</h1>
                  <p className="text-muted-foreground mt-0.5">{builder.title}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      서울, 대한민국
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      커뮤니티 빌더 4년
                    </span>
                  </div>
                </div>
                {builder.matchScore && (
                  <div className="text-center">
                    <MatchScoreRing score={builder.matchScore} size={72} strokeWidth={6} />
                    <p className="text-xs text-muted-foreground mt-1">매칭 점수</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{builder.memberCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">총 멤버 수</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-[#FFD84D] text-[#FFD84D]" />
                    {builder.rating}
                  </p>
                  <p className="text-xs text-muted-foreground">평점</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">협업 완료</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {builder.tags.map((tag) => (
              <Badge key={tag} className="bg-accent text-[#6C3BFF] hover:bg-accent border-0">
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mt-5">
            <Button className="flex-1 gradient-brand text-white hover:opacity-90 border-0">
              <Calendar className="w-4 h-4 mr-2" />
              미팅 요청하기
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              메시지 보내기
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* Main content */}
          <div className="col-span-2 space-y-6">
            {/* About */}
            <Card className="p-6 border border-border bg-white">
              <h2 className="font-bold text-foreground mb-3">소개</h2>
              <p className="text-sm text-foreground leading-relaxed text-muted-foreground">
                안녕하세요! 저는 테크 스타트업 및 HR SaaS 분야에 특화된 커뮤니티 빌더입니다.
                지난 4년간 스타트업 HR 담당자와 People Ops 리더들로 구성된 전문 커뮤니티를 운영하며,
                20개 이상의 B2B SaaS 기업과 협업해 초기 사용자 확보 및 제품 피드백 수집을 지원했습니다.
              </p>
            </Card>

            {/* AI Match Reason */}
            {builder.matchReason && (
              <Card className="p-6 border border-[#6C3BFF]/20 bg-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded gradient-brand flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <h2 className="font-bold text-[#6C3BFF]">AI 추천 이유</h2>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{builder.matchReason}</p>
              </Card>
            )}

            {/* Portfolio */}
            <Card className="p-6 border border-border bg-white">
              <h2 className="font-bold text-foreground mb-4">협업 포트폴리오</h2>
              <div className="space-y-4">
                {portfolioItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.client}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <p className="text-sm text-emerald-700 font-medium">{item.result}</p>
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          {item.tags.map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
                    </div>
                    {i < portfolioItems.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Communities */}
            <Card className="p-5 border border-border bg-white">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6C3BFF]" />
                운영 커뮤니티
              </h3>
              <div className="space-y-3">
                {builder.communities.map((comm) => (
                  <div key={comm} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-[#6C3BFF]">
                      {comm[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{comm}</p>
                      <p className="text-xs text-muted-foreground">{builder.platform} · 활성</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Availability */}
            <Card className="p-5 border border-border bg-white">
              <h3 className="font-bold text-foreground mb-3">협업 유형</h3>
              <div className="space-y-2">
                {["스폰서십", "콘텐츠 협업", "유료 멤버십", "AMA/이벤트"].map((type) => (
                  <div key={type} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Response time */}
            <Card className="p-5 border border-border bg-white text-center">
              <p className="text-3xl font-bold text-gradient-brand">24h</p>
              <p className="text-xs text-muted-foreground mt-1">평균 응답 시간</p>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">
                이번 달 <strong className="text-foreground">3건</strong> 협업 가능
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
