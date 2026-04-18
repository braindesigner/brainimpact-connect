"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Mail, Lock, User, CheckCircle2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
import { cn } from "@/lib/utils";

const roles = [
  { key: "solopreneur", emoji: "🚀", label: "솔로프리너", desc: "커뮤니티 빌더를 찾고 있어요" },
  { key: "builder", emoji: "🏗️", label: "커뮤니티 빌더", desc: "파트너 솔로프리너를 찾고 있어요" },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"solopreneur" | "builder" | "">("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setError("역할을 선택해 주세요."); return; }
    if (password.length < 8) { setError("비밀번호는 8자 이상이어야 합니다."); return; }

    setLoading(true);
    setError("");
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });

    if (error) {
      setError(error.message === "User already registered"
        ? "이미 가입된 이메일입니다."
        : error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  };

  if (done) {
    return (
      <Card className="w-full max-w-md p-8 border border-border bg-white text-center shadow-sm">
        <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">이메일을 확인해 주세요!</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">{email}</strong>로 인증 메일을 보냈습니다.
          <br />
          메일의 링크를 클릭하면 가입이 완료됩니다.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          메일이 오지 않으면 스팸함을 확인해 주세요.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-8 border border-border bg-white shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">시작해볼까요? 🚀</h1>
        <p className="text-sm text-muted-foreground">무료로 계정을 만드세요</p>
      </div>

      {/* Google Signup */}
      <Button
        onClick={handleGoogleSignup}
        disabled={googleLoading}
        variant="outline"
        className="w-full h-11 mb-6 font-medium"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <GoogleIcon />
        )}
        Google로 시작하기
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-muted-foreground">또는 이메일로 가입</span>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Role selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">역할 선택</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(({ key, emoji, label, desc }) => (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key as "solopreneur" | "builder")}
                className={cn(
                  "p-3 rounded-xl border-2 text-left transition-all",
                  role === key
                    ? "border-[#6C3BFF] bg-accent/30"
                    : "border-border hover:border-[#6C3BFF]/40"
                )}
              >
                <span className="text-xl block mb-1">{emoji}</span>
                <p className={cn("text-xs font-semibold", role === key ? "text-[#6C3BFF]" : "text-foreground")}>
                  {label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">이름</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="pl-9 focus-visible:ring-[#6C3BFF]"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">이메일</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-9 focus-visible:ring-[#6C3BFF]"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">비밀번호</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="pl-9 focus-visible:ring-[#6C3BFF]"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 gradient-brand text-white border-0 hover:opacity-90 bg-[#6C3BFF]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          회원가입
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          가입 시{" "}
          <Link href="#" className="text-[#6C3BFF] hover:underline">이용약관</Link>
          {" "}및{" "}
          <Link href="#" className="text-[#6C3BFF] hover:underline">개인정보처리방침</Link>
          에 동의하게 됩니다.
        </p>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-[#6C3BFF] font-medium hover:underline">
          로그인
        </Link>
      </p>
    </Card>
  );
}
