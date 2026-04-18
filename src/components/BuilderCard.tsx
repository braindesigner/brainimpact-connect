import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MatchScoreRing from "./MatchScoreRing";
import { Users, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Builder {
  id: string;
  name: string;
  title: string;
  avatar: string;
  tags: string[];
  platform: string;
  memberCount: number;
  rating: number;
  matchScore?: number;
  matchReason?: string;
  communities: string[];
}

interface Props {
  builder: Builder;
  showMatchScore?: boolean;
}

export default function BuilderCard({ builder, showMatchScore = false }: Props) {
  return (
    <Card className="card-hover p-5 flex flex-col gap-4 border border-border bg-white">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg">
            {builder.avatar}
          </div>
          <span className="absolute -bottom-1 -right-1 text-[10px] bg-white border border-border rounded-full px-1.5 py-0.5">
            {builder.platform}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm">{builder.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{builder.title}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {builder.memberCount.toLocaleString()}명
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {builder.rating}
            </span>
          </div>
        </div>

        {/* Match score */}
        {showMatchScore && builder.matchScore && (
          <MatchScoreRing score={builder.matchScore} size={56} strokeWidth={5} />
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {builder.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs bg-accent text-[#6C3BFF] border-0 font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Match reason */}
      {showMatchScore && builder.matchReason && (
        <div className="text-xs text-muted-foreground bg-secondary rounded-lg p-3 leading-relaxed">
          <span className="font-medium text-[#6C3BFF]">AI 추천 이유:</span>{" "}
          {builder.matchReason}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Link
          href={`/builders/${builder.id}`}
          className={cn(buttonVariants({ size: "sm" }), "flex-1 gradient-brand text-white hover:opacity-90 border-0 bg-transparent justify-center")}
        >
          프로필 보기
        </Link>
        <button className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-3")}>
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
}
