import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Brain, Sparkles, Users, TrendingUp, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI 기반 정밀 매칭",
    desc: "서비스·타겟 고객·목표를 분석해 가장 적합한 커뮤니티 빌더를 자동 추천합니다.",
  },
  {
    icon: Users,
    title: "검증된 빌더 네트워크",
    desc: "커뮤니티 규모, 멤버 구성, 협업 이력이 검증된 전문 빌더들과 연결됩니다.",
  },
  {
    icon: TrendingUp,
    title: "데이터 기반 의사결정",
    desc: "매칭 점수와 AI 분석 근거를 시각화해 최적의 파트너를 빠르게 선택하세요.",
  },
];

const stats = [
  { value: "1,200+", label: "등록된 커뮤니티 빌더" },
  { value: "4,800+", label: "성공 매칭 건수" },
  { value: "94%", label: "파트너 만족도" },
  { value: "3일", label: "평균 매칭 소요 시간" },
];

const testimonials = [
  {
    name: "김태완",
    role: "SaaS 개발자 · 솔로프리너",
    avatar: "김",
    text: "AI가 제 서비스에 딱 맞는 커뮤니티를 추천해줬어요. 2주 만에 베타 유저 50명 확보했습니다.",
    score: 5,
  },
  {
    name: "이소영",
    role: "콘텐츠 크리에이터",
    avatar: "이",
    text: "혼자서는 불가능했을 커뮤니티 성장을 전문 빌더와 함께 가속할 수 있었어요.",
    score: 5,
  },
  {
    name: "박준혁",
    role: "디자인 툴 창업자",
    avatar: "박",
    text: "매칭 이유가 데이터로 설명되니까 신뢰가 생겼어요. 3개월 만에 유저 500명 돌파!",
    score: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">BrainImpact</span>
            <span className="text-xs font-medium text-[#6C3BFF] bg-accent px-2 py-0.5 rounded-full">Connect</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/builders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              빌더 탐색
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              로그인
            </Link>
            <Link href="/onboarding" className={cn(buttonVariants({ size: "sm" }), "gradient-brand text-white hover:opacity-90 border-0 bg-transparent")}>
              무료 시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-[#6C3BFF] text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI 에이전트 기반 커뮤니티 매칭
          </div>
          <h1 className="text-5xl font-extrabold text-foreground leading-tight mb-6">
            혼자 성장하는 시대는{" "}
            <span className="text-gradient-brand">끝났습니다</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            AI가 당신의 서비스·타겟·목표를 분석해 가장 적합한 커뮤니티 빌더를 연결합니다.
            <br />
            솔로프리너도 강한 커뮤니티와 함께라면 빠르게 성장할 수 있습니다.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/match" className={cn(buttonVariants({ size: "lg" }), "gradient-brand text-white hover:opacity-90 border-0 bg-transparent px-8 h-12 text-base")}>
              AI 매칭 시작하기
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/builders" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-8 text-base")}>
              빌더 둘러보기
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            {["무료 가입", "5분 내 매칭 결과", "검증된 빌더만"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#6C3BFF]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-gradient-brand">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">왜 BrainImpact Connect인가요?</h2>
            <p className="text-muted-foreground">지능적인 연결이 만드는 확실한 성장</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-border bg-white card-hover">
                <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">3단계로 완성하는 매칭</h2>
          </div>
          <div className="grid grid-cols-3 gap-8 relative">
            {[
              { step: "01", title: "서비스 소개", desc: "AI 에이전트와 대화하며 서비스·타겟·목표를 입력합니다." },
              { step: "02", title: "AI 분석", desc: "수백 개 빌더 프로필을 분석해 최적 후보를 선별합니다." },
              { step: "03", title: "매칭 & 연결", desc: "추천 빌더에게 미팅을 요청하고 협업을 시작합니다." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-xl mx-auto mb-5">
                  {step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">솔로프리너들의 이야기</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, text, score }) => (
              <div key={name} className="p-6 rounded-2xl border border-border bg-white card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: score }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD84D] text-[#FFD84D]" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="gradient-brand rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">지금 바로 매칭을 시작하세요</h2>
            <p className="text-white/80 mb-8">AI가 5분 안에 최적의 커뮤니티 빌더를 찾아드립니다</p>
            <Link href="/match" className={cn(buttonVariants({ size: "lg" }), "bg-[#FFD84D] text-gray-900 hover:bg-[#FFE680] border-0 font-bold px-10 h-12")}>
              무료로 시작하기
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-brand flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span>BrainImpact Connect © 2025</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">이용약관</Link>
            <Link href="#" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-foreground transition-colors">문의하기</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
