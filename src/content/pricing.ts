// Content: Pricing tiers and feature comparison

export interface PricingTier {
    id: string;
    name: string;
    tagline: string;
    price: string;
    pricePeriod: string;
    priceNote?: string;
    highlighted: boolean;
    ctaLabel: string;
    ctaHref: string;
    features: string[];
    isCustom?: boolean;
    addons?: string[];
}

export interface ComparisonRow {
    feature: string;
    starter: string | boolean;
    custom: string | boolean;
}

export const pricingTiers: PricingTier[] = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Everything you need to run a full hosting stack',
        price: '$3.99',
        pricePeriod: 'per month',
        priceNote: 'or $39/year — save 18% billed annually',
        highlighted: true,
        ctaLabel: 'Get Started — $3.99/mo',
        ctaHref: '/api/stripe/checkout?plan=starter_monthly',
        features: [
            'Unlimited domains',
            'DNS zone editor & BIND9 server',
            'Nginx web server management',
            'SSL via Let\'s Encrypt',
            'File manager (Monaco editor)',
            'Web terminal',
            'MySQL / MariaDB management',
            'Email stack (Postfix + Dovecot)',
            'DKIM, DMARC & Rspamd anti-spam',
            'Roundcube webmail',
            'App Store (11 apps)',
            'UFW firewall manager',
            'System logs viewer',
            'Cron job manager',
            'Two-Factor Authentication (TOTP)',
            'Resource monitoring dashboard',
            'Backup & restore',
            'Email support',
        ],
    },
    {
        id: 'custom',
        name: 'Custom',
        tagline: 'Tailored to your team, stack, and scale',
        price: 'Custom',
        pricePeriod: 'tailored pricing',
        priceNote: 'Volume discounts available',
        highlighted: false,
        ctaLabel: 'Contact Us',
        ctaHref: '/contact',
        isCustom: true,
        features: [],
        addons: [
            'Everything in Starter',
            'Multi-server management',
            'PostgreSQL management',
            'PHP multi-version manager (7.4–8.4)',
            'SSH key manager',
            'Process manager',
            'Advanced backup scheduling',
            'Cloudflare Tunnel pre-configured',
            'Custom nameserver branding',
            'White-label panel UI',
            'Priority support with dedicated SLA',
            'Custom feature development',
            'Early access to new features',
            'Onboarding & migration assistance',
        ],
    },
];

export const comparisonRows: ComparisonRow[] = [
    { feature: 'Domains managed', starter: 'Unlimited', custom: 'Unlimited' },
    { feature: 'Nginx web server', starter: true, custom: true },
    { feature: 'SSL (Let\'s Encrypt)', starter: true, custom: true },
    { feature: 'BIND9 DNS server', starter: true, custom: true },
    { feature: 'File manager (Monaco editor)', starter: true, custom: true },
    { feature: 'Web terminal', starter: true, custom: true },
    { feature: 'MySQL / MariaDB', starter: true, custom: true },
    { feature: 'PostgreSQL', starter: false, custom: 'Add-on' },
    { feature: 'Email stack (Postfix + Dovecot)', starter: true, custom: true },
    { feature: 'Roundcube webmail', starter: true, custom: true },
    { feature: 'DKIM & DMARC', starter: true, custom: true },
    { feature: 'PHP multi-version manager', starter: false, custom: 'Add-on' },
    { feature: 'SSH key manager', starter: false, custom: 'Add-on' },
    { feature: 'Cron job manager', starter: true, custom: true },
    { feature: 'Two-Factor Auth (TOTP)', starter: true, custom: true },
    { feature: 'Resource monitoring', starter: true, custom: true },
    { feature: 'Process manager', starter: false, custom: 'Add-on' },
    { feature: 'Backup & restore', starter: 'Scheduled', custom: 'Advanced scheduling' },
    { feature: 'App Store', starter: '11 apps', custom: '11 apps + custom' },
    { feature: 'Multi-server management', starter: false, custom: 'Add-on' },
    { feature: 'White-label branding', starter: false, custom: 'Add-on' },
    { feature: 'Cloudflare Tunnel', starter: 'Manual setup', custom: 'Pre-configured' },
    { feature: 'Support', starter: 'Email support', custom: 'Dedicated SLA + custom' },
];
