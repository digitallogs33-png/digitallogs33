import { Product, Category, SiteSettings, BlogPost, FAQItem, Order } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'Digital Logs',
  whatsappNumber: '+880 1962-061283',
  whatsappFormatted: '8801962061283',
  telegramUrl: 'https://t.me/+AtxhkhvtjAYzM2Y1',
  telegramHandle: '@DigitalLogsOfficial',
  bankName: 'Payrep MFB',
  bankAccountNumber: '2091223616',
  bankAccountName: 'DIVINE ELOZINO MICHAEL',
  paymentReferenceId: '1082058717',
  usdExchangeRate: 1450,
  announcementText: '⚡ Instant activation & fast manual bank verification via Payrep MFB. 24/7 WhatsApp & Telegram support available!',
  supportEmail: 'support@digitallogs.net'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-fb-marketing',
    name: 'Facebook Marketing',
    slug: 'facebook-marketing',
    description: 'Targeted organic reach, business page configuration, and campaign growth packages.',
    iconName: 'Share2'
  },
  {
    id: 'cat-tiktok-marketing',
    name: 'TikTok Marketing',
    slug: 'tiktok-marketing',
    description: 'Algorithmic content strategy, sound optimization, and creator profile enhancements.',
    iconName: 'Flame'
  },
  {
    id: 'cat-instagram-marketing',
    name: 'Instagram Marketing',
    slug: 'instagram-marketing',
    description: 'Aesthetic layout direction, reels distribution blueprints, and targeted audience outreach.',
    iconName: 'Camera'
  },
  {
    id: 'cat-vpn',
    name: 'VPN Subscriptions',
    slug: 'vpn-subscriptions',
    description: 'Authorized high-speed secure VPN access vouchers for seamless online privacy and encryption.',
    iconName: 'Shield'
  },
  {
    id: 'cat-privacy',
    name: 'Digital Privacy Tools',
    slug: 'digital-privacy-tools',
    description: 'Ad-blocking suites, encrypted communications, and anti-fingerprinting software keys.',
    iconName: 'Lock'
  },
  {
    id: 'cat-ai-tools',
    name: 'AI Tools & Subscriptions',
    slug: 'ai-tools',
    description: 'Authorized access to premier generative text, design, and coding intelligence suites.',
    iconName: 'Cpu'
  },
  {
    id: 'cat-meta-services',
    name: 'Meta Business Services',
    slug: 'meta-business-services',
    description: 'Legitimate Facebook page establishment, Business Manager structuring, and Meta Ads audit.',
    iconName: 'Briefcase'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Facebook Marketing Packages (Master service with package tiers)
  {
    id: 'prod-fb-packages',
    title: 'Facebook Marketing & Reach Acceleration Packages',
    slug: 'facebook-marketing-packages',
    category: 'Facebook Marketing',
    subCategory: 'Organic Growth & Outreach',
    shortDescription: 'Professional campaign setups, audience targeting, and content reach strategies tailored to scale legitimate Facebook page engagement.',
    description: 'Scale your brand on Meta with honest, terms-compliant marketing strategies. Digital Logs provides structured social media marketing packages designed to optimize your organic discovery, configure custom audience parameters, design high-converting content cadences, and execute targeted outreach to genuine prospective customers.',
    priceNGN: 1500,
    duration: 'Tier-based Delivery (1-7 Days)',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Managed Digital Marketing Service',
    deliveryMethod: 'Strategy Brief + Campaign Implementation Report',
    requirementsNote: 'Provide your public Facebook page link and business niche. We NEVER ask for passwords.',
    features: [
      'Niche audience segmentation and interest mapping',
      'High-CTR content hook recommendations',
      'Meta Business Suite campaign staging',
      'Performance reporting & optimization guide',
      '100% platform terms compliant, genuine outreach'
    ],
    packages: [
      {
        id: 'fb-entry',
        name: 'Entry Package',
        priceNGN: 1500,
        duration: '24-48 Hours',
        description: 'Page health audit, bio & CTA overhaul, initial niche organic reach recommendations.',
        deliverables: ['Page Audit PDF', 'Bio Optimization', '5 Custom Hashtag Clusters']
      },
      {
        id: 'fb-standard',
        name: 'Standard Package',
        priceNGN: 2500,
        duration: '48 Hours',
        description: 'Content calendar roadmap (14 days) and high-engagement post layout suggestions.',
        deliverables: ['14-Day Content Grid', 'Post Templates', 'Optimal Posting Schedule']
      },
      {
        id: 'fb-growth',
        name: 'Growth Package',
        priceNGN: 3500,
        duration: '3 Days',
        description: 'Targeted custom audience curation blueprint and organic group distribution guide.',
        deliverables: ['Custom Audience File Schema', 'Niche Group Outreach Blueprint']
      },
      {
        id: 'fb-advanced',
        name: 'Advanced Package',
        priceNGN: 5500,
        duration: '4 Days',
        description: 'Complete page rebranding strategy with carousel copy drafts and engagement funnel.',
        deliverables: ['3 Rebranding Assets Brief', 'Lead Magnet Funnel Blueprint', 'Engagement Guidelines']
      },
      {
        id: 'fb-professional',
        name: 'Professional Package',
        priceNGN: 6500,
        duration: '5 Days',
        description: 'Meta Business Suite staging, automated messenger quick-replies, and organic funnel setup.',
        deliverables: ['Messenger Automation Setup', 'Meta Catalog Guidance', 'Audience Retargeting Framework']
      },
      {
        id: 'fb-business',
        name: 'Business Package',
        priceNGN: 7500,
        duration: '5 Days',
        description: 'Targeted paid & organic hybrid strategy with A/B creative testing configurations.',
        deliverables: ['2 Ad Set Drafts', 'A/B Testing Matrix', 'Creative Briefs']
      },
      {
        id: 'fb-premium',
        name: 'Premium Package',
        priceNGN: 8500,
        duration: '7 Days',
        description: 'Full-spectrum page acceleration with competitor gap analysis and viral post triggers.',
        deliverables: ['Competitor Benchmark Audit', 'Video Hook Frameworks', 'Bi-weekly Check-in']
      },
      {
        id: 'fb-5k-tier',
        name: '5K-Tier Scaling Package',
        priceNGN: 10000,
        duration: '7-10 Days',
        description: 'Comprehensive high-volume audience expansion campaign to sustainably scale page reach.',
        deliverables: ['Omnichannel Funnel Integration', 'High-Volume Retargeting List', 'Dedicated Account Manager']
      },
      {
        id: 'fb-10k-tier',
        name: '10K-Tier Enterprise Package',
        priceNGN: 20000,
        duration: '14 Days',
        description: 'Enterprise brand scaling protocol with multi-angle creative blueprints and performance analytics.',
        deliverables: ['Enterprise Strategy Deck', 'Conversion API Audit', 'Priority Telegram Direct Line']
      }
    ]
  },

  // 2. TikTok Marketing Packages
  {
    id: 'prod-tiktok-packages',
    title: 'TikTok Content & Algorithm Optimization Packages',
    slug: 'tiktok-marketing-packages',
    category: 'TikTok Marketing',
    subCategory: 'Short-Form Video Strategy',
    shortDescription: 'Algorithm hook strategies, trending audio positioning, and niche profile styling to accelerate TikTok discovery.',
    description: 'Conquer the FYP with strategic, high-retention content architecture. Our TikTok marketing packages focus on authentic viewer retention metrics: high-curiosity video hooks, hashtag cluster curation, sound licensing compliance, and profile link conversion optimization.',
    priceNGN: 1500,
    duration: '24-72 Hours',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Managed Digital Marketing Service',
    deliveryMethod: 'Strategy Document + Script Vault',
    requirementsNote: 'Public TikTok username only. No sensitive logins required.',
    features: [
      'FYP retention hook formulations for first 3 seconds',
      'Niche sound selection for algorithmic amplification',
      'Bio & Linktree conversion restructuring',
      'Organic engagement protocol'
    ],
    packages: [
      {
        id: 'tiktok-entry',
        name: 'Entry Package',
        priceNGN: 1500,
        duration: '24 Hours',
        description: 'Profile bio overhaul, aesthetic link placement, and initial 10-tag viral keyword cluster.',
        deliverables: ['Profile Audit Checklist', '10 Targeted Hashtags', 'Hook Formulas']
      },
      {
        id: 'tiktok-standard',
        name: 'Standard Package',
        priceNGN: 2500,
        duration: '48 Hours',
        description: 'Trending sound analysis and 5 custom short-form video scripting frameworks.',
        deliverables: ['5 Video Script Outlines', 'Sound Matrix', 'Watch-Time Retention Guide']
      },
      {
        id: 'tiktok-growth',
        name: 'Growth Package',
        priceNGN: 3500,
        duration: '72 Hours',
        description: 'Full TikTok Ads Manager setup guidance and creator collaboration outreach kit.',
        deliverables: ['TikTok Spark Ads Setup Guide', 'Creator DM Pitch Scripts', 'Analytics Tracker']
      }
    ]
  },

  // 3. Instagram Marketing Packages
  {
    id: 'prod-instagram-packages',
    title: 'Instagram Aesthetic & Engagement Growth Packages',
    slug: 'instagram-marketing-packages',
    category: 'Instagram Marketing',
    subCategory: 'Visual Branding & Reels',
    shortDescription: 'Curated feed architecture, Reels retention blueprints, and targeted creator outreach frameworks.',
    description: 'Transform your Instagram presence into a cohesive, high-trust storefront. We deliver actionable visual frameworks, highlight cover guidelines, Reels timing sequences, and story interaction workflows designed to cultivate genuine follower loyalty and customer conversion.',
    priceNGN: 1500,
    duration: '24-72 Hours',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Managed Digital Marketing Service',
    deliveryMethod: 'Digital Delivery to WhatsApp / Email',
    requirementsNote: 'Provide public Instagram handle only.',
    features: [
      'Reels audio timing and cover thumbnail aesthetics',
      'Story interactive sticker strategy for DM conversion',
      'Hashtag layering (broad, medium, micro-niche)',
      'Collaboration outreach templates'
    ],
    packages: [
      {
        id: 'ig-entry',
        name: 'Entry Package',
        priceNGN: 1500,
        duration: '24 Hours',
        description: 'Bio restructuring, profile branding review, and story highlight icon guidelines.',
        deliverables: ['Bio Copy Variations', 'Highlight Category Map', 'Aesthetic Grid Guide']
      },
      {
        id: 'ig-standard',
        name: 'Standard Package',
        priceNGN: 2500,
        duration: '48 Hours',
        description: 'Reels content sequence (7 concepts) with visual retention cues and viral audio links.',
        deliverables: ['7 Reels Storyboards', 'Trending Audio Tracker', 'Caption Templates']
      },
      {
        id: 'ig-growth',
        name: 'Growth Package',
        priceNGN: 3500,
        duration: '72 Hours',
        description: 'Full brand collaboration pitch deck and automated DM keyword responder setup guide.',
        deliverables: ['Creator Outreach Kit', 'DM Funnel Blueprint', 'Engagement Tracking Sheet']
      }
    ]
  },

  // 4. VPN Subscriptions (Authorized individual vouchers)
  {
    id: 'prod-vpn-hma',
    title: 'HMA VPN Authorized Access Voucher — 30 Days',
    slug: 'hma-vpn-30-days',
    category: 'VPN Subscriptions',
    subCategory: 'High-Speed Anonymity',
    shortDescription: 'Authorized 30-day single user license key. Worldwide server locations with lightning-fast speeds and strict zero-logging.',
    description: 'Official 30-day access voucher for HideMyAss (HMA) VPN. Features military-grade 256-bit AES encryption, IP shuffling, automated kill-switch, and servers across 190+ countries. Ideal for streaming, secure remote work, and bypassing regional network throttling.',
    priceNGN: 4000,
    duration: '30 Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Official License Activation Voucher',
    deliveryMethod: 'Direct Digital Code via Email & WhatsApp (Within 10-30 Mins)',
    requirementsNote: 'Email address where your activation voucher key and instructions will be sent.',
    features: [
      'Servers in 290+ locations across 190+ countries',
      'Lightning-fast 20 Gbps server network',
      'Certified zero-logs verified by independent audit',
      'IP Shuffle feature for maximum tracking prevention',
      'Supports Windows, macOS, Android, and iOS'
    ]
  },
  {
    id: 'prod-vpn-express',
    title: 'ExpressVPN Authorized Access Voucher — 30 Days',
    slug: 'expressvpn-30-days',
    category: 'VPN Subscriptions',
    subCategory: 'Premium Privacy',
    shortDescription: 'Ultra-reliable 30-day activation voucher. Proprietary Lightway protocol for unmatched stability and streaming speeds.',
    description: 'Get verified 30-day access to ExpressVPN, the industry benchmark for speed and privacy. Powered by TrustedServer technology where servers run purely on RAM, ensuring data is never written to a hard drive.',
    priceNGN: 4000,
    duration: '30 Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Authorized Sub-Seat Voucher',
    deliveryMethod: 'Activation Credentials / Setup Guide',
    requirementsNote: 'Valid email address required.',
    features: [
      'Proprietary Lightway protocol for instantaneous connections',
      'RAM-only TrustedServer architecture',
      'Private DNS on every server',
      'Threat Manager built-in ad and tracker blocker',
      '24/7 priority support'
    ]
  },
  {
    id: 'prod-vpn-surfshark',
    title: 'Surfshark One Authorized Voucher — 30 Days',
    slug: 'surfshark-vpn-30-days',
    category: 'VPN Subscriptions',
    subCategory: 'All-in-One Protection',
    shortDescription: 'CleanWeb ad-blocker, MultiHop server routing, and unlimited device capability under one authorized 30-day subscription.',
    description: 'Experience total online peace of mind with Surfshark 30-Day access. Includes CleanWeb 2.0 to eliminate pop-ups and malware before they reach your browser, alongside camouflage mode that prevents internet providers from knowing you use a VPN.',
    priceNGN: 4000,
    duration: '30 Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Authorized Subscription Voucher',
    deliveryMethod: 'Instant Key / User Portal Invite',
    requirementsNote: 'Delivered directly to your checkout email.',
    features: [
      'CleanWeb 2.0 ad & malware blocker',
      'MultiHop double-VPN routing',
      'Bypasser split tunneling',
      'Strict audited no-logs policy',
      'Smooth streaming for global platforms'
    ]
  },
  {
    id: 'prod-vpn-nord',
    title: 'NordVPN Threat Protection Voucher — 30 Days',
    slug: 'nordvpn-30-days',
    category: 'VPN Subscriptions',
    subCategory: 'Cybersecurity Suite',
    shortDescription: 'NordLynx high-speed protocol with advanced threat protection against phishing links and intrusive trackers.',
    description: 'NordVPN 30-day legitimate access voucher. Benefit from NordLynx protocol built around WireGuard for blazing speeds, plus Dark Web Monitor which notifies you if your credentials appear in compromised databases.',
    priceNGN: 4000,
    duration: '30 Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Authorized License Key',
    deliveryMethod: 'Secure Digital Email Dispatch',
    requirementsNote: 'Active email address required for voucher dispatch.',
    features: [
      'NordLynx revolutionary speed protocol',
      'Integrated Threat Protection Pro',
      'Double VPN encryption layer',
      'Dark Web credential exposure alerts',
      'Cross-platform compatibility'
    ]
  },
  {
    id: 'prod-vpn-pia',
    title: 'Private Internet Access (PIA) — 7 Days Express Pass',
    slug: 'pia-vpn-7-days',
    category: 'VPN Subscriptions',
    subCategory: 'Short-Term Pass',
    shortDescription: 'Affordable 7-day high security pass. Proven open-source client with dedicated IP capabilities and zero log retention.',
    description: 'A 7-day authorized pass for Private Internet Access (PIA). Perfect for travelers, short-term research, remote events, or testing robust VPN speeds without a long-term commitment.',
    priceNGN: 2500,
    duration: '7 Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Short-Term Pass Voucher',
    deliveryMethod: 'Digital Voucher Code via WhatsApp/Email',
    requirementsNote: 'Provide email or WhatsApp number.',
    features: [
      '10+ years of court-tested zero-log commitment',
      '100% open-source desktop and mobile applications',
      'Advanced split-tunneling controls',
      'WireGuard and OpenVPN protocols'
    ]
  },
  {
    id: 'prod-vpn-ipvanish',
    title: 'IPVanish High-Bandwidth Pass — 7 Days',
    slug: 'ipvanish-7-days',
    category: 'VPN Subscriptions',
    subCategory: 'Short-Term Pass',
    shortDescription: 'Fast 7-day access pass with unlimited device connections and top-tier WireGuard performance for torrenting & gaming.',
    description: 'Official 7-day IPVanish subscription code. Offers unmetered device connections, low-latency gaming routing, and zero traffic logs.',
    priceNGN: 3500,
    duration: '7 Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Short-Term Pass Voucher',
    deliveryMethod: 'Digital Code Dispatch',
    requirementsNote: 'Email address for voucher issuance.',
    features: [
      'Unthrottled bandwidth speeds',
      'Zero traffic logs recorded',
      'Optimal routing for high-bandwidth tasks',
      'SOCKS5 proxy inclusion'
    ]
  },

  // 5. Facebook Legitimate Services (Compliant services replacing any prohibited account sales)
  {
    id: 'prod-fb-page-setup',
    title: 'Facebook Business Page & Portfolio Configuration',
    slug: 'facebook-business-page-portfolio-setup',
    category: 'Meta Business Services',
    subCategory: 'Business Architecture',
    shortDescription: 'Complete professional Facebook Page creation, Business Portfolio hierarchy structuring, and verified domain setup.',
    description: 'Build a solid, legitimate foundation on Meta. We handle everything from branded graphics placement, call-to-action buttons, customized URL generation, Business Manager setup, and linking your WhatsApp Business and Instagram accounts properly.',
    priceNGN: 5000,
    duration: '2-3 Business Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Professional Setup Service',
    deliveryMethod: 'Administrative Handover / Direct Walkthrough',
    requirementsNote: 'Provide business name, logo/brand assets, and your admin personal profile for asset assignment.',
    features: [
      'Meta Business Suite asset hierarchy configuration',
      'WhatsApp Business & Instagram cross-linking',
      'Custom vanity URL and action buttons',
      'Standard Operating Procedure PDF for ongoing management'
    ]
  },
  {
    id: 'prod-fb-ads-setup',
    title: 'Meta Ads Manager Campaign Setup & Creative Audit',
    slug: 'meta-ads-campaign-setup',
    category: 'Meta Business Services',
    subCategory: 'Paid Traffic Management',
    shortDescription: 'High-converting ad structure buildout, audience lookalike frameworks, and campaign testing roadmap.',
    description: 'Ensure your advertising budget yields maximum ROAS. We construct your campaign hierarchy (TOFU/MOFU/BOFU), set up cost controls, design audience testing splits, and write persuasive ad copy tailored to your target demographic.',
    priceNGN: 8000,
    duration: '3-4 Business Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Strategic Campaign Service',
    deliveryMethod: 'Staged Ads in Your Meta Ads Manager',
    requirementsNote: 'Partner access to your Meta Ad Account via Business Manager ID. We never touch payment billing details directly.',
    features: [
      '3-tier funnel campaign build (Cold / Warm / Hot)',
      '3 Variations of headline and primary text copy',
      'Custom audience and lookalike configuration',
      '7-day monitoring checklist & optimization guidelines'
    ]
  },
  {
    id: 'prod-fb-pixel-setup',
    title: 'Meta Pixel & Conversions API (CAPI) Integration',
    slug: 'meta-pixel-conversions-api-integration',
    category: 'Meta Business Services',
    subCategory: 'Technical Tracking',
    shortDescription: 'Server-side Conversions API integration to bypass iOS tracking restrictions and accurately measure ROAS.',
    description: 'In modern advertising, client-side browser cookies miss up to 35% of purchase events. We integrate both Meta Pixel and server-side Conversions API (CAPI) with event deduplication to ensure complete data accuracy.',
    priceNGN: 6000,
    duration: '1-2 Business Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    licenseType: 'Technical Integration Service',
    deliveryMethod: 'Implementation & Verification Report',
    requirementsNote: 'Website platform (Shopify, WordPress, Custom React/HTML) and Meta Pixel ID.',
    features: [
      'Complete event tracking (ViewContent, AddToCart, InitiateCheckout, Purchase)',
      'Event deduplication protocol setup',
      'Advanced matching parameter configuration',
      'Live test event validation'
    ]
  },

  // 6. AI Tools & Subscriptions
  {
    id: 'prod-ai-chatgpt',
    title: 'ChatGPT Plus Authorized Shared Team Seat — 30 Days',
    slug: 'chatgpt-plus-team-seat-30-days',
    category: 'AI Tools & Subscriptions',
    subCategory: 'Generative Intelligence',
    shortDescription: 'Official shared seat in a licensed ChatGPT Team workspace. Unlimited GPT-4o access, custom GPTs, and advanced voice.',
    description: 'Enjoy priority GPT-4o intelligence, Canvas interactive coding workspace, DALL-E image generation, and custom GPT integration without the full $20 USD international billing hurdles. Delivered via official Team workspace invitation to your email.',
    priceNGN: 6500,
    duration: '30 Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_ai_cloud_1792747624110.jpg',
    licenseType: 'Authorized Team Seat Invite',
    deliveryMethod: 'Email Workspace Invitation (Within 1 Hour)',
    requirementsNote: 'Provide the email address you wish to receive the official OpenAI Team seat invitation on.',
    features: [
      'Full GPT-4o, GPT-4 Turbo, and o1 preview model access',
      'Canvas collaborative workspace interface',
      'Advanced Data Analysis and code interpreter',
      'Custom GPT creation and deployment'
    ]
  },
  {
    id: 'prod-ai-claude',
    title: 'Claude Pro Workspace Member Seat — 30 Days',
    slug: 'claude-pro-workspace-seat-30-days',
    category: 'AI Tools & Subscriptions',
    subCategory: 'Coding & Analytical AI',
    shortDescription: 'Official member seat in an Anthropic Team workspace. Experience Claude 3.5 Sonnet, Projects knowledge bases, and 200K context window.',
    description: 'Access Anthropic Claude 3.5 Sonnet with 5x higher usage limits, Artifacts live interactive preview, and team Project folders. Ideal for software engineers, academic researchers, and legal analysts.',
    priceNGN: 7000,
    duration: '30 Days',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_ai_cloud_1792747624110.jpg',
    licenseType: 'Authorized Team Member Seat',
    deliveryMethod: 'Official Anthropic Email Invite',
    requirementsNote: 'Valid email address for Anthropic account connection.',
    features: [
      'Claude 3.5 Sonnet priority access',
      'Claude Artifacts real-time development UI',
      'Projects feature with custom knowledge bases',
      '200,000 token context window for massive documents'
    ]
  },
  {
    id: 'prod-ai-midjourney',
    title: 'Midjourney Pro Studio Shared Seat — 30 Days',
    slug: 'midjourney-pro-studio-seat-30-days',
    category: 'AI Tools & Subscriptions',
    subCategory: 'Image & Creative AI',
    shortDescription: 'Fast GPU generation hours, stealth mode capability, and high-resolution commercial upscaling in an authorized studio bot channel.',
    description: 'Produce photorealistic visual art and commercial branding assets. Gain direct access to Midjourney v6.1 generation in a private, high-speed Discord channel or Web Alpha portal seat with commercial usage rights.',
    priceNGN: 8500,
    duration: '30 Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_ai_cloud_1792747624110.jpg',
    licenseType: 'Authorized Studio Access Seat',
    deliveryMethod: 'Discord Channel Role / Web Alpha Access Link',
    requirementsNote: 'Discord username or email address.',
    features: [
      'Midjourney v6.1 and Niji v6 models',
      'Commercial usage license for all outputs',
      'High-speed generation with minimal queueing',
      'Vary (Region) and Inpainting support'
    ]
  },

  // 7. Digital Privacy Tools
  {
    id: 'prod-privacy-adguard',
    title: 'AdGuard Premium Privacy Suite — 1 Year License Key',
    slug: 'adguard-premium-1-year',
    category: 'Digital Privacy Tools',
    subCategory: 'Device Protection',
    shortDescription: 'Official 1-year license key for 3 devices. System-wide ad-blocking, tracking protection, and stealth browsing mode.',
    description: 'AdGuard Premium is the world standard for blocking intrusive ads and trackers across apps and browsers. Block YouTube ads, banner trackers, crypto-mining scripts, and protect personal device identity on up to 3 personal devices for 1 full year.',
    priceNGN: 5000,
    duration: '365 Days (1 Year)',
    inStock: true,
    featured: true,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Authorized Genuine License Key',
    deliveryMethod: 'Instant Digital Key Dispatch (Email & WhatsApp)',
    requirementsNote: 'Delivered directly to your checkout email.',
    features: [
      'Valid for 3 devices simultaneously (Windows/Mac/Android/iOS)',
      'System-wide ad blocking inside apps, games, and web browsers',
      'Stealth Mode prevents digital fingerprinting and cookies',
      'Parental control web filtering module'
    ]
  },
  {
    id: 'prod-privacy-proton',
    title: 'Proton Unlimited Privacy Suite Pass — 30 Days',
    slug: 'proton-unlimited-30-days',
    category: 'Digital Privacy Tools',
    subCategory: 'Encrypted Ecosystem',
    shortDescription: 'Authorized 30-day seat for Proton Mail, Proton VPN, Proton Drive, Proton Calendar, and Proton Pass password manager.',
    description: 'The complete Swiss-encrypted privacy suite. Keep your communications private under strict Swiss privacy laws, store encrypted backups on 500GB cloud storage, and secure passwords with Proton Pass.',
    priceNGN: 4500,
    duration: '30 Days',
    inStock: true,
    featured: false,
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    licenseType: 'Authorized Subscription Seat',
    deliveryMethod: 'Digital Portal Voucher',
    requirementsNote: 'Valid email address required.',
    features: [
      'End-to-end encrypted Swiss Proton Mail with custom domains',
      'Proton VPN Plus tier server speeds',
      'Proton Pass password & 2FA vault',
      '500 GB zero-knowledge encrypted cloud drive'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'DL-84920',
    createdAt: '2026-10-22T14:32:00Z',
    customerName: 'Tunde Adebayo',
    customerEmail: 'tunde.adebayo@example.com',
    customerPhone: '+234 803 123 4567',
    items: [
      {
        productId: 'prod-vpn-express',
        productTitle: 'ExpressVPN Authorized Access Voucher — 30 Days',
        productImage: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
        priceNGN: 4000,
        quantity: 1,
        category: 'VPN Subscriptions'
      }
    ],
    totalNGN: 4000,
    currency: 'NGN',
    exchangeRateUsed: 1450,
    totalInCurrency: 4000,
    status: 'delivered',
    paymentMethod: 'bank_transfer',
    paymentReference: '1082058717',
    paymentProofNotes: 'Transfer of 4,000 NGN to Payrep MFB completed.',
    adminNotes: 'License voucher code sent via email and confirmed on WhatsApp.'
  },
  {
    id: 'DL-84925',
    createdAt: '2026-10-23T01:15:00Z',
    customerName: 'Chioma Okeke',
    customerEmail: 'chioma.okeke@example.com',
    customerPhone: '+234 812 987 6543',
    items: [
      {
        productId: 'prod-fb-packages',
        productTitle: 'Facebook Marketing & Reach Acceleration Packages',
        productImage: '/src/assets/images/product_social_growth_1792747624166.jpg',
        packageId: 'fb-growth',
        packageName: 'Growth Package',
        priceNGN: 3500,
        quantity: 1,
        category: 'Facebook Marketing'
      }
    ],
    totalNGN: 3500,
    currency: 'NGN',
    exchangeRateUsed: 1450,
    totalInCurrency: 3500,
    status: 'under_review',
    paymentMethod: 'bank_transfer',
    paymentReference: 'PAYREP-20261023-772',
    paymentProofNotes: 'Sent 3,500 NGN from GTBank to Payrep MFB account 2091223616.',
    adminNotes: 'Bank receipt uploaded; verifying with Payrep MFB mobile statement.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Real Marketing Strategy Beats Fake Social Engagement Every Time',
    slug: 'real-marketing-strategy-vs-fake-engagement',
    excerpt: 'Platform algorithms are aggressively penalizing artificial engagement. Here is how genuine audience positioning, niche hooks, and honest outreach build enduring business value.',
    author: 'Editorial Desk',
    date: 'Oct 18, 2026',
    readTime: '5 min read',
    category: 'Social Media Strategy',
    image: '/src/assets/images/product_social_growth_1792747624166.jpg',
    content: [
      'In recent years, major social media platforms including Meta, TikTok, and Instagram have deployed sophisticated neural network classifiers to identify artificial follower spikes, engagement pods, and bot networks. For businesses seeking long-term revenue, purchasing automated vanity numbers has become a high-risk liability that can lead to permanent shadowbans.',
      'At Digital Logs, our social media marketing packages discard artificial shortcuts entirely. We focus exclusively on legitimate, terms-compliant marketing disciplines: analyzing your competitor content gaps, formulating high-retention video hooks for the first three seconds, and optimizing your bio and link hubs for genuine viewer conversion.',
      'When your brand engages prospective buyers with well-timed, value-dense content and precision audience segmentation, organic algorithms work in your favor. Real engagement produces real inquiries, newsletter sign-ups, and repeat sales.'
    ]
  },
  {
    id: 'blog-2',
    title: 'VPN Protocols Explained: WireGuard vs Lightway vs OpenVPN in 2026',
    slug: 'vpn-protocols-wireguard-lightway-openvpn',
    excerpt: 'Selecting the right VPN protocol directly dictates connection latency, battery consumption on mobile devices, and resilience against aggressive DPI firewalls.',
    author: 'Security Architecture Team',
    date: 'Oct 12, 2026',
    readTime: '6 min read',
    category: 'Digital Privacy',
    image: '/src/assets/images/product_vpn_privacy_1792747623587.jpg',
    content: [
      'Whether you are browsing public Wi-Fi in an airport, encrypting sensitive client transfers, or streaming international media, the underlying protocol of your VPN determines both your speed and cryptographic resilience.',
      'WireGuard has revolutionized VPN architecture by drastically reducing code complexity from OpenVPNs 400,000+ lines down to roughly 4,000 lines. This provides near-instant handshake speeds and negligible battery drain on mobile phones.',
      'Meanwhile, proprietary solutions such as ExpressVPNs Lightway and NordVPNs NordLynx adapt modern cryptographic primitives specifically for dynamic cellular transitions, ensuring you never drop active connections when switching from Wi-Fi to 5G. Browse our authorized VPN subscriptions to secure your setup today.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Setting Up Meta Business Portfolio & Conversion API (CAPI) Without Tears',
    slug: 'meta-business-portfolio-conversions-api-guide',
    excerpt: 'A step-by-step breakdown of how modern privacy legislation and browser changes make server-side tracking essential for accurate advertising attribution.',
    author: 'Growth Engineering',
    date: 'Oct 05, 2026',
    readTime: '7 min read',
    category: 'Meta Advertising',
    image: '/src/assets/images/hero_digital_workspace_1792747623257.jpg',
    content: [
      'Browser privacy updates and ad-blocking extensions now prevent standard browser pixels from capturing a significant fraction of conversion events. If your Meta Ad Manager relies exclusively on browser cookies, you are systematically under-reporting ROAS and feeding poor optimization signals to the ad delivery algorithm.',
      'The Meta Conversions API (CAPI) solves this problem by transmitting purchase events directly from your web server to Metas endpoint, deduplicated with browser events via an Event ID parameter.',
      'Through Digital Logs Meta Business Services, our engineers configure your pixel, domain verification, aggregated event measurement, and Conversions API integration to ensure your campaigns track accurately and deliver maximum return.'
    ]
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    question: 'How do I place an order on Digital Logs?',
    answer: 'Select your preferred digital service or VPN subscription, choose your package or duration, and click "Order Now" or add it to your shopping cart. During checkout, provide your contact details (WhatsApp number or email) and submit your order. You can complete payment instantly via manual bank transfer to our Payrep MFB account or finalize the order directly through our official WhatsApp desk.',
    category: 'Ordering'
  },
  {
    question: 'What are the official bank payment details?',
    answer: 'Our official bank details are: Bank: Payrep MFB | Account Number: 2091223616 | Account Name: DIVINE ELOZINO MICHAEL. You may include the reference ID 1082058717 or your generated Order Reference (e.g. DL-xxxxx) in the transfer narration.',
    category: 'Payment'
  },
  {
    question: 'How does payment verification work?',
    answer: 'Once you transfer the funds via your banking app, submit your transaction reference or proof of transfer in our checkout confirmation window, or message our WhatsApp support desk at +880 1962-061283 with your order ID. Our team verifies the transfer with our bank statement and immediately dispatches your activation credentials.',
    category: 'Payment'
  },
  {
    question: 'How are VPN subscriptions and AI tool seats delivered?',
    answer: 'All subscriptions are official, authorized vouchers or workspace seat invitations. Delivery occurs digitally via email and WhatsApp. Most VPN license keys are issued within 10 to 30 minutes of payment verification.',
    category: 'Subscriptions'
  },
  {
    question: 'Do you sell social media accounts or fake followers?',
    answer: 'No. Digital Logs strictly adheres to platform terms of service. We do not sell accounts, credentials, stolen logins, or artificial/fake engagement. All our Facebook, TikTok, and Instagram services are legitimate digital marketing packages consisting of content optimization, audience research, advertising setups, and organic reach strategy.',
    category: 'Marketing Services'
  },
  {
    question: 'Can I view prices in USD or other currencies?',
    answer: 'Yes! Our primary currency is Nigerian Naira (₦ NGN), but you can toggle the currency selector in the top bar to view prices in US Dollars ($ USD) based on our administrator-configured exchange rate.',
    category: 'General'
  },
  {
    question: 'What is your refund policy if an issue arises?',
    answer: 'If an authorized subscription voucher fails to activate or cannot be fulfilled within our stated delivery window, you are entitled to an immediate replacement or full refund to your original bank account. Please review our detailed Refund Policy page for full terms.',
    category: 'General'
  }
];
