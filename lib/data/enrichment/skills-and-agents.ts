import type { LessonEnrichment } from "@/lib/types";

// Authored teaching layer (NOT from the videos) — review for accuracy.
export const skillsAndAgents: Record<string, LessonEnrichment> = {
  "building-effective-llm-agents": {
    takeaways: [
      "Distinguish workflows (predefined code paths) from agents (the model directs its own process) — most production value is in workflows.",
      "Five workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.",
      "Start simple; add agentic autonomy only when flexibility beats a fixed workflow. Invest in the tool interface (ACI).",
    ],
    quiz: [
      {
        q: "Workflows vs agents?",
        options: ["Workflows follow predefined paths; agents direct their own process", "They're the same", "Agents are always better", "Workflows can't use tools"],
        answer: 0,
        explain: "Workflows orchestrate via code; agents let the model choose the path. Prefer the simplest that works.",
      },
      {
        q: "Which is NOT one of the five workflow patterns?",
        options: ["Prompt chaining", "Routing", "Evaluator-optimizer", "Gradient descent"],
        answer: 3,
        explain: "Gradient descent is model training, not an agent workflow pattern.",
      },
      {
        q: "When should you reach for a true agent?",
        options: ["Open-ended tasks where you can't predict the steps", "Every task", "Simple extraction", "To look impressive"],
        answer: 0,
        explain: "Agents fit problems whose path can't be hardcoded; otherwise a workflow is cheaper and more reliable.",
      },
    ],
    examples: [
      {
        label: "An agent where a workflow would do",
        bad: "An autonomous agent loops with tools to 'extract the invoice total' from a PDF.",
        good: "A single LLM call (or a 2-step chain) that returns the total — no agent loop.",
        why: "Agentic loops add latency, cost, and failure modes. For a predictable task a workflow (or one call) is simpler and more reliable. Reserve agents for open-ended work.",
      },
    ],
  },

  "how-we-build-effective-agents-barry-zhang-anthropic": {
    takeaways: [
      "Three principles: keep it simple, prioritize transparency (show the agent's plan/steps), and craft the agent-computer interface.",
      "Don't over-engineer — the simplest design that meets the need wins.",
      "An agent can only act as well as its tools let it; tool design is first-class.",
    ],
    quiz: [
      {
        q: "One of Anthropic's three agent principles?",
        options: ["Prioritize transparency — surface the agent's planning steps", "Hide the agent's reasoning", "Always maximize tools", "Never use the model's plan"],
        answer: 0,
        explain: "Transparency (visible planning), simplicity, and good tool/interface design are the core principles.",
      },
      {
        q: "'Craft the agent-computer interface' means…",
        options: ["Design tool definitions/docs as carefully as your prompts", "Build a GUI", "Use a faster computer", "Write less documentation"],
        answer: 0,
        explain: "The ACI — how the agent perceives and acts via tools — is as important as the prompt.",
      },
    ],
  },

  "don-t-build-agents-build-skills-instead-barry-zhang-mahesh-murag-anthr": {
    takeaways: [
      "Often you don't need an autonomous agent — a well-scoped Skill (instructions + resources) does the job more reliably.",
      "Skills are composable, inspectable, and cheaper than open-ended agent loops.",
      "Reach for autonomy only when the task is genuinely open-ended; default to skills/workflows.",
    ],
    quiz: [
      {
        q: "The talk's core argument?",
        options: ["Prefer well-scoped skills over autonomous agents when possible", "Always build the most autonomous agent", "Never use skills", "Agents are obsolete"],
        answer: 0,
        explain: "A scoped skill is usually more reliable and cheaper than an open-ended agent.",
      },
      {
        q: "When is autonomy actually warranted?",
        options: ["Genuinely open-ended tasks you can't script", "Every task", "Simple lookups", "To impress stakeholders"],
        answer: 0,
        explain: "Default to skills/workflows; reserve agentic autonomy for the unpredictable.",
      },
    ],
    examples: [
      {
        label: "Open-ended agent vs a skill",
        bad: "An agent free-roams your repo to 'format all the docs nicely' on each run.",
        good: "A `format-docs` skill: clear steps + the style rules, invoked on demand.",
        why: "For a repeatable task, a skill encodes the know-how once and runs predictably. An agent re-deriving it every run is slower, pricier, and less consistent.",
      },
    ],
  },

  "anthropic-agent-skills-explained-build-specialized-claude-agents-compl": {
    applet: "skill-anatomy",
    takeaways: [
      "A Skill is a folder with a SKILL.md: frontmatter (name, description) + body instructions, plus optional resources.",
      "The description is the trigger — Claude reads only it by default and uses it to decide when to load the skill.",
      "Progressive disclosure: the full body loads only when relevant, keeping context lean.",
    ],
    quiz: [
      {
        q: "What does the SKILL.md 'description' do?",
        options: ["Acts as the trigger Claude uses to decide when to load the skill", "Stores the API key", "Sets the temperature", "Names the author"],
        answer: 0,
        explain: "Claude reads the description by default and matches it to the task — be specific about WHEN to use the skill.",
      },
      {
        q: "'Progressive disclosure' means…",
        options: ["The full skill body loads only when its description matches the task", "Revealing the answer slowly", "Streaming output", "Hiding the skill from users"],
        answer: 0,
        explain: "Only the description sits in context until needed, so skills can be detailed without bloating every prompt.",
      },
    ],
    examples: [
      {
        label: "Vague vs trigger-rich description",
        bad: "description: Helps with PDFs.",
        good: "description: Fills PDF form fields from a data file. Use when the user asks to populate, complete, or fill a PDF form.",
        why: "Claude decides whether to load a skill from its description. 'Helps with PDFs' rarely fires at the right moment; naming the concrete trigger conditions makes it reliable.",
      },
    ],
  },

  "anthropic-s-full-claude-skills-guide-in-22-minutes": {
    applet: "skill-anatomy",
    takeaways: [
      "Skills package repeatable know-how so you don't re-paste the same instructions every conversation.",
      "Keep skills focused — one job per skill, with a precise description.",
      "Skills are an open standard adopted across multiple vendors and tools.",
    ],
    quiz: [
      {
        q: "Why use a skill instead of pasting instructions each time?",
        options: ["The know-how is packaged and auto-loaded when relevant", "To use more tokens", "Skills are mandatory", "To hide instructions"],
        answer: 0,
        explain: "A skill encodes the workflow once and loads on demand.",
      },
      {
        q: "A good skill is…",
        options: ["Focused on one job with a precise description", "A catch-all for everything", "Undocumented", "As long as possible"],
        answer: 0,
        explain: "One job per skill + a precise trigger description makes it reliable and composable.",
      },
    ],
  },

  "claude-agent-sdk-full-workshop-thariq-shihipar-anthropic": {
    takeaways: [
      "The Agent SDK gives you the harness primitives Claude Code uses: the agent loop, tool integration, subagents, permissions, and context management.",
      "You bring tools and a goal; the SDK runs the loop so you don't hand-roll orchestration.",
      "Sensible defaults (permissions, context handling) are built in — focus on your tools and prompts.",
    ],
    quiz: [
      {
        q: "What does the Claude Agent SDK provide?",
        options: ["Harness primitives: the agent loop, tools, subagents, permissions, context mgmt", "A new model", "A database", "A UI framework only"],
        answer: 0,
        explain: "It packages the scaffolding around the model so you don't build the loop yourself.",
      },
      {
        q: "Building on the SDK, what should you focus on?",
        options: ["Your tools and prompts (the SDK runs the loop)", "Reimplementing the agent loop", "Training the model", "Writing a tokenizer"],
        answer: 0,
        explain: "The SDK handles orchestration; your job is the tool interface and instructions.",
      },
    ],
  },

  "claude-code-skills-skills-sh-crash-course": {
    applet: "skill-anatomy",
    takeaways: [
      "The skills ecosystem (skills.sh) makes it easy to install, share, and manage Skills.",
      "A skill is just files (SKILL.md + resources) — portable and version-controllable.",
      "Adopt existing skills before writing your own; the format is an open standard.",
    ],
    quiz: [
      {
        q: "What is a Skill, structurally?",
        options: ["A folder of files (SKILL.md + optional resources)", "A fine-tuned model", "A database table", "A browser extension"],
        answer: 0,
        explain: "Skills are plain files — portable, shareable, and version-controllable.",
      },
      {
        q: "Before writing a skill, you should…",
        options: ["Check if an existing one already does it", "Always write from scratch", "Fine-tune first", "Avoid the standard"],
        answer: 0,
        explain: "The format is shared — reuse community/official skills when they fit.",
      },
    ],
  },

  "how-i-use-claude-code-with-skills-mcp-agents-plugins": {
    takeaways: [
      "Skills = packaged know-how; MCP = connections to tools/data; subagents = isolated parallel work; plugins = bundles. Use each for its job.",
      "Reach for the simplest primitive first — a skill or a clear prompt before a full agent.",
      "Combine them: e.g. a skill that calls an MCP tool, run inside a subagent.",
    ],
    quiz: [
      {
        q: "Skills vs MCP — the distinction?",
        options: ["Skills package know-how; MCP connects to external tools/data", "They're the same", "MCP is for prompts only", "Skills replace the model"],
        answer: 0,
        explain: "Skills are instructions/resources; MCP is the protocol to reach tools and data.",
      },
      {
        q: "What should you reach for first?",
        options: ["The simplest primitive (a skill or clear prompt) before a full agent", "The most complex setup", "Always a multi-agent system", "Fine-tuning"],
        answer: 0,
        explain: "Start simple; escalate to autonomy only when the task needs it.",
      },
    ],
    examples: [
      {
        label: "When to use which primitive",
        bad: "Spin up a multi-agent system to 'rename variables consistently'.",
        good: "A skill (or a single clear instruction) for the rename; an MCP server only if it needs live external data; a subagent only to parallelize independent work.",
        why: "Matching the primitive to the task — skill for know-how, MCP for connections, subagents for parallelism — keeps things simple. Reaching for agents first over-engineers.",
      },
    ],
  },

  "the-ultimate-claude-code-guide-mcp-skills-more": {
    takeaways: [
      "Claude Code combines skills, MCP, subagents, and project context (CLAUDE.md) into one agentic coding workflow.",
      "Set up project context once so the agent knows your conventions.",
      "Use the right feature per task rather than forcing everything through one.",
    ],
    quiz: [
      {
        q: "What ties a Claude Code setup together?",
        options: ["Project context (CLAUDE.md) + skills + MCP + subagents", "A single mega-prompt", "Only the model", "A spreadsheet"],
        answer: 0,
        explain: "Persistent context plus the right primitives make the agentic workflow effective.",
      },
      {
        q: "Best practice when configuring Claude Code?",
        options: ["Define project context/conventions once up front", "Re-explain conventions each prompt", "Avoid context files", "Disable tools"],
        answer: 0,
        explain: "A project-context file means you don't repeat conventions every time.",
      },
    ],
  },

  "anthropic-workshop-build-agents-that-run-for-hours-ash-prabaker-andrew": {
    takeaways: [
      "Long-running agents need a harness: persistent state (files/Git), one-feature-at-a-time loops, and clean context hand-offs.",
      "Single-model self-evaluation is a trap — use an adversarial evaluator (generator vs critic) to catch what the builder misses.",
      "Define quality with rubrics; let the evaluator discard and restart rather than ship 'slop'.",
    ],
    quiz: [
      {
        q: "Why not let an agent judge its own work?",
        options: ["Models are poor judges of their own output; an adversarial evaluator catches more", "Self-eval is always fine", "It's faster to skip evaluation", "Evaluators don't help"],
        answer: 0,
        explain: "A separate, strict evaluator (generator-vs-critic) finds bugs the builder declares 'done'.",
      },
      {
        q: "What keeps a long-running agent coherent over hours?",
        options: ["Persistent state (files/Git) + clean context hand-offs", "A bigger prompt", "Never compacting", "One giant context window"],
        answer: 0,
        explain: "Externalized state and structured hand-offs beat relying on a single growing context.",
      },
    ],
    examples: [
      {
        label: "Self-eval vs adversarial evaluator",
        bad: "The agent builds a feature, then marks it 'done' after one passing run.",
        good: "A generator builds; a separate evaluator drives the live app (e.g. via Playwright), critiques harshly, and loops until the rubric is met.",
        why: "Models over-approve their own work. A strict, independent evaluator with a rubric catches non-functional output and forces real quality over long runs.",
      },
    ],
  },
};
