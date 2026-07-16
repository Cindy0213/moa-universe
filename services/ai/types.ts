export type AiLanguage = "zh" | "en";

export interface AiProvider {
  ask(input: string, language: AiLanguage): Promise<string>;
}
