export type HqAppStatus = 'live' | 'building' | 'planned';

export type HqAppItem = {
  title: string;
  eyebrow: string;
  status: HqAppStatus;
  description: string;
  linkLabel?: string;
  href?: string;
};

export type HqApp = {
  slug: string;
  route: string;
  fileLabel: string;
  navDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  intent: string;
  items: HqAppItem[];
};

export const hqApps: HqApp[] = [
  {
    slug: 'projects',
    route: '/projects',
    fileLabel: 'projects.app',
    navDescription: 'Work and ventures',
    eyebrow: 'Work surface',
    title: 'Projects, products, and ventures in one command center.',
    lede:
      'A curated map of shipped work, active builds, agency services, product experiments, and private-label ventures.',
    intent:
      'This app should prove range: client delivery, product thinking, code, systems, and the ability to turn ideas into market-facing assets.',
    items: [
      {
        title: 'Sprooutflow',
        eyebrow: 'Agency',
        status: 'building',
        description:
          'The web agency surface for client sites, automations, digital systems, and growth-focused build work.',
      },
      {
        title: 'Resume report and generation tool',
        eyebrow: 'Product',
        status: 'building',
        description:
          'A free resume audit and generation workflow that can become a lead magnet, product demo, and proof of AI workflow design.',
      },
      {
        title: 'E-commerce venture lab',
        eyebrow: 'Venture',
        status: 'planned',
        description:
          'Three private-label store concepts with products selected. Keep them visibly part of the founder portfolio while letting each brand stand on its own.',
      },
    ],
  },
  {
    slug: 'writing',
    route: '/writing',
    fileLabel: 'writing.app',
    navDescription: 'Blogs and posts',
    eyebrow: 'Thinking log',
    title: 'Blogs, field notes, Reddit-style posts, and build logs.',
    lede:
      'A home for public thinking that does not need to fit LinkedIn, GitHub, or a traditional portfolio case study.',
    intent:
      'Writing should make the HQ feel alive: what you are learning, what you are building, and what you believe about work, AI, commerce, and software.',
    items: [
      {
        title: 'Build logs',
        eyebrow: 'Series',
        status: 'building',
        description:
          'Short updates that explain what changed, why it matters, and what comes next across Personal HQ and adjacent products.',
      },
      {
        title: 'AI coaching notes',
        eyebrow: 'Coming soon',
        status: 'planned',
        description:
          'Practical coaching content around using AI for execution, writing, career materials, agency operations, and product building.',
      },
      {
        title: 'Long-form essays',
        eyebrow: 'Blog',
        status: 'planned',
        description:
          'Deeper posts for lessons that deserve more than a social caption or README note.',
      },
    ],
  },
  {
    slug: 'gallery',
    route: '/gallery',
    fileLabel: 'gallery.app',
    navDescription: 'Visual archive',
    eyebrow: 'Visual system',
    title: 'Screens, product photos, experiments, and visual proof.',
    lede:
      'A gallery for UI explorations, product snapshots, launch assets, and the visual side of the work.',
    intent:
      'This app should show taste and momentum without bloating the repo. Production-ready assets can be added intentionally when they matter.',
    items: [
      {
        title: 'UI update archive',
        eyebrow: 'Design',
        status: 'building',
        description:
          'Selected screenshots from the OS interface as it matures. Local review dumps stay out of source control.',
      },
      {
        title: 'Product photography queue',
        eyebrow: 'E-commerce',
        status: 'planned',
        description:
          'A future place to preview product visuals once the store brands have finished photo direction.',
      },
      {
        title: 'Launch assets',
        eyebrow: 'Marketing',
        status: 'planned',
        description:
          'Reusable graphics, mockups, social cards, and campaign visuals for the HQ ecosystem.',
      },
    ],
  },
  {
    slug: 'tools',
    route: '/tools',
    fileLabel: 'tools.app',
    navDescription: 'Tech radar',
    eyebrow: 'Tech radar',
    title: 'Tools, frameworks, AI systems, and products worth tracking.',
    lede:
      'A public shelf for what you are watching, testing, using, or planning to fold into future builds.',
    intent:
      'The tools app should make your technical taste visible: not just what you know, but what you are paying attention to.',
    items: [
      {
        title: 'AI workflow stack',
        eyebrow: 'AI',
        status: 'building',
        description:
          'Prompts, agents, automations, model workflows, and coaching patterns that can support Sprooutflow and the resume product.',
      },
      {
        title: 'Frontend systems',
        eyebrow: 'Code',
        status: 'building',
        description:
          'React, routing, design systems, testing harnesses, and OS-style interface patterns used across the HQ.',
      },
      {
        title: 'Commerce operations',
        eyebrow: 'Stores',
        status: 'planned',
        description:
          'Tools for storefronts, product photos, analytics, fulfillment decisions, and conversion testing.',
      },
    ],
  },
  {
    slug: 'about',
    route: '/about',
    fileLabel: 'about.sys',
    navDescription: 'Resume and links',
    eyebrow: 'Identity layer',
    title: 'The connective tissue between the person, the work, and the ventures.',
    lede:
      'Resume, contact paths, social channels, personal story, current focus, and the best ways to understand the larger ecosystem.',
    intent:
      'About should be more than a bio. It should orient visitors around what you do, what you are building, and where each external platform fits.',
    items: [
      {
        title: 'Resume and work history',
        eyebrow: 'Career',
        status: 'building',
        description:
          'A readable career surface that complements LinkedIn without copying it.',
      },
      {
        title: 'Social graph',
        eyebrow: 'Links',
        status: 'planned',
        description:
          'GitHub for code, LinkedIn for career context, Instagram for visual/social presence, Reddit for posts and community participation.',
      },
      {
        title: 'Current focus',
        eyebrow: 'Now',
        status: 'building',
        description:
          'Personal HQ, Sprooutflow, the resume product, AI coaching, and e-commerce venture setup.',
      },
    ],
  },
];

export function getHqApp(slug: string) {
  return hqApps.find((app) => app.slug === slug);
}
