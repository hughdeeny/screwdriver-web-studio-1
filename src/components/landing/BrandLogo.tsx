interface BrandLogoProps {
  href?: string;
  className?: string;
}

export default function BrandLogo({ href = "/landing", className = "" }: BrandLogoProps) {
  return (
    <a href={href} className={`group flex items-center gap-2 ${className}`}>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-base font-extrabold text-white shadow-lg shadow-accent/20 transition group-hover:scale-105"
        aria-hidden="true"
      >
        S
      </span>
      <span className="text-lg font-bold tracking-tight text-navy">
        Screwdriver <span className="text-accent">Marketing</span>
      </span>
    </a>
  );
}
