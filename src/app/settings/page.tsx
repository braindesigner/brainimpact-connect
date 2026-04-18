import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, CreditCard, Sparkles, ChevronRight } from "lucide-react";

const sections = [
  { icon: User, label: "프로필 설정", desc: "이름, 서비스 설명, 타겟 고객 수정" },
  { icon: Bell, label: "알림 설정", desc: "매칭, 메시지, 미팅 알림 관리" },
  { icon: Shield, label: "개인정보 & 보안", desc: "비밀번호 변경, 2단계 인증" },
  { icon: CreditCard, label: "플랜 & 결제", desc: "현재 Free 플랜 · 업그레이드" },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">설정</h1>

        {/* Profile */}
        <Card className="p-6 border border-border bg-white mb-6">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-[#6C3BFF]" />
            내 프로필
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-2xl">
              김
            </div>
            <div>
              <p className="font-semibold text-foreground">김솔로</p>
              <p className="text-sm text-muted-foreground">솔로프리너 · aimit.cmty@gmail.com</p>
              <Badge className="mt-1.5 bg-accent text-[#6C3BFF] hover:bg-accent border-0 text-xs">
                Free 플랜
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              사진 변경
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">이름</label>
              <Input defaultValue="김솔로" className="focus-visible:ring-[#6C3BFF]" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">역할</label>
              <Input defaultValue="솔로프리너" className="focus-visible:ring-[#6C3BFF]" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">서비스 소개</label>
              <Input defaultValue="HR SaaS 자동화 솔루션" className="focus-visible:ring-[#6C3BFF]" />
            </div>
          </div>
          <Button className="mt-5 gradient-brand text-white border-0 hover:opacity-90">
            변경사항 저장
          </Button>
        </Card>

        {/* Quick setting links */}
        <Card className="border border-border bg-white divide-y divide-border">
          {sections.slice(1).map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4 p-4 hover:bg-secondary/50 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#6C3BFF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </Card>

        {/* AI Preferences */}
        <Card className="p-6 border border-[#6C3BFF]/20 bg-accent/10 mt-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6C3BFF]" />
            AI 매칭 설정
          </h2>
          <Separator className="mb-4" />
          <div className="space-y-3">
            {[
              "관심 없는 플랫폼 제외",
              "최소 멤버 수 설정",
              "협업 유형 우선순위",
              "매칭 알림 빈도",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item}</span>
                <Button variant="ghost" size="sm" className="text-[#6C3BFF] hover:text-[#6C3BFF] hover:bg-accent h-7">
                  설정
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
