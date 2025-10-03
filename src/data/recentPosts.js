export const RECENT_POSTS = [
  // 30 demo posts. Slugs roughly match categories when possible.
  {
    id: 1,
    slug: "is-python-good-for-software-development",
    title: "Is Python Good For Software Development?",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-10-10T09:00:00Z",
    bannerUrl: "https://picsum.photos/id/120/800/500",
    excerpt:
      "Yes. Python is good for software development. It became one of the most widely used languages in recent years."
  },
  {
    id: 2,
    slug: "partnering-with-software-outsourcing-company",
    title:
      "10 Powerful Benefits Of Partnering With A Software Development Outsourcing Company In 2025",
    category: "Software Development",
    author: "Desk–18",
    dateISO: "2025-04-08T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/121/800/500",
    excerpt:
      "The outsourcing industry has expanded significantly and shows no sign of slowing down."
  },
  {
    id: 3,
    slug: "top-20-fintech-software-development-companies-2025",
    title: "Top 20 Fintech Software Development Companies (2025)",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-05-30T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/122/800/500",
    excerpt:
      "Fintech development is about building secure systems tailored to the industry."
  },
  {
    id: 4,
    slug: "custom-software-development-company-bangladesh",
    title: "Custom Software Development Company In Bangladesh",
    category: "Software Development",
    author: "Desk–18",
    dateISO: "2025-08-25T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/123/800/500",
    excerpt:
      "Explore custom solutions with flexible engagement models and strong delivery."
  },
  {
    id: 5,
    slug: "what-is-the-software-development-life-cycle-sdlc",
    title: "What Is The Software Development Life Cycle? (SDLC)",
    category: "Software Development",
    author: "Desk–18",
    dateISO: "2025-08-25T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/124/800/500",
    excerpt:
      "Software development isn’t just coding. It demands precision from discovery to deployment."
  },
  {
    id: 6,
    slug: "sdlc-vs-agile-development-key-differences",
    title: "SDLC Vs. Agile Development",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-08-25T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/125/800/500",
    excerpt:
      "Data breaches and unauthorized access are daily concerns. Agile helps teams adapt quickly."
  },
  {
    id: 7,
    slug: "top-20-ecommerce-software-development-companies-usa-2025",
    title: "Top 20 Ecommerce Software Development Companies In USA (2025)",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-10-10T09:00:00Z",
    bannerUrl: "https://picsum.photos/id/126/800/500",
    excerpt:
      "Healthcare & ecommerce software demand reliability, performance, and security."
  },
  {
    id: 8,
    slug: "why-devops-recommends-shift-left-testing-principles",
    title: "Why Does DevOps Recommend Shift Left Testing Principles",
    category: "Software Development",
    author: "Soft–BD",
    dateISO: "2025-04-08T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/127/800/500",
    excerpt:
      "Shift-left testing reduces risk by catching defects early with faster feedback."
  },
  {
    id: 9,
    slug: "end-to-end-testing-vs-integration-testing",
    title:
      "End To End Testing Vs Integration Testing: The Key Differences",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-05-30T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/128/800/500",
    excerpt:
      "E2E safeguards against regressions; integration testing validates module interactions."
  },
  {
    id: 10,
    slug: "top-20-healthcare-software-development-companies-usa-2025",
    title:
      "Top 20 Healthcare Software Development Companies In USA (2025)",
    category: "Software Development",
    author: "Deshi–BD",
    dateISO: "2025-05-30T10:00:00Z",
    bannerUrl: "https://picsum.photos/id/129/800/500",
    excerpt:
      "Choosing the right healthcare engineering partner is critical for compliance and outcomes."
  },
  // 20 more (IDs 11..30)
  ...Array.from({ length: 20 }).map((_, i) => {
    const id = 11 + i;
    return {
      id,
      slug: `sample-post-${id}`,
      title: `Sample Recent Blog #${id}`,
      category: "Software Development",
      author: id % 2 ? "Desk–18" : "Deshi–BD",
      dateISO: new Date(2025, (i % 12), (i % 28) + 1).toISOString(),
      bannerUrl: `https://picsum.photos/id/${130 + i}/800/500`,
      excerpt:
        "This is a placeholder recent blog used to complete the grid and pagination demo."
    };
  })
];