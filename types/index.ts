export type MemberId = "soobin" | "yeonjun" | "beomgyu" | "taehyun" | "hueningkai";

export interface UserProfile {
  id: string;
  nickname: string;
  moaName: string;
  avatar?: string;
  fandomStartDate?: string;
  bias: MemberId;
  secondBias?: MemberId;
  firstSong?: string;
  firstMV?: string;
  firstConcert?: string;
  favoriteEra?: string;
}

export interface MemberProfile {
  id: MemberId;
  name: string;
  koreanName: string;
  birthday?: string;
  color: string;
  secondaryColor: string;
  glow: string;
  visualKeywords: string[];
  symbol: string;
  image?: string;
  instagramUrl?: string;
  userNickname?: string;
  favoriteReason?: string;
  fandomStartDate?: string;
  favoriteStage?: string;
  favoriteOutfit?: string;
  favoriteQuote?: string;
}

export type WorkType = "album" | "song" | "mv" | "performance" | "variety" | "interview" | "concert";

export interface WorkItem {
  id: string;
  title: string;
  englishTitle?: string;
  koreanTitle?: string;
  releaseDate?: string;
  year?: number;
  type: WorkType;
  album?: string;
  members?: MemberId[];
  cover?: string;
  description?: string;
  duration?: string;
  externalUrl?: string;
  watched: boolean;
  favorite: boolean;
  progress: number;
  rating?: number;
  note?: string;
  tags?: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: string;
  members?: MemberId[];
  image?: string;
  description?: string;
  location?: string;
  tags?: string[];
  pinned: boolean;
  important: boolean;
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  recurring: boolean;
  type: string;
  members?: MemberId[];
  description?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  image?: string;
  date?: string;
  type: string;
  members?: MemberId[];
  note?: string;
  pinned: boolean;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  englishName: string;
  description: string;
  icon: string;
  current: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  href?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface UserSettings {
  language: "zh" | "en";
  theme: string;
  customThemes?: {
    id: string;
    name: string;
    description: string;
    colors: [string, string, string];
    background: string;
    panel: string;
    text: string;
    accent: string;
    soft: string;
    muted: string;
  }[];
  hiddenThemeIds?: string[];
  appearance: "dark" | "light";
  animations: boolean;
  particles: boolean;
  soundEffects: boolean;
  reducedMotion: boolean;
  privacyMode: boolean;
}
