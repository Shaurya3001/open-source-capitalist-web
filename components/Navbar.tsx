import Link from "next/link";
import { Brand } from "./Brand";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="container-page flex h-14 items-center justify-between">
        <Link href="/" className="text-[15px]" aria-label="Open Source Capitalist home">
          <Brand />
        </Link>
        <div className="flex items-center gap-5 text-sm text-ink-muted">
          <Link href="/learn" className="hover:text-accent-deep">
            Lessons
          </Link>
          <Link href="/tools/token-budget" className="hover:text-accent-deep">
            Token budget
          </Link>
          <Link href="/about" className="hover:text-accent-deep">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
