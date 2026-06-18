import type { LessonEnrichment } from "@/lib/types";

// Authored teaching layer (NOT from the videos) — review for accuracy.
export const promptEngineering: Record<string, LessonEnrichment> = {
  "prompting-101-code-w-claude": {
    applet: "prompt-lab",
    takeaways: [
      "A strong prompt has structure: task + role, context, step-by-step instructions, examples, reminders, and an explicit output format.",
      "Prompting is empirical and iterative — start simple, find where the model fails, add the missing piece.",
      "Use delimiters (XML tags, markdown) so the model can reference parts reliably, and ask for a fixed output format for downstream parsing.",
    ],
    quiz: [
      {
        q: "Which is NOT one of the prompt building blocks?",
        options: ["Task & role", "Step-by-step instructions", "Output format", "The model's temperature"],
        answer: 3,
        explain: "Temperature is a sampling parameter, not part of the prompt's content structure.",
      },
      {
        q: "Why wrap inputs/outputs in XML tags?",
        options: ["So the model reliably separates instructions from content and emits parseable output", "It looks technical", "XML is required by the API", "It lowers token cost"],
        answer: 0,
        explain: "Delimiters help the model tell instructions from content and produce structured output.",
      },
      {
        q: "Best way to improve a failing prompt?",
        options: ["Diagnose what the model misunderstood, then add that context/instruction", "Make it longer everywhere", "Switch models immediately", "Use ALL CAPS"],
        answer: 0,
        explain: "Prompting is empirical — address the specific failure, don't pile on text.",
      },
    ],
    examples: [
      {
        label: "Vague vs structured prompt",
        bad: "Look at this form and tell me what happened.",
        good: "You are reviewing a Swedish car-accident form (17 checkboxes + a sketch).\n<form>{...}</form>\nSteps: 1) read the checkboxes  2) interpret the sketch  3) decide fault.\nBe factual; if unsure, say so. Output: <verdict>…</verdict>",
        why: "The vague version led Claude to guess a skiing accident. Adding role, context, ordered steps, a 'don't guess' reminder, and a tagged output format makes it accurate and parseable.",
      },
    ],
  },

  "ai-prompt-engineering-a-deep-dive": {
    takeaways: [
      "Write prompts like instructions to a smart new hire who lacks your context — spell out the implicit.",
      "Show the model examples of edge cases; few-shot beats abstract description for tricky inputs.",
      "Read the model's output to find where YOUR prompt was ambiguous — the output is a mirror of the prompt.",
    ],
    quiz: [
      {
        q: "A good mental model for prompting?",
        options: ["Instructing a smart colleague who lacks your context", "Programming with exact syntax", "Casting a spell", "Searching a database"],
        answer: 0,
        explain: "Treat the model like a capable person missing your unstated context — make the implicit explicit.",
      },
      {
        q: "When the model mishandles tricky inputs, a strong fix is…",
        options: ["Add few-shot examples of those edge cases", "Repeat the instruction louder", "Lower max_tokens", "Remove the system prompt"],
        answer: 0,
        explain: "Concrete examples of borderline cases teach the model your decision boundary.",
      },
    ],
  },

  "chatgpt-prompt-engineering-for-developers-a-short-course-from-openai-a": {
    takeaways: [
      "Two principles: write clear & specific instructions, and give the model time to 'think' (ask for steps before the answer).",
      "Use delimiters to separate instruction from input, and specify the output structure you want.",
      "Have the model reason through a problem before judging an answer, to reduce rushed mistakes.",
    ],
    quiz: [
      {
        q: "The two core principles of the course?",
        options: ["Be clear & specific; give the model time to reason", "Be vague; be fast", "Use one word; never give examples", "Maximize tokens; minimize structure"],
        answer: 0,
        explain: "Clear, specific instructions plus step-by-step reasoning are the backbone.",
      },
      {
        q: "'Give the model time to think' means…",
        options: ["Ask for intermediate steps before the final answer", "Add a literal delay", "Raise temperature", "Use a bigger model"],
        answer: 0,
        explain: "Eliciting reasoning before the conclusion improves accuracy on harder tasks.",
      },
    ],
    examples: [
      {
        label: "Specify the output you want",
        bad: "Tell me about these reviews.",
        good: "For each review, output JSON: {sentiment: \"positive\"|\"negative\", topics: string[]}.\nReviews are between <r></r> tags.\n<r>…</r>",
        why: "A clear task + delimiters + an explicit schema turns a vague ask into a reliable, parseable extraction.",
      },
    ],
  },

  "full-ai-prompting-course-with-andrew-ng": {
    takeaways: [
      "The fundamentals generalize: clarity, specificity, examples, and structured output work across models and tasks.",
      "Iterate prompts like code — version them, test on real inputs, refine.",
      "Most 'the model can't do this' problems are really 'the prompt didn't ask clearly' problems.",
    ],
    quiz: [
      {
        q: "Best way to develop a prompt for a real task?",
        options: ["Iterate against real inputs and refine", "Write it once and ship", "Copy a template verbatim", "Use the longest prompt possible"],
        answer: 0,
        explain: "Treat prompting as an empirical loop on representative data.",
      },
      {
        q: "A frequent root cause of poor outputs?",
        options: ["The prompt was underspecified or ambiguous", "The model is always too small", "Too few API calls", "Wrong programming language"],
        answer: 0,
        explain: "Clarity and specificity fix a large share of failures before you change the model.",
      },
    ],
  },

  "anthropic-claude-code-prompt-engineering-in-27-min": {
    takeaways: [
      "For coding agents, give the goal + constraints + context up front in one well-specified turn, not drip-fed over many.",
      "Point the agent at the right files and tell it how to verify (run tests, run the app) — don't make it guess success.",
      "Be explicit about what NOT to do (scope limits) as much as what to do.",
    ],
    quiz: [
      {
        q: "Most effective way to prompt a coding agent?",
        options: ["Specify goal, constraints, and context up front in one clear turn", "Give one vague line and correct later", "Never mention files", "Ask it to surprise you"],
        answer: 0,
        explain: "Front-loading a clear, complete spec maximizes autonomy and quality.",
      },
      {
        q: "How should you define 'done' for an agent?",
        options: ["A concrete, checkable criterion (tests pass, app runs)", "Say 'make it good'", "Let the agent decide silently", "Don't — it's obvious"],
        answer: 0,
        explain: "Checkable success criteria let the agent verify itself instead of guessing.",
      },
    ],
    examples: [
      {
        label: "Vague vs spec'd coding task",
        bad: "Fix the login bug.",
        good: "Login fails for SSO users (see auth/sso.ts). Reproduce with `npm test auth`, fix the root cause, leave the password flow untouched. Done = the failing test passes.",
        why: "The spec'd version names the file, gives a repro + verification, and bounds the scope — so the agent can work autonomously and confirm success.",
      },
    ],
  },

  "how-anthropic-engineers-actually-prompt-claude-code-full-guide": {
    takeaways: [
      "Treat the agent like a capable engineer: clear task, the right context, and a way to check its work.",
      "Keep a CLAUDE.md / project-context file so you don't re-explain conventions every prompt.",
      "Let it plan first on non-trivial tasks, and review the plan before it writes code.",
    ],
    quiz: [
      {
        q: "Why keep a CLAUDE.md / project-context file?",
        options: ["Conventions load automatically instead of being re-typed each prompt", "To increase token cost", "It's required by the CLI", "To store secrets"],
        answer: 0,
        explain: "Persistent project context saves you from re-explaining standards every time.",
      },
      {
        q: "For a non-trivial change, a good first step is…",
        options: ["Have the agent propose a plan you review before coding", "Let it commit immediately", "Skip planning to save time", "Ask for the whole repo rewritten"],
        answer: 0,
        explain: "Reviewing a plan early catches misunderstandings before code is written.",
      },
    ],
  },

  "the-new-rules-of-prompt-engineering-complete-guide": {
    applet: "prompt-lab",
    takeaways: [
      "Newer models follow instructions more literally — dial back the aggressive 'CRITICAL: YOU MUST' language that older models needed.",
      "Prefer showing (examples, a desired format) over telling at length.",
      "Structure and specificity still win; the basics didn't change, the over-compensation did.",
    ],
    quiz: [
      {
        q: "On newer models, aggressive 'CRITICAL: YOU MUST' instructions tend to…",
        options: ["Overtrigger — the model follows them too literally", "Be ignored", "Crash the model", "Always help"],
        answer: 0,
        explain: "Newer models follow the system prompt closely, so heavy-handed language can backfire — soften it.",
      },
      {
        q: "A durable prompting principle?",
        options: ["Be specific and show examples of the desired output", "Always write the longest prompt", "Never use a system prompt", "Avoid structure"],
        answer: 0,
        explain: "Specificity and concrete examples remain the highest-leverage moves.",
      },
    ],
  },
};
