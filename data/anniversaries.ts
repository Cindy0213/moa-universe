import type { Anniversary } from "@/types";

export const defaultAnniversaries: Anniversary[] = [
  { id: "txt-debut", title: "TXT出道纪念日", date: "2019-03-04", recurring: true, type: "debut", description: "Official debut anniversary." },
  { id: "soobin-bday", title: "SOOBIN Birthday", date: "2000-12-05", recurring: true, type: "birthday", members: ["soobin"] },
  { id: "yeonjun-bday", title: "YEONJUN Birthday", date: "1999-09-13", recurring: true, type: "birthday", members: ["yeonjun"] },
  { id: "beomgyu-bday", title: "BEOMGYU Birthday", date: "2001-03-13", recurring: true, type: "birthday", members: ["beomgyu"] },
  { id: "taehyun-bday", title: "TAEHYUN Birthday", date: "2002-02-05", recurring: true, type: "birthday", members: ["taehyun"] },
  { id: "hueningkai-bday", title: "HUENINGKAI Birthday", date: "2002-08-14", recurring: true, type: "birthday", members: ["hueningkai"] },
  { id: "my-start", title: "我的入坑日", date: "2021-05-31", recurring: true, type: "personal" },
];
