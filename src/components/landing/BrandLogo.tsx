interface BrandLogoProps {
  href?: string;
  className?: string;
}

export default function BrandLogo({ href = "/landing", className = "" }: BrandLogoProps) {
  return (
    <a href={href} className={`group flex min-w-0 items-center gap-2 ${className}`}>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-sm font-extrabold text-white shadow-lg shadow-accent/20 transition group-hover:scale-105 sm:h-9 sm:w-9 sm:text-base"
        aria-hidden="true"
      >
        S
      </span>
      <span className="text-base font-bold leading-tight tracking-tight text-navy sm:text-lg">
        Screwdriver <span className="text-accent">Marketing</span>
      </span>
    </a>
  );
}
