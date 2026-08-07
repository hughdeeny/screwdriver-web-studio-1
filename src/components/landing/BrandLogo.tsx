interface BrandLogoProps {
  href?: string;
  className?: string;
}

export default function BrandLogo({ href = "/landing", className = "" }: BrandLogoProps) {
  return (
    <a href={href} className={`min-w-0 ${className}`}>
      <span className="text-base font-bold leading-tight tracking-tight text-navy sm:text-lg">
        Screwdriver <span className="text-accent">Marketing</span>
      </span>
    </a>
  );
}
