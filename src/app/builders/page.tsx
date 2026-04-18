import AppShell from "@/components/AppShell";
import BuilderCard from "@/components/BuilderCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockBuilders } from "@/lib/mockData";
import { Search, SlidersHorizontal, Users } from "lucide-react";

const categories = ["전체", "테크·SaaS", "HR·피플팀", "마케팅", "디자인", "커머스", "크리에이터", "인디해커"];
const platforms = ["전체 플랫폼", "Slack", "Discord", "카카오", "Notion", "기타"];
const sizes = ["규모 무관", "~500명", "500~2000명", "2000~5000명", "5000명~"];

export default function BuildersPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">커뮤니티 빌더 탐색</h1>
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-[#6C3BFF]">1,200+</span>명의 검증된 빌더를 직접 찾아보세요
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="빌더 이름, 커뮤니티 이름, 키워드 검색..."
              className="pl-9 border-border focus-visible:ring-[#6C3BFF]"
            />
          </div>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-4">
            <SlidersHorizontal className="w-4 h-4" />
            상세 필터
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map((cat, i) => (
            <Badge
              key={cat}
              variant={i === 0 ? "default" : "secondary"}
              className={
                i === 0
                  ? "bg-[#6C3BFF] hover:bg-[#5028CC] cursor-pointer"
                  : "cursor-pointer hover:bg-accent hover:text-[#6C3BFF] transition-colors"
              }
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Platform & Size filters */}
        <div className="flex gap-3 mb-8">
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C3BFF]/30">
            {platforms.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#6C3BFF]/30">
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>총 <strong className="text-foreground">1,247</strong>명의 빌더</span>
          </div>
        </div>

        {/* Builder grid */}
        <div className="grid grid-cols-3 gap-5">
          {[...mockBuilders, ...mockBuilders.slice(0, 4)].map((builder, i) => (
            <BuilderCard key={`${builder.id}-${i}`} builder={{ ...builder, id: `${builder.id}-${i}` }} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          {[1, 2, 3, "...", 12].map((p, i) => (
            <button
              key={i}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === 1
                  ? "gradient-brand text-white"
                  : "border border-border text-muted-foreground hover:border-[#6C3BFF] hover:text-[#6C3BFF]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
