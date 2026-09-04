/* =====================================================================
   PASSQUEST BLOG — central config
   One place for URLs, nav, categories, author defaults, social links.
   ===================================================================== */

export const SITE = {
  name: 'PassQuest Blog',
  /* Used in <title> suffix and structured data */
  title: 'PassQuest Blog',
  description:
    'IELTS guides, band-score strategies, scholarship deadlines and relocation news — from the team behind the PassQuest app.',
  /* Production origin — must match astro.config.mjs `site` */
  url: 'https://blog.passquest.app',
  /* Marketing site (GoHighLevel) */
  mainSite: 'https://passquest.app',
  playStore:
    'https://play.google.com/store/apps/details?id=com.passquest.app',
  locale: 'en',
  /* Publisher block for JSON-LD */
  publisher: {
    name: 'PassQuest',
    legalName: 'OneDoc AI LLC',
    logo: 'https://blog.passquest.app/images/passquest-logo-512.png',
  },
  /* Default OG image when a post has no hero (1200x630) */
  defaultOgImage: '/images/og-default.jpg',
} as const;

/* Primary nav — points back to the marketing site, plus the blog itself */
export const NAV_LINKS = [
  { label: 'Features', href: `${SITE.mainSite}/#features` },
  { label: 'Exams', href: `${SITE.mainSite}/#exams` },
  { label: 'Pricing', href: `${SITE.mainSite}/#pricing` },
  { label: 'Blog', href: '/' },
] as const;

export const FOOTER_LINKS = [
  { label: 'Home', href: `${SITE.mainSite}/` },
  { label: 'Blog', href: '/' },
  { label: 'Privacy', href: `${SITE.mainSite}/privacy/` },
  { label: 'Terms', href: `${SITE.mainSite}/terms/` },
  { label: 'Disclaimer', href: `${SITE.mainSite}/disclaimer/` },
  { label: 'Contact', href: 'mailto:support@passquest.app' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@passquest.app' },
  { label: 'Instagram', href: 'https://www.instagram.com/passquest.app' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/passquestapp/' },
  { label: 'X', href: 'https://x.com/passquestapp' },
  { label: 'YouTube', href: 'https://www.youtube.com/@passquest' },
] as const;

/* Blog categories. `slug` is the URL + the value writers put in frontmatter
   (`category: japa`). `name` is the display label.

   CELPIP/SAT/GRE/TOEFL are intentionally not live categories yet — PassQuest
   only supports IELTS today, and a browsable category with zero (or
   near-zero) posts is thin content that actively hurts SEO. "Comparisons"
   stays: "IELTS vs CELPIP"-style posts are high-intent search/AEO content
   even though CELPIP itself has no dedicated section. Re-add an exam here
   the day the app (and the content plan) actually supports it. */
export const CATEGORIES = [
  { slug: 'ielts', name: 'IELTS', blurb: 'Band scores, question types and study plans for IELTS Academic and General Training.' },
  { slug: 'comparisons', name: 'Comparisons', blurb: 'Head-to-head breakdowns to help you pick the right exam.' },
  { slug: 'scholarships', name: 'Scholarships', blurb: 'Funding, eligibility and deadlines for study abroad.' },
  { slug: 'japa', name: 'Japa / Relocation', blurb: 'Visa routes, PR pathways and the real cost of moving abroad.' },
  { slug: 'exam-news', name: 'Exam News', blurb: 'Test-date, format and fee changes as they happen.' },
  { slug: 'travel', name: 'Travel Updates', blurb: 'Visa, border and airline news that affects students.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/* Author registry. Frontmatter `author: passquest-team` resolves here. */
export const AUTHORS: Record<
  string,
  { name: string; role: string; bio: string; avatar: string; url?: string }
> = {
  'passquest-team': {
    name: 'PassQuest Team',
    role: 'Exam prep, PassQuest',
    bio: 'The people building PassQuest — an AI exam-prep app with a predictive live score that tells you when you are actually ready.',
    avatar: '/images/authors/passquest-team.svg',
    url: 'https://passquest.app',
  },
};

export function resolveAuthor(id: string) {
  return (
    AUTHORS[id] ?? {
      name: id,
      role: '',
      bio: '',
      avatar: '/images/authors/passquest-team.svg',
    }
  );
}
