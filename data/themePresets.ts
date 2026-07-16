export type ThemePreset = {
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
};

export const themePresets: ThemePreset[] = [
  {
    id: "mint-dream",
    name: "Mint Dream",
    description: "薄荷绿、深夜蓝，保留原始 MOA 宇宙感",
    colors: ["#77e6c6", "#07121f", "#f2f7f6"],
    background: "#07121f",
    panel: "#0f1f2e",
    text: "#f2f7f6",
    accent: "#77e6c6",
    soft: "#a8f3de",
    muted: "#a8b8be",
  },
  {
    id: "ppulbatu-home",
    name: "PPULBATU Home",
    description: "平涂薄荷、奶油白和黑描边，适合角色之家",
    colors: ["#b9f6df", "#fff8e8", "#07121f"],
    background: "#10231f",
    panel: "#12302b",
    text: "#fff8e8",
    accent: "#b9f6df",
    soft: "#fff8e8",
    muted: "#c7d7d0",
  },
  {
    id: "blue-hour",
    name: "Blue Hour",
    description: "蓝紫夜空和冷光感，更偏舞台氛围",
    colors: ["#7ea6ff", "#172554", "#dff8ff"],
    background: "#111b3f",
    panel: "#172554",
    text: "#eff6ff",
    accent: "#7ea6ff",
    soft: "#dff8ff",
    muted: "#b6c6e4",
  },
  {
    id: "peach-pop",
    name: "Peach Pop",
    description: "蜜桃粉、暖橙和奶油色，轻快可爱",
    colors: ["#ff8fa3", "#ffad45", "#fff3d8"],
    background: "#24151a",
    panel: "#3a2026",
    text: "#fff8ed",
    accent: "#ffad45",
    soft: "#fff3d8",
    muted: "#e6c3bb",
  },
  {
    id: "mono-star",
    name: "Mono Star",
    description: "黑白灰与薄荷点缀，简洁杂志感",
    colors: ["#f7f7f2", "#111827", "#77e6c6"],
    background: "#111827",
    panel: "#171f2d",
    text: "#f7f7f2",
    accent: "#f7f7f2",
    soft: "#77e6c6",
    muted: "#b8bebc",
  },
];

export const defaultThemeId = themePresets[0].id;
