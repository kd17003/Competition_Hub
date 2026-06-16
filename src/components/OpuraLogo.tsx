import Link from "next/link";

export function OpuraIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-primary text-white shadow-sm`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 12h8M12 8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function OpuraLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <OpuraIcon className={dimension} />
      <span className={`${textSize} font-semibold text-foreground`}>Opura AI</span>
    </Link>
  );
}
