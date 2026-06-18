import type { LessonEnrichment } from "@/lib/types";

// Authored teaching layer (NOT from the videos) — review for accuracy.
export const mcp: Record<string, LessonEnrichment> = {
  "mcp-201-code-w-claude": {
    applet: "mcp-flow",
    takeaways: [
      "MCP is more than tool-calling: servers expose Tools (model-driven), Resources (app-driven data), and Prompts (user-driven templates).",
      "'Sampling' lets a server ask the client's model to complete something — so the server needs no model or API key of its own.",
      "MCP is moving to the web: remote servers over streamable HTTP, authenticated with OAuth 2.1.",
    ],
    quiz: [
      {
        q: "MCP exposes three primitives — which set?",
        options: ["Tools, Resources, Prompts", "GET, POST, PUT", "Models, Tokens, Weights", "Files, Folders, Links"],
        answer: 0,
        explain: "Tools are model-driven actions, Resources are app-driven data, Prompts are user-invoked templates.",
      },
      {
        q: "What is MCP 'sampling'?",
        options: ["A server asks the client's model to generate a completion", "Random token selection", "A/B testing prompts", "Downsampling images"],
        answer: 0,
        explain: "Sampling routes a completion request back through the client's model, so the server needs no model of its own.",
      },
      {
        q: "How are remote (web) MCP servers authenticated?",
        options: ["OAuth 2.1", "API keys in the URL", "No auth", "Basic password"],
        answer: 0,
        explain: "Remote MCP uses OAuth 2.1 so servers can bind securely to user accounts.",
      },
    ],
    examples: [
      {
        label: "Hardcoded integration vs an MCP server",
        bad: "# bespoke glue, re-written in every app\nslack = SlackClient(token)\ndef get_messages(): return slack.history(...)",
        good: '# one MCP server, reused by any MCP client\n{ "mcpServers": { "slack": { "url": "https://…/mcp" } } }',
        why: "Without MCP you re-glue each tool into each app (M×N integrations). An MCP server exposes the capability once and any MCP client can use it (M+N).",
      },
    ],
  },

  "building-with-mcp-and-the-claude-api": {
    takeaways: [
      "MCP is an open standard so the same integration works across apps — solving the M×N integration explosion.",
      "Think 'USB-C for AI': one protocol between models and the tools/data they need.",
      "It decouples model logic from the specifics of each data source or API.",
    ],
    quiz: [
      {
        q: "The problem MCP is designed to solve?",
        options: ["The M×N explosion of bespoke app↔tool integrations", "Slow inference", "High token cost", "Image generation"],
        answer: 0,
        explain: "A shared protocol turns M×N custom integrations into M+N.",
      },
      {
        q: "A useful analogy for MCP?",
        options: ["A USB-C port for AI apps", "A faster GPU", "A new programming language", "A database index"],
        answer: 0,
        explain: "One standard connector between AI apps and many tools/data sources.",
      },
    ],
  },

  "building-agents-with-model-context-protocol-full-workshop-with-mahesh-": {
    applet: "mcp-flow",
    takeaways: [
      "Build an MCP server by exposing your system's capabilities as tools/resources/prompts behind the protocol.",
      "Agents get more capable by composing multiple MCP servers rather than hardcoding each integration.",
      "Good tool design (clear names, prescriptive descriptions, scoped inputs) matters as much as the agent's prompt.",
    ],
    quiz: [
      {
        q: "How does an agent gain new capabilities via MCP?",
        options: ["By connecting to MCP servers that expose tools/resources", "By fine-tuning", "By raising temperature", "By adding more system-prompt text"],
        answer: 0,
        explain: "Capabilities come from connected servers, composable without bespoke glue.",
      },
      {
        q: "What makes MCP tools work well for the model?",
        options: ["Clear names, prescriptive descriptions, and scoped inputs", "As many tools as possible", "Short cryptic names", "No descriptions"],
        answer: 0,
        explain: "The model picks tools from their descriptions — invest in the tool interface.",
      },
    ],
    examples: [
      {
        label: "Tool sprawl vs a scoped toolset",
        bad: "50 overlapping tools with terse names: do_thing, do_thing2, helper, util…",
        good: 'A few well-named tools with trigger-rich descriptions:\nsearch_tickets("Search support tickets by query. Use when the user asks about existing tickets.")',
        why: "The model chooses tools from their descriptions. Too many vague tools cause wrong or excess calls; a small, clearly-described set is far more reliable.",
      },
    ],
  },

  "mcp-vs-rag-how-ai-agents-llms-connect-to-data": {
    takeaways: [
      "RAG retrieves passive knowledge into context; MCP lets the model take actions and call live tools.",
      "They're complementary: RAG for 'what does it say', MCP for 'go do / fetch it'.",
      "MCP can even wrap a RAG system as a tool — they compose.",
    ],
    quiz: [
      {
        q: "Core difference between RAG and MCP?",
        options: ["RAG retrieves info into context; MCP enables actions/tool calls", "They're identical", "RAG is for images only", "MCP replaces the model"],
        answer: 0,
        explain: "RAG is passive retrieval; MCP is a protocol for invoking tools and live data.",
      },
      {
        q: "Can RAG and MCP work together?",
        options: ["Yes — e.g. expose a RAG search as an MCP tool", "No, they conflict", "Only sometimes by luck", "Only with fine-tuning"],
        answer: 0,
        explain: "MCP can wrap retrieval as a tool; the two are complementary.",
      },
    ],
    examples: [
      {
        label: "Passive retrieval vs an action",
        bad: "RAG: fetch the doc explaining how to issue a refund → the model explains the steps to the user.",
        good: "MCP: the model calls issue_refund(order_id) → the refund actually happens.",
        why: "RAG tells you what to do; MCP lets the model do it. Choose by whether you need knowledge or action — often both.",
      },
    ],
  },

  "mcp-dev-days-keynote-building-the-future-of-ai-development-together": {
    takeaways: [
      "MCP has cross-vendor momentum — adoption across Anthropic, OpenAI, Microsoft, and tooling vendors.",
      "An open standard means servers you build work across the ecosystem, not just one app.",
      "Registries and better auth are making MCP servers easier to discover and deploy.",
    ],
    quiz: [
      {
        q: "Why does cross-vendor adoption of MCP matter?",
        options: ["A server you build works across many AI apps, not just one", "It makes models bigger", "It lowers GPU cost", "It replaces HTTP"],
        answer: 0,
        explain: "Standardization means write-once, use-everywhere integrations.",
      },
      {
        q: "What's making MCP servers easier to find and use?",
        options: ["Registries and improved (OAuth) auth", "Bigger context windows", "More emojis", "Slower releases"],
        answer: 0,
        explain: "Discovery registries and OAuth-based auth reduce friction.",
      },
    ],
  },

  "ai-engineer-world-s-fair-2025-day-1-keynotes-mcp-track-ft-anthropic-mc": {
    takeaways: [
      "2025 was 'the year of agents'; MCP became the connective tissue between models and real systems.",
      "Practitioner consensus: start simple (workflows), add agentic autonomy only where it earns its keep.",
      "The ecosystem is converging on shared protocols (MCP) and harnesses rather than bespoke stacks.",
    ],
    quiz: [
      {
        q: "A recurring theme of the 2025 keynotes?",
        options: ["MCP as the connective tissue between models and systems", "Abandoning agents entirely", "Models without tools", "Returning to rule-based AI"],
        answer: 0,
        explain: "MCP and agentic tooling dominated the agenda.",
      },
      {
        q: "Practitioner advice on agents?",
        options: ["Start simple; add autonomy only where it pays off", "Always build the most autonomous agent", "Never use workflows", "Avoid tools"],
        answer: 0,
        explain: "Use the simplest pattern that works; reserve autonomy for genuinely open-ended tasks.",
      },
    ],
  },

  "supporting-multi-agent-use-cases-with-anthropic-s-model-context-protoc": {
    takeaways: [
      "MCP can coordinate multiple agents/servers — one agent's server can be another's tool.",
      "Multi-agent systems need clear interfaces and context isolation, which a protocol provides.",
      "Compose specialists (each an MCP server) rather than building one mega-agent.",
    ],
    quiz: [
      {
        q: "How does MCP help multi-agent systems?",
        options: ["Standard interfaces let agents/servers compose and isolate context", "It merges all agents into one", "It removes the need for agents", "It only works single-agent"],
        answer: 0,
        explain: "A shared protocol gives agents clean, composable boundaries.",
      },
      {
        q: "A good multi-agent design principle?",
        options: ["Compose specialists with clear interfaces", "One giant do-everything agent", "Share all context globally", "Avoid interfaces"],
        answer: 0,
        explain: "Specialists + clean interfaces beat a monolith and keep context isolated.",
      },
    ],
  },

  "build-a-claude-mcp-agent-that-does-everything": {
    takeaways: [
      "Connect Claude to MCP servers (filesystem, GitHub, search…) and it can act across your tools from one place.",
      "Start with one or two servers you actually use; add more as needed.",
      "The agent is only as good as the tools' descriptions and your permissions/guardrails.",
    ],
    quiz: [
      {
        q: "First step to a useful MCP agent?",
        options: ["Connect one or two MCP servers you actually use", "Connect every server available", "Write a 2,000-line prompt", "Fine-tune a model"],
        answer: 0,
        explain: "Start small with tools you'll really use, then expand.",
      },
      {
        q: "What most limits an MCP agent's reliability?",
        options: ["Tool descriptions, permissions, and guardrails", "The font", "The number of emojis", "The model's name"],
        answer: 0,
        explain: "Clear tool interfaces and sane permissions matter more than raw model power.",
      },
    ],
    examples: [
      {
        label: "Everything-server vs scoped + guarded",
        bad: "Give the agent unrestricted shell + every server, no confirmations.",
        good: "Connect the 2–3 servers you need; gate destructive actions (delete, send, pay) behind a confirmation.",
        why: "Capability without guardrails is a liability. Scope the tools and require confirmation for irreversible actions.",
      },
    ],
  },
};
