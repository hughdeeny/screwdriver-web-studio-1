export const SITE_URL = "https://screwdrivermarketing.com.au";
export const OG_IMAGE_PATH = "/og-image.jpg";

export const STRATEGY_MAIL =
  "mailto:hugh@screwdrivermarketing.com.au?subject=Demo%20call%20request";

export const STRATEGY_CALL_HREF = "/book/";

export const MISSED_CALL_MAIL =
  "mailto:hugh@screwdrivermarketing.com.au?subject=Missed-call%20text-back%20enquiry";

export const CONTACT_EMAIL = "hugh@screwdrivermarketing.com.au";

export const serviceCards = [
  {
    title: "Website design",
    body: "Fast, mobile-friendly websites built around calls, quotes, and local trust.",
  },
  {
    title: "Google Business Profile support",
    body: "Services, photos, descriptions, website links, review flow, and local search basics set up properly.",
  },
  {
    title: "Local SEO pages",
    body: "Service and location pages designed to help you show up for the searches your customers actually make.",
  },
  {
    title: "Lead tracking",
    body: "Track phone clicks, quote forms, button clicks, and thank-you page visits so you know what is creating enquiries.",
  },
  {
    title: "Missed-call and follow-up systems",
    body: "Simple systems to help recover missed calls, organise enquiries, and stop leads going cold.",
  },
  {
    title: "Care and growth plan",
    body: "Ongoing updates, small improvements, reporting, and support so the system keeps getting cleaner over time.",
  },
];

export type ServicePage = {
  slug: string;
  title: string;
  navLabel: string;
  headline: string;
  summary: string;
  description: string;
  outcomes: string[];
  includes: string[];
  loomEmbedUrl?: string;
  freeApps?: {
    name: string;
    label: string;
    href: string;
    iconSrc?: string;
    iconAlt?: string;
    showInstall?: boolean;
  }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-design",
    title: "Web Design",
    navLabel: "Web design",
    headline: "Websites built to get calls and quote requests",
    summary:
      "Fast, mobile-friendly websites for tradies and service businesses — clear services, obvious contact paths, and a design that builds trust.",
    description:
      "Your website should do more than look professional. It should explain what you do, make it easy to call or request a quote, and work properly on mobile for people searching on the go.",
    outcomes: [
      "A clean site that matches the quality of your real-world work",
      "Clear service and area messaging so visitors know you are the right fit",
      "Phone and quote buttons that are easy to use on mobile",
      "A stronger first impression when customers compare you to competitors",
    ],
    includes: [
      "Mobile-friendly website design and build",
      "Clear services and service-area structure",
      "Contact forms and call-focused CTAs",
      "Basic on-page SEO setup",
      "Review and trust placement",
    ],
  },
  {
    slug: "reputation-management",
    title: "Reputation Management",
    navLabel: "Reputation management",
    headline: "How to turn good work and past happy customers into more google reviews and more jobs",
    summary:
      "Reputation systems that help you collect reviews, look stronger online, and convert more of the customers already considering you.",
    description:
      "Strong reviews make it easier for new customers to choose you. We set up simple systems so completed jobs turn into reviews, and your online reputation reflects the work you actually do.",
    outcomes: [
      "More consistent review flow after completed jobs",
      "A stronger Google presence that builds trust faster",
      "Fewer missed opportunities when competitors look more established",
      "A clearer process for asking and following up for reviews",
    ],
    includes: [
      "Review request and follow-up flow",
      "Google review and profile support",
      "Reputation widget and testimonial placement",
      "Practical response and monitoring habits",
      "Setup that fits busy operators, not marketing teams",
    ],
    loomEmbedUrl: "https://www.loom.com/embed/9b1bbc9f35d4480eafc7c65b4a75f987",
  },
  {
    slug: "automations",
    title: "Automations",
    navLabel: "Automations",
    headline: "Stop losing leads when you miss the call",
    summary:
      "Simple follow-up and automation systems that keep enquiries warm, organised, and moving toward booked jobs.",
    description:
      "Busy operators miss calls, forget follow-ups, and lose leads that were ready to book. We put simple automation in place so missed enquiries get a reply and leads stay organised.",
    outcomes: [
      "Faster response when a call or form comes in",
      "Fewer leads going cold because follow-up slipped",
      "Enquiries organised in one place instead of scattered messages",
      "A clearer view of which contact paths are creating jobs",
    ],
    includes: [
      "Missed-call text-back and lead follow-up",
      "Quote request and enquiry automation",
      "Lead capture connected to your website",
      "Basic tracking for calls, forms, and key actions",
      "Simple systems you can run without extra admin load",
    ],
  },
  {
    slug: "screwdriver-toolbox",
    title: "Screwdriver Toolbox",
    navLabel: "Screwdriver Toolbox",
    headline: "Screwdriver Toolbox — custom applications and tools for your business",
    summary:
      "When off-the-shelf software doesn't fit, we build custom tools to automate work, save you time, and save you money.",
    description:
      "Many construction and trades businesses outgrow spreadsheets, shared inboxes, and generic software. Screwdriver Toolbox is where we design and build custom applications and tools that fit the way your team already works — quoting, job tracking, client portals, internal dashboards, and more.",
    outcomes: [
      "Tools that match your real process instead of forcing a generic workflow",
      "Less admin time spent jumping between spreadsheets and messages",
      "Clearer visibility across jobs, clients, and follow-up",
      "A system you can grow with as the business gets busier",
    ],
    includes: [
      "Custom application and tool scoping",
      "Workflow design around your operations",
      "Build and setup for internal or client-facing tools",
      "CMS and content systems where needed",
      "Ongoing refinement as your process evolves",
    ],
    freeApps: [
      {
        name: "Tank Tally",
        label: "Try this free tool built for truckers",
        href: "https://dan-app.vercel.app/",
        iconSrc: "/tank-tally-icon.png",
        iconAlt: "Tank Tally app icon",
        showInstall: true,
      },
      {
        name: "Prospector GPT",
        label: "Try this free lead generation tool to find qualified local businesses. (ChatGPT based)",
        href: "https://chatgpt.com/g/g-6a73f80ebd908191be3224457ad38d66-prospecter",
        iconSrc: "/prospector-gpt-icon.png",
        iconAlt: "Prospector GPT app icon",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export const websitePackages = [
  {
    name: "Starter",
    price: "$1,490 / year",
    priceAlt: "or $149/month",
    recommended: false,
    blurb: "1 page website",
    body: "Your professional online home — a clear, mobile-friendly site with the basics covered.",
    outcomes: [
      "Mobile-friendly website",
      "Hosting + SSL",
      "Contact forms",
      "Basic on-site SEO",
      "Small updates quarterly",
    ],
    note: "",
  },
  {
    name: "Business",
    price: "$2,490 / year",
    priceAlt: "or $249/month",
    recommended: true,
    blurb: "5 page website",
    body: "Website + customer tools for local businesses that need more than a single page.",
    outcomes: [
      "Everything in Starter",
      "Small updates monthly",
      "Shared customer inbox",
      "On-page SEO",
      "Google profile optimisation",
    ],
    note: "",
  },
  {
    name: "Advanced Smart Website",
    price: "$3,990 / year",
    priceAlt: "or $399/month",
    recommended: false,
    blurb: "15–20 page website",
    body: "Website + follow-up system — reconnect past customers and keep new leads moving.",
    outcomes: [
      "Everything in Business",
      "Missed-call text-back",
      "Automated lead follow-up",
      "1-click marketing system",
      "Extensive keyword research",
      "Backlinks",
      "Database reactivation + SMS & email marketing",
    ],
    note: "Includes one campaign per month to existing opted-in contacts. SMS and email usage charged separately.",
  },
];

export const websitePlanExtras = [
  "Mobile-friendly design",
  "Hosting + SSL",
  "Contact forms",
  "Basic on-site SEO",
];

export const websiteYearlyBonus =
  "Yearly bonus: buy any yearly website plan and get 2 free months of organic social media management (2 posts per week across Facebook, Instagram and Google Business Profile; you supply the raw images).";

/** @deprecated Use reputationPackages — kept as alias for existing imports */
export const packages = [
  {
    name: "Starter",
    price: "$1,490 / year",
    priceAlt: "or $149/month",
    recommended: false,
    blurb: "Up to 50 review requests",
    body: "For smaller operators who want a steady flow of reviews without the admin chase.",
    outcomes: [
      "Up to 50 review requests",
      "Automatic review requests",
      "AI smart messaging",
      "Review replies + social sharing",
      "CRM / Zapier connection",
    ],
    note: "",
  },
  {
    name: "Growth",
    price: "$2,490 / year",
    priceAlt: "or $249/month",
    recommended: true,
    blurb: "Up to 100 review requests",
    body: "For growing businesses that want more customer feedback and a stronger Google reputation.",
    outcomes: [
      "Up to 100 review requests",
      "Automatic review requests",
      "AI smart messaging",
      "Review replies + social sharing",
      "CRM / Zapier connection",
    ],
    note: "",
  },
  {
    name: "Scale",
    price: "$3,890 / year",
    priceAlt: "or $389/month",
    recommended: false,
    blurb: "Up to 300 review requests",
    body: "For higher-volume businesses that need a review system to match a busy customer base.",
    outcomes: [
      "Up to 300 review requests",
      "Automatic review requests",
      "AI smart messaging",
      "Review replies + social sharing",
      "CRM / Zapier connection",
    ],
    note: "",
  },
];

export const reputationPackages = packages;

export const reputationIncludes = [
  {
    title: "Automatic review requests",
    body: "Text and email requests, reactivation of past customers, and dynamic follow-ups.",
  },
  {
    title: "Smarter customer messages",
    body: "AI smart messaging and personalised image requests.",
  },
  {
    title: "Review replies + sharing",
    body: "Automatic AI review replies and social media review posting.",
  },
  {
    title: "Connected to your workflow",
    body: "Custom CRM integration, Zapier access, and unlimited users.",
  },
];

export const socialMediaAddon = {
  name: "Organic Social Media Management",
  price: "$1,490 AUD / year",
  priceAlt: "or $149/month",
  blurb: "2 posts per week",
  body: "Stay active on Facebook, Instagram and Google Business Profile when you do not have time to post yourself.",
  outcomes: [
    "2 posts per week across Facebook, Instagram and Google Business Profile",
    "Custom designs and static posts from raw images you supply",
    "SEO-focused captions with product, service and location terms",
    "Content that showcases products, projects, offers and updates",
  ],
  note: "You supply the raw images. We handle design, captions and publishing. Annual payment upfront saves 2 months.",
};

export const faqs = [
  {
    q: "Do I need a new website or can you improve my current one?",
    a: "Either. If your current site is usable, we can improve the structure, calls-to-action, tracking, and Google connection. If it is outdated or hard to work with, a rebuild may be cleaner.",
  },
  {
    q: "Can you help with Google Business Profile?",
    a: "Yes. We can help clean up the profile, connect the website, improve services, photos, descriptions, and review flow.",
  },
  {
    q: "Can you track how many leads my website creates?",
    a: "We can set up basic tracking for forms, call clicks, quote buttons, and key website actions so you can see what is creating enquiries.",
  },
  {
    q: "Do you run Google Ads?",
    a: "The focus is websites, Google presence, tracking, and lead systems first. Paid ads can be considered once the website and follow-up system are working properly.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "Tradies, gardeners, landscapers, cleaners, clinics, home service businesses, and local professional services.",
  },
  {
    q: "How quickly can a website be built?",
    a: "A simple site can usually be built quickly once the content, services, photos, and business details are ready.",
  },
];

export const problemItems = [
  "Your website looks dated or does not explain what you do clearly",
  "Your phone number and quote buttons are not obvious on mobile",
  "Your Google Business Profile and website are not working together",
  "You do not know which clicks, calls, or forms are creating enquiries",
  "Missed calls and slow follow-ups turn hot leads cold",
  "You are busy on the tools and do not want to manage marketing after hours",
];

export const howItWorks = [
  {
    title: "Diagnose",
    body: "We review your website, Google presence, competitors, calls-to-action, and lead flow.",
  },
  {
    title: "Build",
    body: "We create or improve your website, contact paths, service pages, and quote request flow.",
  },
  {
    title: "Track",
    body: "We set up basic tracking for calls, forms, quote buttons, and important lead actions.",
  },
  {
    title: "Improve",
    body: "Each month, we review what is working and make practical improvements.",
  },
];

export const leadFlowSteps = [
  { label: "Found on Google", sub: "Customer finds you on Google" },
  { label: "Contact", sub: "They call or request a quote" },
  { label: "Tracked", sub: "The lead is tracked" },
  { label: "Follow-up", sub: "Missed enquiries get followed up" },
  { label: "Clarity", sub: "You know what is working" },
];

export const trustPoints = [
  "Plain-English advice",
  "Built for mobile visitors first",
  "Phone-call and quote-request focused",
  "Local SEO basics included",
  "Clear monthly support options",
  "No bloated agency process",
];

export const leadRecoveryItems = [
  "Instant reply when a call is missed",
  "Simple quote request follow-up",
  "Enquiries organised in one place",
  "Review requests after completed jobs",
  "Less manual admin",
];

export const testimonials = [
  {
    quote:
      "Absolutely would recommend this business to anyone of any business scale to get their site designed by Hugh. The design turned out great, and the communication was solid — thanks again for what you've done for my site!",
  },
  {
    quote:
      "Great attention to detail and thank you for bringing my creative vision alive, great work!",
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  headline: string;
  summary: string;
  body: string;
  metrics: { value: string; label: string }[];
  note?: string;
  relatedService?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "unity-barbershop",
    client: "Unity Barbershop",
    category: "Google Reputation Management",
    headline: "63 Google reviews in the first month",
    summary:
      "In his first month with Screwdriver Marketing, the owner of Unity Barbershop received 63 Google reviews — and booking-page link clicks rose 25%.",
    body: "For a busy business owner, asking for reviews can become another job on the list. Reputation management makes that process part of the customer journey, with review requests and follow-ups that keep it moving. Alongside the 63 Google reviews received in the first month, Unity Barbershop reported a 25% increase in link clicks to its booking page.",
    metrics: [
      { value: "63", label: "Google reviews" },
      { value: "1", label: "Month" },
      { value: "+25%", label: "Booking-page link clicks" },
    ],
    note: "Results supplied by Screwdriver Marketing; review total attributed to the business owner.",
    relatedService: "reputation-management",
  },
  {
    slug: "water-to-waste",
    client: "Water to Waste Plumbing & Gas Solutions",
    category: "Plumbing + Gas",
    headline: "More ways for local customers to get in touch",
    summary:
      "In its first three months with Screwdriver Marketing, this plumbing business recorded 24 call actions and 43 website clicks through its Google Business Profile.",
    body: "Customers used the Google profile to take the next step: tapping to call the business or clicking through to its website. These actions show people moving beyond finding the listing and choosing to engage with the business — a clearer path from search to enquiry.",
    metrics: [
      { value: "24", label: "Call actions from Google" },
      { value: "43", label: "Clicks through to the website" },
      { value: "3", label: "Months" },
    ],
    note: "Source: Google Business Profile charts, August–October 2026. Call actions are not confirmed connected calls or jobs, and website clicks are not unique visitors.",
    relatedService: "web-design",
  },
  {
    slug: "green-theory",
    client: "Green Theory Turf & Garden Care",
    category: "Website + Google Business Profile",
    headline: "A clearer path from Google search to enquiry",
    summary:
      "We helped a local Adelaide gardening business create a professional website and connect it with their Google Business Profile.",
    body: "Early profile data showed website clicks and phone calls after setup, creating a clearer path from Google search to enquiry for a local Adelaide gardening business.",
    metrics: [
      { value: "Web", label: "Professional website" },
      { value: "GBP", label: "Profile connected" },
      { value: "Local", label: "Adelaide garden care" },
    ],
    relatedService: "web-design",
  },
];

export const caseStudy = caseStudies[2];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
