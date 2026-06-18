import { Brand } from "./Brand";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shaurya-gulati/" },
  { label: "GitHub", href: "https://github.com/Shaurya3001" },
  { label: "Email", href: "mailto:shauryagulati3001@gmail.com" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p>
            <Brand className="text-ink" /> — AI Lessons
          </p>
          <p className="text-sm text-ink-faint">Built by Shaurya Gulati</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex flex-wrap gap-4 text-sm">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-accent-deep"
              >
                {l.label}
              </a>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
            Sourced notes · cite-or-cut · no slop
          </p>
        </div>
      </div>
    </footer>
  );
}
