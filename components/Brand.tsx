export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className}`}>
      Open Source <span className="text-accent-deep">Capitalist</span>
    </span>
  );
}
