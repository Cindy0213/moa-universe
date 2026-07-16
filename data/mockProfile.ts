import type { UserProfile, UserSettings } from "@/types";
import { webImages } from "./images";
import { defaultThemeId } from "./themePresets";

export const defaultProfile: UserProfile = {
  id: "moa-local",
  nickname: "Mint MOA",
  moaName: "明天收藏家",
  avatar: webImages.members.soobin,
  fandomStartDate: "2021-05-31",
  bias: "soobin",
  secondBias: "taehyun",
  firstSong: "Demo first TXT song",
  firstMV: "Demo first MV",
  firstConcert: "First concert memory placeholder",
  favoriteEra: "Mint Dream Era",
};

export const defaultSettings: UserSettings = {
  language: "zh",
  theme: defaultThemeId,
  customThemes: [],
  hiddenThemeIds: [],
  appearance: "dark",
  animations: true,
  particles: true,
  soundEffects: false,
  reducedMotion: false,
  privacyMode: false,
};
