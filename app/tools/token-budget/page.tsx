import type { Metadata } from "next";
import { TokenBudget } from "@/components/TokenBudget";

export const metadata: Metadata = {
  title: "Token Budget — Open Source Capitalist",
  description: "Estimate the cost of a prompt: model, tokens, turns, and prompt caching.",
};

export default function TokenBudgetPage() {
  return (
    <div className="container-page flex flex-col gap-8 py-10">
      <header className="flex max-w-2xl flex-col gap-2">
        <p className="eyebrow">Interactive · Token & Context</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Token Budget</h1>
        <p className="text-[15px] leading-relaxed text-ink-muted">
          Tokens are budget; the context window is working memory. Set a model, your input and
          output sizes, how many turns, and whether prompt caching is on — see the cost, how much
          of the window you&apos;re spending, and where to save.
        </p>
      </header>
      <TokenBudget />
    </div>
  );
}
