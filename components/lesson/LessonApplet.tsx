import type { AppletId } from "@/lib/types";
import { PromptLab } from "./applets/PromptLab";
import { TokenizerPlay } from "./applets/TokenizerPlay";
import { CachingCost } from "./applets/CachingCost";
import { ContextWindow } from "./applets/ContextWindow";
import { SkillAnatomy } from "./applets/SkillAnatomy";
import { McpFlow } from "./applets/McpFlow";

const REGISTRY: Record<AppletId, () => JSX.Element> = {
  "prompt-lab": PromptLab,
  "tokenizer-play": TokenizerPlay,
  "caching-cost": CachingCost,
  "context-window": ContextWindow,
  "skill-anatomy": SkillAnatomy,
  "mcp-flow": McpFlow,
};

export function LessonApplet({ id }: { id: AppletId }) {
  const Cmp = REGISTRY[id];
  if (!Cmp) return null;
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h2 className="font-display text-lg font-semibold">Try it</h2>
        <span className="badge badge-creator font-mono">interactive</span>
      </div>
      <Cmp />
    </section>
  );
}
