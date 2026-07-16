import type { AiLanguage, AiProvider } from "./types";

const memberGuides = {
  soobin: {
    zh: "SOOBIN补档方向：\n1. 先建一个“蓝色月光感”收藏夹，放头像、舞台截图和温柔系采访。\n2. 时间轴记录三类内容：入坑瞬间、最喜欢的舞台、让你被治愈的一句话。\n3. 作品页筛选SOOBIN相关内容，优先标记“已观看”和5星收藏。\n4. 档案页可以把本命理由写成：温柔、可靠、清爽、有安静的力量。",
    en: "SOOBIN archive route:\n1. Create a blue moonlight collection for portraits, stage screenshots, and soft interviews.\n2. Add three timeline notes: first bias moment, favorite stage, and one comforting quote.\n3. Filter SOOBIN-related works and mark watched/favorite items first.\n4. Keep the tone gentle, reliable, fresh, and quietly powerful.",
  },
  yeonjun: {
    zh: "YEONJUN补档方向：\n1. 适合从舞台表现和时尚造型开始整理。\n2. 收藏关键词可用：红色聚光灯、编辑感、表现力、舞台掌控。\n3. 时间轴建议记录“第一次被舞台击中”的日期。\n4. 作品页优先补舞台、采访、造型相关内容。",
    en: "YEONJUN archive route:\nStart with performances and fashion moments. Use tags like red spotlight, editorial mood, stage control, and charisma. Add a timeline event for the first performance that hit you.",
  },
  beomgyu: {
    zh: "BEOMGYU补档方向：\n1. 适合整理自然光、清新感、情绪氛围类照片。\n2. 团综和互动片段可以作为入门重点。\n3. 时间轴里记录让你觉得“很有记忆点”的表情或片段。\n4. 收藏馆可以建一个“森林绿/透明树影”主题墙。",
    en: "BEOMGYU archive route:\nFocus on natural light photos, fresh moods, variety moments, and expressive clips. A forest-green collection wall fits him well.",
  },
  taehyun: {
    zh: "TAEHYUN补档方向：\n1. 适合从清透声线、舞台稳定感和采访内容入手。\n2. 标签建议：冰川蓝、晨光、清晰、可靠、透明亚克力。\n3. 可以整理一个“声音/舞台/观点”三栏清单。\n4. 适合在档案里写下你最喜欢的一句表达。",
    en: "TAEHYUN archive route:\nStart with vocals, stable stages, and interviews. Use tags like glacier blue, morning light, clarity, reliability, and acrylic transparency.",
  },
  hueningkai: {
    zh: "HUENINGKAI补档方向：\n1. 适合整理梦境感、柔和紫色、音乐性和明亮笑容相关内容。\n2. 收藏馆可建“薰衣草紫/幻彩反光”主题。\n3. 时间轴记录第一次注意到他声音或舞台能量的瞬间。\n4. 推荐把舞台和团综片段交替补，节奏更轻松。",
    en: "HUENINGKAI archive route:\nCollect dreamy, lavender, musical, and bright-energy moments. Alternate stages with variety clips to keep the archive light and fun.",
  },
};

function prefix(language: AiLanguage) {
  return language === "zh" ? "当前为演示数据模式，回答可能不完整。" : "Demo data mode is currently active. Answers may be incomplete.";
}

export const mockAiProvider: AiProvider = {
  async ask(input: string, language: AiLanguage) {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const text = input.toLowerCase();
    const demo = prefix(language);
    if (text.includes("7") || text.includes("补档") || text.includes("plan")) {
      return language === "zh"
        ? `${demo}\n\n7天补档计划：\nDay 1 认识五位成员：看成员页，给每个人写一个第一印象标签。\nDay 2 建立个人档案：补入坑日期、第一首歌、第一支MV。\nDay 3 舞台日：看2-3个你最感兴趣的舞台，给作品打分。\nDay 4 团综日：整理轻松片段，收藏最想复看的截图。\nDay 5 本命日：只补SOOBIN相关内容，写一条时间轴回忆。\nDay 6 作品整理日：把未看、已看、收藏分开，给每项加标签。\nDay 7 回顾日：生成一条“本周追星总结”，把最喜欢的瞬间放进收藏馆。`
        : `${demo}\n\n7-day archive plan:\nDay 1: Learn the five members and write one first-impression tag for each.\nDay 2: Complete your archive profile.\nDay 3: Watch 2-3 stages and rate them.\nDay 4: Save variety moments and screenshots.\nDay 5: SOOBIN day: add one timeline memory.\nDay 6: Sort works into unwatched, watched, and favorites.\nDay 7: Write a weekly recap and save your favorite moment.`;
    }

    if (text.includes("concert") || text.includes("演唱会")) {
      return language === "zh"
        ? `${demo}\n\n演唱会准备清单：\n证件与票务：身份证件、电子票/纸质票、入场二维码截图。\n随身物品：充电宝、数据线、纸巾、湿巾、透明收纳袋、少量现金。\n应援物：应援棒、备用电池、手幅、小卡保护套。\n舒适度：轻便外套、舒适鞋、补水、糖果或能量棒。\n行程：提前查路线、散场集合点、末班车时间、附近便利店。\n记录：拍照前先确认场馆规则，回家后把票根和照片放进收藏馆。`
        : `${demo}\n\nConcert checklist:\nTickets and ID, QR screenshots, power bank, cable, tissues, transparent pouch, lightstick, spare batteries, slogan, card sleeves, comfortable shoes, water, snacks, route plan, meetup point, and post-show archive notes.`;
    }

    if (text.includes("经典") || text.includes("舞台") || text.includes("stage")) {
      return language === "zh"
        ? `${demo}\n\n经典舞台补档方法：\n1. 不直接追求“看最多”，先选3个你最容易被吸引的概念。\n2. 每看完一个舞台，在作品页标记观看进度和评分。\n3. 写一句舞台记忆：造型、表情、编舞、声音或灯光。\n4. 如果是本命相关舞台，额外放进收藏馆并关联成员标签。\n5. 周末再集中回顾评分最高的舞台，形成自己的TOP清单。`
        : `${demo}\n\nClassic stage archive method:\nPick three concepts first, rate every watched stage, write one memory note, save bias-related screenshots, then make your own top list on the weekend.`;
    }

    if (text.includes("团综") || text.includes("variety")) {
      return language === "zh"
        ? `${demo}\n\n团综入门建议：\n轻松看，不要像做作业。先选短片段建立成员性格印象，再看较长内容。\n记录方式：\n- 好笑片段放收藏馆\n- 想复看的集数放作品补档\n- 让你入坑的瞬间写进时间轴\n- 每位成员用一个关键词总结，比如温柔、表现力、清新、清透、明亮`
        : `${demo}\n\nVariety guide:\nStart with short clips, then longer episodes. Save funny moments to Collection, rewatch items to Discography, and first-bias moments to Timeline.`;
    }

    if (text.includes("歌") || text.includes("song") || text.includes("清爽") || text.includes("dreamy") || text.includes("梦幻")) {
      return language === "zh"
        ? `${demo}\n\n按喜好推荐思路：\n如果你喜欢清爽梦幻风：优先找明亮、青春、轻盈、带空气感的曲目和舞台。\n如果你喜欢情绪感：优先整理夜晚、蓝色、留白感强的内容。\n如果你喜欢舞台冲击：优先看编舞、现场、performance类条目。\n建议你在作品页给每首歌加标签：清爽 / 梦幻 / 治愈 / 舞台感 / 适合循环。`
        : `${demo}\n\nTaste-based route:\nFor fresh dreamy moods, look for bright, airy, youthful songs and stages. For emotional moods, archive blue-night content. Add tags like fresh, dreamy, healing, stage-driven, and replay-worthy.`;
    }

    for (const key of Object.keys(memberGuides) as Array<keyof typeof memberGuides>) {
      if (text.includes(key) || text.includes(key.toUpperCase())) {
        return `${demo}\n\n${memberGuides[key][language]}`;
      }
    }

    if (text.includes("周末") || text.includes("weekend")) {
      return language === "zh"
        ? `${demo}\n\n周末追星日程：\n上午：整理个人档案和本命照片，换一张最喜欢的头像。\n下午：补2个作品条目，边看边打分，不追求数量。\n傍晚：写一条时间轴回忆，记录今天最心动的瞬间。\n晚上：打开收藏馆，做一个“本周最喜欢的三张图”小展览。\n睡前：问我一句TXT知识问答，轻松收尾。`
        : `${demo}\n\nWeekend schedule:\nMorning: update profile and avatar.\nAfternoon: watch and rate two works.\nEvening: add one timeline memory.\nNight: curate three favorite images in Collection.\nBefore sleep: ask one TXT Q&A question.`;
    }

    if (text.includes("新粉") || text.includes("new")) {
      return language === "zh"
        ? `${demo}\n\n新粉入坑路线：\n第一步：先记住五位成员名字和生日，不急着补完所有内容。\n第二步：去成员页看每个人的视觉关键词和照片，找到你最有感觉的人。\n第三步：打开作品补档页，只标记“已看/想看/收藏”。\n第四步：在时间轴写第一条入坑记录，比如“今天第一次认真认识TXT”。\n第五步：用收藏馆保存第一张让你心动的图。`
        : `${demo}\n\nNew fan route:\nLearn the five names and birthdays first. Visit member pages, mark works as watched/want-to-watch/favorite, write your first timeline memory, and save your first favorite image.`;
    }

    if (text.includes("知识") || text.includes("问答") || text.includes("q&a") || text.includes("qa")) {
      return language === "zh"
        ? `${demo}\n\nTXT知识问答示例：\nQ：这个网站能帮我做什么？\nA：整理成员主页、个人档案、作品补档、时间轴、纪念日和收藏馆。\nQ：它会自动抓真实资料吗？\nA：不会。现在是演示数据和你自己的本地记录，避免误抓或版权问题。\nQ：我该从哪里开始？\nA：先改头像和本命档案，再在时间轴写第一条记录。`
        : `${demo}\n\nTXT Q&A sample:\nThis site helps organize member pages, your archive, works, timeline, anniversaries, and collections. It uses demo data plus your local records rather than scraping real sources. Start with avatar/profile, then add one timeline memory.`;
    }

    return language === "zh"
      ? `${demo}\n\n我可以帮你做：\n- 新粉入坑路线\n- 7天补档计划\n- 经典舞台补档方法\n- 团综入门建议\n- 按成员整理内容\n- 按喜好推荐歌曲方向\n- 演唱会准备清单\n\n你可以直接问：“我喜欢清爽梦幻风，怎么补档？”`
      : `${demo}\n\nI can help with new fan routes, 7-day archive plans, stage recommendations, variety guides, member-based archiving, taste-based song directions, and concert checklists.`;
  },
};
