"use client";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { chatHistory } from "@/lib/mockData";

type Message = { id: string; role: "agent" | "user"; message: string; timestamp: string };

const quickReplies = ["① 초기 사용자 확보", "② 제품 피드백 수집", "③ 브랜드 인지도 강화"];

export default function MatchPage() {
  const [messages, setMessages] = useState<Message[]>(chatHistory);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(3);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: String(Date.now()),
      role: "user",
      message: text,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: Message = {
        id: String(Date.now() + 1),
        role: "agent",
        message:
          step === 3
            ? "완벽합니다! 입력해 주신 정보를 바탕으로 AI 분석을 시작합니다. 잠시만 기다려 주세요... ✨\n\n분석이 완료되면 최적화된 커뮤니티 빌더 목록을 보여드립니다."
            : "감사합니다. 추가 정보가 필요하면 알려드리겠습니다.",
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, agentMsg]);
      setStep((s) => s + 1);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="flex h-screen flex-col max-w-3xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center ai-pulse">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">AI 매칭 에이전트</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              온라인 · 분석 준비 완료
            </p>
          </div>
          {step > 4 && (
            <Link href="/match/result" className={cn(buttonVariants({ size: "sm" }), "ml-auto gradient-brand text-white border-0 bg-transparent")}>
              매칭 결과 보기
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {["서비스 소개", "타겟 고객", "목표 설정", "AI 분석"].map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={cn(
                  "h-1.5 rounded-full mb-1.5 transition-colors",
                  i < step ? "bg-[#6C3BFF]" : "bg-secondary"
                )}
              />
              <p className={cn("text-xs text-center", i < step ? "text-[#6C3BFF] font-medium" : "text-muted-foreground")}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "agent" && (
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                  msg.role === "agent"
                    ? "bg-white border border-border text-foreground rounded-tl-sm"
                    : "gradient-brand text-white rounded-tr-sm"
                )}
              >
                {msg.message}
                <span className={cn("block text-xs mt-1.5", msg.role === "agent" ? "text-muted-foreground" : "text-white/70")}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-11">
                <span className="w-2 h-2 rounded-full bg-[#6C3BFF] typing-dot" />
                <span className="w-2 h-2 rounded-full bg-[#6C3BFF] typing-dot" />
                <span className="w-2 h-2 rounded-full bg-[#6C3BFF] typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Quick replies */}
        {step === 3 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs px-3 py-1.5 rounded-full border border-[#6C3BFF] text-[#6C3BFF] hover:bg-accent transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 border-border focus-visible:ring-[#6C3BFF]"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="gradient-brand text-white border-0 hover:opacity-90 bg-[#6C3BFF]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
