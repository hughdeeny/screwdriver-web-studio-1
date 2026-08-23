import { clientBrands } from "../../data/brands";

const logos = [...clientBrands, ...clientBrands, ...clientBrands, ...clientBrands];

export default function BrandLogoCarousel() {
  return (
    <section
      className="brand-carousel relative overflow-hidden border-t border-border bg-card py-10 sm:py-12"
      aria-label="Brands we've worked with"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Brands we&apos;ve worked with
        </p>
      </div>

      <div className="brand-carousel-track mt-6" aria-hidden="true">
        <div className="brand-carousel-row">
          {logos.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="brand-carousel-item">
              <img
                src={brand.src}
                alt=""
                width={220}
                height={120}
                className="brand-carousel-logo"
                loading={index < clientBrands.length ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {clientBrands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>

      <style>{`
        .brand-carousel-track {
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .brand-carousel-row {
          display: flex;
          width: max-content;
          gap: 2.5rem;
          align-items: center;
          animation: brand-marquee 28s linear infinite;
        }
        .brand-carousel-item {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 11rem;
          height: 5.5rem;
        }
        .brand-carousel-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        @keyframes brand-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-carousel-row {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            max-width: 72rem;
            margin-inline: auto;
            padding-inline: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
