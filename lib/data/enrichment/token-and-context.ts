import type { LessonEnrichment } from "@/lib/types";

// Authored teaching layer (NOT from the videos) — review for accuracy.
export const tokenAndContext: Record<string, LessonEnrichment> = {
  "let-s-build-the-gpt-tokenizer": {
    applet: "tokenizer-play",
    takeaways: [
      "LLMs don't see words or letters — they see tokens: learned subword chunks built with byte-pair encoding (BPE).",
      "English averages ~4 characters per token, but code, rare words, and non-English text cost far more tokens per character.",
      "Tokenization explains a lot of 'weird' model behaviour — spelling, arithmetic, trailing spaces — it's the layer beneath the model.",
    ],
    quiz: [
      {
        q: "Roughly how many characters of English make up one token?",
        options: ["~1", "~4", "~20", "~100"],
        answer: 1,
        explain: "A common rule of thumb is ~4 characters (≈0.75 words) per token for English. Code and other languages differ a lot.",
      },
      {
        q: "How do GPT-style tokenizers build their vocabulary?",
        options: ["Byte-pair encoding (BPE)", "One token per word", "Regular expressions", "Hashing"],
        answer: 0,
        explain: "BPE repeatedly merges the most frequent adjacent byte/character pairs into a subword vocabulary.",
      },
      {
        q: "Why might 'hello' and ' hello' (leading space) be different tokens?",
        options: ["They aren't — whitespace is ignored", "Tokenizers often fold the leading space into the token", "It's a bug", "Spaces are always separate tokens"],
        answer: 1,
        explain: "Tokenizers frequently encode a leading space into the token, so the same word maps to different tokens by position.",
      },
    ],
  },

  "context-engineering-vs-prompt-engineering-smarter-ai-with-rag-agents": {
    takeaways: [
      "Prompt engineering = how you ask. Context engineering = what the model can see, remember, and use at the moment it acts.",
      "As work gets agentic and multi-step, managing the whole window (memory, tools, retrieved data, history) beats wording one perfect prompt.",
      "RAG, memory, tool outputs, and compaction are all context engineering — they decide what ends up in the window.",
    ],
    quiz: [
      {
        q: "The core difference between prompt and context engineering?",
        options: ["Prompt = wording one ask; context = managing everything the model sees over a task", "They're identical", "Context engineering is only for images", "Prompt engineering is obsolete"],
        answer: 0,
        explain: "Prompt engineering optimizes a single instruction; context engineering manages the full working set the model reasons over.",
      },
      {
        q: "Which is a context-engineering technique?",
        options: ["Retrieval-augmented generation (RAG)", "Using a bigger font", "Lowercasing the prompt", "Renaming the model"],
        answer: 0,
        explain: "RAG assembles relevant external info into the window — a context-engineering move.",
      },
    ],
    examples: [
      {
        label: "Asking vs giving the model what it needs",
        bad: "Summarize our refund policy.",
        good: "Summarize our refund policy.\n\n<policy>\n{retrieved policy doc}\n</policy>\n\nUse only the policy above; if it doesn't cover the case, say so.",
        why: "The first hopes the model already knows your policy. The second engineers the context — supplies the source and constrains the model to it. Same 'prompt', very different reliability.",
      },
    ],
  },

  "effective-context-engineering-for-ai-agents": {
    applet: "context-window",
    takeaways: [
      "Treat context as a limited 'attention budget' — every extra token competes for the model's focus.",
      "Three core moves: compaction (summarize old turns), structured note-taking (externalize memory to files), and subagents (isolate context).",
      "These aren't theory — Anthropic reported large gains, e.g. context editing + a memory tool sharply raised success on long multi-step tasks.",
    ],
    quiz: [
      {
        q: "What is 'compaction'?",
        options: ["Periodically summarizing older context to free up the window", "Compressing model weights", "Deleting the system prompt", "Shrinking images"],
        answer: 0,
        explain: "Compaction condenses earlier turns into a summary so the window keeps room for what's next.",
      },
      {
        q: "Why delegate to subagents for context management?",
        options: ["Each gets its own attention budget and returns only a concise result", "They're free", "They never err", "To avoid writing prompts"],
        answer: 0,
        explain: "A subagent does focused work in its own window and hands back a summary, keeping the main agent's context lean.",
      },
    ],
    examples: [
      {
        label: "Stuffing vs externalizing state",
        bad: "(turn 40) [the entire 39-turn transcript pasted back on every call]",
        good: "(turn 40) [compacted summary of turns 1–35] + [progress.md notes] + the last few turns",
        why: "Re-sending the whole history burns the attention budget and invites context rot. Compacting plus writing notes to a file keeps the window focused on what matters now.",
      },
    ],
  },

  "behind-the-research-context-rot": {
    applet: "context-window",
    takeaways: [
      "Models don't use long context uniformly — accuracy degrades as input grows, even within the advertised window.",
      "Chroma tested 18 production models: F1 fell as input length rose, worst in the 100K–500K-token range.",
      "'More context' is not free quality — past a point it actively hurts, so curate what goes in.",
    ],
    quiz: [
      {
        q: "What did the Context Rot research find?",
        options: ["Accuracy degrades as input length grows, not just cost", "Longer input is always better", "Only cost changes, never accuracy", "It only affects images"],
        answer: 0,
        explain: "All 18 tested models showed decreasing accuracy as input length increased.",
      },
      {
        q: "The practical takeaway?",
        options: ["Curate context — don't dump everything into the window", "Always use the maximum window", "Disable retrieval", "Use shorter model names"],
        answer: 0,
        explain: "Since accuracy falls with bloat, include the most relevant material, not the most material.",
      },
    ],
  },

  "context-rot-how-increasing-input-tokens-impacts-llm-performance-paper-": {
    takeaways: [
      "'Lost in the middle': models recall facts at the start and end of a long context better than the middle.",
      "It's structural (positional attention decay), not a quirk of one model or prompt.",
      "So place the most important instructions and data near the start or end of a long prompt.",
    ],
    quiz: [
      {
        q: "'Lost in the middle' means…",
        options: ["Models recall the start/end of long context better than the middle", "The model loses the system prompt", "A middle network layer fails", "Tokens get reordered"],
        answer: 0,
        explain: "Retrieval accuracy follows a U-shape over position — strongest at the two ends.",
      },
      {
        q: "How do you exploit this when writing a long prompt?",
        options: ["Put key instructions/data at the beginning or end", "Bury them in the middle", "Repeat them 50 times", "Use all caps"],
        answer: 0,
        explain: "Position matters — anchor critical content where recall is strongest.",
      },
    ],
  },

  "a-deep-discussion-with-the-author-of-context-rot": {
    takeaways: [
      "Benchmarks that show 'perfect' long-context recall (like needle-in-a-haystack) overstate real-world performance.",
      "Real tasks require reasoning over many distractors — that's where long context breaks down.",
      "Evaluate models on your task's shape and data, not on vendor benchmark numbers.",
    ],
    quiz: [
      {
        q: "Why can 'needle in a haystack' tests mislead?",
        options: ["They test exact lookup, not reasoning over many distractors", "They're too hard", "They use the wrong models", "They only test short context"],
        answer: 0,
        explain: "Finding one verbatim fact is easier than reasoning across a long, noisy context — real workloads look like the latter.",
      },
      {
        q: "Best way to know a model's real long-context ability?",
        options: ["Test it on your own task and data", "Trust the spec sheet", "Use the largest window available", "Ask on social media"],
        answer: 0,
        explain: "Advertised windows and benchmark scores rarely match your task — measure it directly.",
      },
    ],
  },

  "context-engineering-7-strategies-every-ai-llm-developer-must-know-cont": {
    takeaways: [
      "Common levers: retrieval, summarization/compaction, structured memory, tool outputs, and trimming irrelevant history.",
      "The goal is signal-to-noise in the window — not maximum content.",
      "Strategies compose: e.g. RAG to fetch the right material, then compaction to keep it lean.",
    ],
    quiz: [
      {
        q: "The unifying goal of context-engineering strategies?",
        options: ["Maximize relevant signal, minimize noise in the window", "Fill the window completely", "Use as many tools as possible", "Always summarize everything"],
        answer: 0,
        explain: "Each strategy is about getting the right tokens in front of the model, not the most tokens.",
      },
      {
        q: "Which pair work well together?",
        options: ["Retrieval (to fetch) + compaction (to keep it lean)", "Bigger font + bold", "Two system prompts", "Random truncation"],
        answer: 0,
        explain: "Fetch what's relevant, then compact so it stays within the attention budget.",
      },
    ],
  },

  "prompt-caching-10x-cheaper-llm-tokens-but-how": {
    applet: "caching-cost",
    takeaways: [
      "Caching reuses the model's computed state (KV cache) for a stable prefix, so repeat requests skip recomputing it.",
      "Put stable content first (system prompt, tools, long docs); put the variable user query last.",
      "Cache reads cost ~10% of input price; only the first write pays a small premium — and caches expire (~5 min default).",
    ],
    quiz: [
      {
        q: "For a cache hit, the cached part must be…",
        options: ["An identical prefix at the start of the prompt", "Anywhere in the prompt", "The output", "Under 100 tokens"],
        answer: 0,
        explain: "Caching is prefix-based — it matches from the start until the first byte that differs.",
      },
      {
        q: "Where should the variable user question go?",
        options: ["At the very end, after the stable cached prefix", "At the very beginning", "In the system prompt", "It doesn't matter"],
        answer: 0,
        explain: "Keep volatile content last so it doesn't invalidate the cached prefix.",
      },
      {
        q: "Roughly what does a cache READ cost vs normal input?",
        options: ["~10%", "~90%", "The same", "~200%"],
        answer: 0,
        explain: "Cached reads are ~0.1× input price; the first write is ~1.25× (5-minute TTL).",
      },
    ],
    examples: [
      {
        label: "Cache-busting vs cache-friendly prompt order",
        bad: 'system = f"Today is {now()}. {long_instructions}"\nuser   = question',
        good: "system = long_instructions          # stable, caches\nuser   = f\"(time: {now()}) {question}\"   # volatile bits live here",
        why: "A timestamp at the top of the system prompt changes every call, so the prefix never matches and the cache never hits. Move volatile bytes out of the stable prefix and the whole prefix caches.",
      },
    ],
  },

  "the-secret-to-faster-cheaper-llm-apps-prompt-caching-explained": {
    applet: "caching-cost",
    takeaways: [
      "Caching cuts cost AND latency — the cached prefix isn't reprocessed, so time-to-first-token drops too.",
      "Biggest wins: long system prompts, tool definitions, and RAG context reused across many calls.",
      "Measure your cache-hit rate; if it's ~0%, a silent invalidator (timestamp, unsorted JSON) is in the prefix.",
    ],
    quiz: [
      {
        q: "Besides cost, what does prompt caching improve?",
        options: ["Latency — cached tokens aren't reprocessed", "Model accuracy", "Output length", "Token vocabulary"],
        answer: 0,
        explain: "Skipping recomputation of the prefix speeds up time-to-first-token.",
      },
      {
        q: "Cache-hit rate is ~0% across identical-looking requests. Likely cause?",
        options: ["A changing byte in the prefix (timestamp, unsorted JSON keys)", "Caching doesn't work on this model", "The output is too long", "The wrong font"],
        answer: 0,
        explain: "Any variation in the prefix invalidates the cache — check for timestamps, random IDs, or non-deterministic serialization.",
      },
    ],
    examples: [
      {
        label: "A silent cache invalidator",
        bad: 'system = f"Session {uuid4()}. {INSTRUCTIONS}"',
        good: "system = INSTRUCTIONS   # put per-session ids in the user message, not the cached prefix",
        why: "A fresh UUID in the system prompt makes every request a unique prefix — the cache never reads. Keep the prefix byte-for-byte identical across calls.",
      },
    ],
  },
};
