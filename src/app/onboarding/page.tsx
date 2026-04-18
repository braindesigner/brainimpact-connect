"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const serviceTypes = ["SaaS/소프트웨어", "커머스/쇼핑", "콘텐츠/미디어", "교육/코칭", "디자인/크리에이티브", "컨설팅", "기타"];
const targetAudiences = ["스타트업/창업자", "HR/피플팀", "마케터", "개발자", "디자이너", "일반 소비자", "기업 의사결정자"];
const goals = [
  { id: "users", label: "초기 사용자 확보", icon: "👥" },
  { id: "feedback", label: "제품 피드백 수집", icon: "💬" },
  { id: "brand", label: "브랜드 인지도 강화", icon: "📢" },
  { id: "network", label: "네트워킹/파트너십", icon: "🤝" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"solopreneur" | "builder" | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const totalSteps = role === "solopreneur" ? 4 : 3;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">BrainImpact Connect</span>
        </div>

        {/* Progress bar */}
        {role && (
          <div className="flex gap-1.5 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-colors",
                  i <= step ? "bg-[#6C3BFF]" : "bg-border"
                )}
              />
            ))}
          </div>
        )}

        {/* Step 0: Role selection */}
        {step === 0 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">어떤 역할로 시작하시나요?</h1>
            <p className="text-muted-foreground text-sm mb-8">역할에 맞는 최적화된 경험을 제공합니다</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "solopreneur", emoji: "🚀", title: "솔로프리너", desc: "1인 창업자, 프리랜서, 크리에이터\n커뮤니티 빌더를 찾고 있어요" },
                { key: "builder", emoji: "🏗️", title: "커뮤니티 빌더", desc: "커뮤니티 운영 전문가\n파트너 솔로프리너를 찾고 있어요" },
              ].map(({ key, emoji, title, desc }) => (
                <button
                  key={key}
                  onClick={() => { setRole(key as "solopreneur" | "builder"); setStep(1); }}
                  className="p-6 rounded-2xl border-2 border-border hover:border-[#6C3BFF] hover:bg-accent/20 transition-all text-center"
                >
                  <span className="text-4xl mb-3 block">{emoji}</span>
                  <p className="font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Service info */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {role === "solopreneur" ? "서비스를 소개해 주세요" : "운영 중인 커뮤니티를 소개해 주세요"}
            </h1>
            <p className="text-muted-foreground text-sm mb-8">AI가 최적의 매칭을 찾는 데 활용됩니다</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {role === "solopreneur" ? "서비스/제품 이름" : "커뮤니티 이름"}
                </label>
                <Input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder={role === "solopreneur" ? "예: HR 자동화 솔루션" : "예: 스타트업 HR 네트워크"}
                  className="focus-visible:ring-[#6C3BFF]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">한 줄 설명</label>
                <Textarea
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="어떤 문제를 해결하나요? (2~3문장)"
                  className="resize-none focus-visible:ring-[#6C3BFF]"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggle(selectedTypes, setSelectedTypes, type)}
                      className={cn(
                        "text-sm px-3 py-1.5 rounded-full border transition-colors",
                        selectedTypes.includes(type)
                          ? "border-[#6C3BFF] bg-accent text-[#6C3BFF]"
                          : "border-border text-muted-foreground hover:border-[#6C3BFF]/50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Target audience */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">타겟 고객은 누구인가요?</h1>
            <p className="text-muted-foreground text-sm mb-8">중복 선택 가능합니다</p>
            <div className="flex flex-wrap gap-2">
              {targetAudiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => toggle(selectedAudiences, setSelectedAudiences, aud)}
                  className={cn(
                    "text-sm px-4 py-2.5 rounded-xl border-2 transition-colors",
                    selectedAudiences.includes(aud)
                      ? "border-[#6C3BFF] bg-accent text-[#6C3BFF] font-medium"
                      : "border-border text-muted-foreground hover:border-[#6C3BFF]/50"
                  )}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && role === "solopreneur" && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">핵심 목표가 무엇인가요?</h1>
            <p className="text-muted-foreground text-sm mb-8">AI 매칭 최적화에 사용됩니다</p>
            <div className="grid grid-cols-2 gap-3">
              {goals.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => toggle(selectedGoals, setSelectedGoals, id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    selectedGoals.includes(id)
                      ? "border-[#6C3BFF] bg-accent/30"
                      : "border-border hover:border-[#6C3BFF]/50"
                  )}
                >
                  <span className="text-2xl block mb-2">{icon}</span>
                  <span className={cn("text-sm font-medium", selectedGoals.includes(id) ? "text-[#6C3BFF]" : "text-foreground")}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Complete step */}
        {((step === 3 && role === "builder") || (step === 4 && role === "solopreneur")) && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center mx-auto mb-5 ai-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">준비 완료!</h1>
            <p className="text-muted-foreground text-sm mb-8">
              AI 에이전트가 최적의 {role === "solopreneur" ? "커뮤니티 빌더" : "솔로프리너"}를 찾아드립니다
            </p>
            <Link
              href={role === "solopreneur" ? "/match" : "/dashboard"}
              className={cn(buttonVariants(), "w-full gradient-brand text-white hover:opacity-90 border-0 bg-transparent h-12 justify-center")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {role === "solopreneur" ? "AI 매칭 시작하기" : "대시보드로 이동"}
            </Link>
          </div>
        )}

        {/* Navigation */}
        {step > 0 && step < (role === "solopreneur" ? 4 : 3) && (
          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            <Button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 bg-[#6C3BFF] text-white hover:bg-[#5028CC]"
            >
              다음
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 0 && (
          <p className="text-center text-xs text-muted-foreground mt-8">
            이미 계정이 있으신가요?{" "}
            <Link href="/dashboard" className="text-[#6C3BFF] hover:underline">
              로그인
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
