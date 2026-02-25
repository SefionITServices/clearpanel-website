import type { Metadata } from 'next';
import { AppThemeProvider } from '@/lib/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
    title: {
        template: '%s | clearPanel',
        default: 'clearPanel — Modern VPS Control Panel for Ubuntu',
    },
    description:
        'clearPanel is a modern web hosting control panel for Ubuntu VPS servers. Manage domains, DNS, email, databases, SSL, and files — starting at $3.99/month. No per-domain fees, no bloat.',
    keywords: [
        'VPS control panel',
        'cPanel alternative',
        'Ubuntu hosting panel',
        'affordable hosting panel',
        'self-hosted control panel',
        'BIND9 DNS',
        'NestJS control panel',
        'cheap cPanel alternative',
    ],
    metadataBase: new URL('https://clearpanel.net'),
    icons: {
        icon: '/logo.svg',
        shortcut: '/logo.svg',
        apple: '/logo.svg',
    },
    openGraph: {
        type: 'website',
        siteName: 'clearPanel',
        title: 'clearPanel — Modern VPS Control Panel for Ubuntu',
        description:
            'Modern web hosting control panel for Ubuntu. Domain management, DNS server, email suite, databases, SSL, and more — starting at $3.99/month.',
        url: 'https://clearpanel.net',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'clearPanel — Modern VPS Control Panel',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'clearPanel — Modern VPS Control Panel for Ubuntu',
        description:
            'cPanel-grade hosting management for Ubuntu VPS at $3.99/month. No per-domain fees, no bloat.',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <AppThemeProvider>{children}</AppThemeProvider>
            </body>
        </html>
    );
}
