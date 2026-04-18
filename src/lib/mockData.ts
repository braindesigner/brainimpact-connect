import { Builder } from "@/components/BuilderCard";

export const mockBuilders: Builder[] = [
  {
    id: "1",
    name: "박지현",
    title: "테크 스타트업 커뮤니티 빌더",
    avatar: "박",
    tags: ["SaaS", "테크", "B2B", "스타트업"],
    platform: "Slack",
    memberCount: 3200,
    rating: 4.9,
    matchScore: 94,
    matchReason:
      "귀하의 HR SaaS 솔루션과 스타트업 HR 타겟이 이 커뮤니티의 핵심 멤버 구성(스타트업 HR 담당자 68%)과 정확히 일치합니다.",
    communities: ["스타트업 HR 네트워크", "People Ops Korea"],
  },
  {
    id: "2",
    name: "이민수",
    title: "B2B SaaS 그로스 커뮤니티 운영",
    avatar: "이",
    tags: ["SaaS", "그로스", "마케팅", "B2B"],
    platform: "Discord",
    memberCount: 5800,
    rating: 4.8,
    matchScore: 88,
    matchReason:
      "SaaS 제품 성장에 특화된 커뮤니티로, 초기 사용자 확보와 피드백 루프 구축에 최적화되어 있습니다.",
    communities: ["SaaS Growth KR", "Product Hunt Korea"],
  },
  {
    id: "3",
    name: "최수연",
    title: "HR·피플팀 전문 커뮤니티 매니저",
    avatar: "최",
    tags: ["HR", "피플팀", "인사", "조직문화"],
    platform: "카카오",
    memberCount: 2100,
    rating: 4.7,
    matchScore: 82,
    matchReason:
      "HR 전문가 밀집 커뮤니티로 귀사의 정확한 타겟인 10~50명 스타트업 HR 담당자가 주요 구성원입니다.",
    communities: ["HR Professionals KR", "스타트업 HR 클럽"],
  },
  {
    id: "4",
    name: "정도현",
    title: "개발자 & 인디해커 커뮤니티",
    avatar: "정",
    tags: ["개발", "인디해커", "프로덕트", "노코드"],
    platform: "Notion",
    memberCount: 8900,
    rating: 4.6,
    matchScore: 71,
    matchReason:
      "솔로 개발자와 인디해커 네트워크를 통해 초기 베타 유저 및 기술 피드백을 효과적으로 수집할 수 있습니다.",
    communities: ["인디해커 코리아", "빌더스 클럽 KR"],
  },
  {
    id: "5",
    name: "강혜린",
    title: "여성 창업가 & 리더십 커뮤니티",
    avatar: "강",
    tags: ["창업", "리더십", "네트워킹", "멘토링"],
    platform: "Slack",
    memberCount: 1800,
    rating: 4.9,
    matchScore: 65,
    matchReason:
      "창업가 네트워크를 통한 브랜드 인지도 확산과 레퍼럴 채널 구축에 강점을 보유하고 있습니다.",
    communities: ["She Builds KR", "여성 리더십 포럼"],
  },
];

export const mockMessages = [
  {
    id: "1",
    builder: mockBuilders[0],
    lastMessage: "안녕하세요! 커뮤니티 협업 관련해서 이야기 나눠봐요.",
    time: "2분 전",
    unread: 2,
  },
  {
    id: "2",
    builder: mockBuilders[1],
    lastMessage: "미팅 일정 확인 부탁드립니다.",
    time: "1시간 전",
    unread: 0,
  },
  {
    id: "3",
    builder: mockBuilders[2],
    lastMessage: "포트폴리오 자료 공유해 드릴게요.",
    time: "어제",
    unread: 1,
  },
];

export const chatHistory = [
  {
    id: "1",
    role: "agent" as const,
    message: "안녕하세요! BrainImpact AI 매칭 에이전트입니다. 어떤 서비스를 운영하고 계신가요?",
    timestamp: "09:01",
  },
  {
    id: "2",
    role: "user" as const,
    message: "B2B SaaS 툴로 스타트업 HR 자동화 솔루션입니다.",
    timestamp: "09:02",
  },
  {
    id: "3",
    role: "agent" as const,
    message: "흥미롭네요! 주요 타겟 고객을 좀 더 구체적으로 말씀해 주실 수 있나요? (직군, 회사 규모 등)",
    timestamp: "09:02",
  },
  {
    id: "4",
    role: "user" as const,
    message: "10~50명 규모 스타트업의 HR 담당자나 피플팀 리드를 대상으로 해요.",
    timestamp: "09:03",
  },
  {
    id: "5",
    role: "agent" as const,
    message:
      "감사합니다. 마지막으로, 커뮤니티를 통해 가장 원하는 목표가 무엇인가요?\n\n① 초기 사용자 확보\n② 제품 피드백 수집\n③ 브랜드 인지도 강화",
    timestamp: "09:03",
  },
];
