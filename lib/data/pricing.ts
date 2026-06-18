// Claude model pricing for the Token Budget calculator.
// Source: the `claude-api` skill reference (cached 2026-05-26). Figures are
// approximate and for illustration — verify against platform.claude.com/pricing.
export const PRICING_AS_OF = "2026-05-26";

// Prompt-caching economics (Anthropic, 5-minute TTL).
export const CACHE_WRITE_MULT = 1.25; // first write costs 1.25x input
export const CACHE_READ_MULT = 0.1; // cached reads cost ~0.1x input

export interface ModelPricing {
  id: string;
  label: string;
  /** USD per 1M input tokens. */
  inputPerM: number;
  /** USD per 1M output tokens. */
  outputPerM: number;
  /** Context window in tokens. */
  contextTokens: number;
  /** Minimum prefix length (tokens) before prompt caching applies. */
  minCacheTokens: number;
}

export const MODELS: ModelPricing[] = [
  { id: "claude-opus-4-8", label: "Claude Opus 4.8", inputPerM: 5, outputPerM: 25, contextTokens: 1_000_000, minCacheTokens: 4096 },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", inputPerM: 3, outputPerM: 15, contextTokens: 1_000_000, minCacheTokens: 2048 },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", inputPerM: 1, outputPerM: 5, contextTokens: 200_000, minCacheTokens: 4096 },
  { id: "claude-fable-5", label: "Claude Fable 5", inputPerM: 10, outputPerM: 50, contextTokens: 1_000_000, minCacheTokens: 2048 },
];
