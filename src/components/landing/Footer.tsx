import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card py-10">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <BrandLogo href="/landing" />
            <p className="text-sm text-muted">
              Digital Reputation Management System
            </p>
          </div>
          <div className="text-sm text-muted">
            <p>contact@screwdrivermarketing.com</p>
            <p className="mt-1">1300 000 000</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Screwdriver Marketing. All rights reserved.</p>
          <a href="#" className="transition hover:text-navy">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
