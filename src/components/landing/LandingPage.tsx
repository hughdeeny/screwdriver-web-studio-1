import HeroSection from "./HeroSection";
import Footer from "./Footer";
import MetaViewContentTracker from "./MetaViewContentTracker";

export default function LandingPage() {
  return (
    <>
      <MetaViewContentTracker />
      <HeroSection />
      <section className="border-t border-border bg-card py-12 sm:py-14">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            Built by Screwdriver Marketing, an Adelaide-based digital marketing business helping local
            service businesses improve their Google presence, online trust, and customer follow-up
            systems.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
