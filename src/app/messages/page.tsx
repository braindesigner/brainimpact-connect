"use client";
import AppShell from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockMessages } from "@/lib/mockData";
import { Search, Send, Paperclip, MoreHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const conversation = [
  { role: "builder", text: "안녕하세요! BrainImpact Connect를 통해 연결되었습니다. HR SaaS 협업에 관심이 있으시다고요?", time: "09:30" },
  { role: "user", text: "네, 맞습니다! 스타트업 HR 담당자 커뮤니티와 협업하고 싶어서요. 초기 사용자 50명 확보가 1차 목표입니다.", time: "09:32" },
  { role: "builder", text: "좋습니다! 저희 커뮤니티에 HR 담당자가 약 800명 있고, 스타트업 HR 툴에 관심이 많은 분들이에요. 어떤 형태의 협업을 생각하고 계신가요?", time: "09:35" },
  { role: "user", text: "베타 테스터 모집 공지 + AMA 세션 진행을 생각하고 있어요.", time: "09:36" },
  { role: "builder", text: "완벽한 플랜이네요! 지난달에 비슷한 형태로 진행한 케이스에서 120명 신청이 들어왔었어요. 미팅 잡아서 더 자세히 논의해보실까요?", time: "09:38" },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(mockMessages[0]);
  const [input, setInput] = useState("");

  return (
    <AppShell>
      <div className="flex h-screen">
        {/* Conversation list */}
        <div className="w-72 border-r border-border flex flex-col bg-white">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-foreground mb-3">메시지</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="대화 검색..." className="pl-9 h-9 text-sm" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mockMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setActiveChat(msg)}
                className={cn(
                  "w-full flex items-start gap-3 p-4 hover:bg-secondary transition-colors text-left",
                  activeChat.id === msg.id && "bg-accent/30"
                )}
              >
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold shrink-0">
                  {msg.builder.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{msg.builder.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.lastMessage}</p>
                </div>
                {msg.unread > 0 && (
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-[#6C3BFF] shrink-0">
                    {msg.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-white">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold">
              {activeChat.builder.avatar}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{activeChat.builder.name}</p>
              <p className="text-xs text-muted-foreground">{activeChat.builder.title}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1 text-[#6C3BFF]" />
                AI 매칭 {activeChat.builder.matchScore}점
              </Badge>
              <button className="p-2 rounded-lg hover:bg-secondary">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
            {conversation.map((msg, i) => (
              <div
                key={i}
                className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "builder" && (
                  <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                    {activeChat.builder.avatar}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "builder"
                      ? "bg-white border border-border text-foreground rounded-tl-sm"
                      : "gradient-brand text-white rounded-tr-sm"
                  )}
                >
                  {msg.text}
                  <span
                    className={cn(
                      "block text-xs mt-1.5",
                      msg.role === "builder" ? "text-muted-foreground" : "text-white/70"
                    )}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">
                <Paperclip className="w-4 h-4" />
              </button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setInput("")}
                placeholder="메시지 입력..."
                className="flex-1 border-border focus-visible:ring-[#6C3BFF]"
              />
              <Button
                onClick={() => setInput("")}
                disabled={!input.trim()}
                className="gradient-brand text-white border-0 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
