import { z } from "zod";

export const profileSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
  moaName: z.string().optional(),
  fandomStartDate: z.string().optional(),
  bias: z.enum(["soobin", "yeonjun", "beomgyu", "taehyun", "hueningkai"]),
  secondBias: z.enum(["soobin", "yeonjun", "beomgyu", "taehyun", "hueningkai"]).optional(),
  firstSong: z.string().optional(),
  firstMV: z.string().optional(),
  firstConcert: z.string().optional(),
  favoriteEra: z.string().optional(),
});
