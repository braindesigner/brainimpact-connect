import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockBuilders } from "@/lib/mockData";
import { Calendar, Clock, Video, CheckCircle2, XCircle, Sparkles } from "lucide-react";

const meetings = [
  {
    id: "1",
    builder: mockBuilders[0],
    date: "2025-04-22",
    time: "10:00",
    type: "화상 미팅",
    status: "confirmed",
    agenda: "스타트업 HR 커뮤니티 협업 방향 논의",
  },
  {
    id: "2",
    builder: mockBuilders[2],
    date: "2025-04-24",
    time: "14:00",
    type: "화상 미팅",
    status: "pending",
    agenda: "HR 전문가 커뮤니티 베타 테스터 모집 전략",
  },
  {
    id: "3",
    builder: mockBuilders[1],
    date: "2025-04-18",
    time: "11:00",
    type: "화상 미팅",
    status: "completed",
    agenda: "SaaS 그로스 커뮤니티 파트너십 초기 논의",
  },
];

const statusConfig = {
  confirmed: { label: "확정", color: "bg-emerald-50 text-emerald-700", icon: CheckCircle2, iconColor: "text-emerald-500" },
  pending: { label: "대기 중", color: "bg-[#FFD84D]/20 text-yellow-700", icon: Clock, iconColor: "text-yellow-500" },
  completed: { label: "완료", color: "bg-secondary text-muted-foreground", icon: CheckCircle2, iconColor: "text-muted-foreground" },
};

export default function MeetingsPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">미팅 관리</h1>
            <p className="text-muted-foreground text-sm mt-1">예정된 미팅과 협업 현황을 확인하세요</p>
          </div>
          <Button className="gradient-brand text-white border-0 hover:opacity-90">
            <Calendar className="w-4 h-4 mr-2" />
            미팅 요청하기
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "예정된 미팅", value: "2", icon: Calendar, color: "text-[#6C3BFF]", bg: "bg-accent" },
            { label: "대기 중인 요청", value: "1", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "완료된 미팅", value: "5", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label} className="p-5 border border-border bg-white text-center">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </Card>
          ))}
        </div>

        {/* Meeting list */}
        <div className="space-y-4">
          {meetings.map((meeting) => {
            const config = statusConfig[meeting.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            return (
              <Card key={meeting.id} className="p-5 border border-border bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center text-white font-bold shrink-0">
                    {meeting.builder.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{meeting.builder.name}</p>
                        <p className="text-sm text-muted-foreground">{meeting.builder.title}</p>
                      </div>
                      <Badge className={`${config.color} border-0 text-xs shrink-0`}>
                        <StatusIcon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mt-2 bg-secondary rounded-lg px-3 py-2">
                      {meeting.agenda}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {meeting.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {meeting.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5" />
                        {meeting.type}
                      </span>
                    </div>
                  </div>
                  {meeting.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" className="gradient-brand text-white border-0 h-8">
                        수락
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-destructive hover:text-destructive">
                        <XCircle className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                  {meeting.status === "confirmed" && (
                    <Button size="sm" className="gradient-brand text-white border-0 h-8 shrink-0">
                      <Video className="w-3.5 h-3.5 mr-1.5" />
                      입장
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* AI Tip */}
        <Card className="mt-6 p-4 border border-[#6C3BFF]/20 bg-accent/20">
          <div className="flex gap-3 text-sm">
            <Sparkles className="w-4 h-4 text-[#6C3BFF] shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <strong className="text-[#6C3BFF]">AI 제안:</strong>{" "}
              박지현 빌더와의 미팅 전 커뮤니티 멤버 구성 데이터를 공유해두면 협업 효율이 높아집니다.
              <a href="#" className="text-[#6C3BFF] ml-1 hover:underline">준비 체크리스트 보기 →</a>
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
