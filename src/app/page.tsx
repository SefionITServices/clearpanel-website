'use client';
import NextLink from 'next/link';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicIcon from '@/components/DynamicIcon';
import { homeHighlights } from '@/content/features';
import { faqItems, testimonials } from '@/content/faq';

const TECH_PILLS = ['NestJS', 'React 18', 'MUI v7', 'BIND9', 'Postfix', 'Nginx', 'Let\'s Encrypt', 'Ubuntu'];

const SECURITY_ITEMS = [
    'TOTP Two-Factor Authentication (QR code setup + recovery codes)',
    'bcrypt password hashing — credentials never stored in plaintext',
    'UFW firewall manager with one-click presets',
    'Fail2Ban intrusion prevention status monitoring',
    'Terminal command filtering (blocks destructive shell patterns)',
    'Scoped sudoers (~25 specific binaries, not NOPASSWD: ALL)',
    'DTO validation on all API endpoints (class-validator)',
    'Auto-generated session secrets (randomBytes)',
];

const CONNECTIVITY_ITEMS = [
    {
        title: 'Direct IP Access',
        desc: 'Access clearPanel at your VPS public IP. Open ports, configure Nginx reverse proxy, and point your domain — straightforward for cloud servers.',
        chip: 'Cloud VPS',
    },
    {
        title: 'Cloudflare Tunnel',
        desc: 'Works behind NAT and CGNAT. No port forwarding required. Cloudflare Tunnel free tier available. Perfect for home servers or restrictive hosting environments.',
        chip: 'Home Server / CGNAT',
    },
];

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Box component="main">

                {/* ─── HERO ─── */}
                <Box
                    className="hero-gradient"
                    sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 14 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                >
                    <Container maxWidth="md">
                        <Chip
                            label="✨ v2.1.0 · 26 Features · Starting at $3.99/mo"
                            size="small"
                            variant="outlined"
                            sx={{ mb: 3, borderColor: 'primary.main', color: 'primary.main', fontWeight: 600 }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' },
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Your VPS.{' '}
                            <Box component="span" className="gradient-text">
                                Your Rules.
                            </Box>{' '}
                            Your Control Panel.
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ mb: 5, fontWeight: 400, maxWidth: 600, mx: 'auto', lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.2rem' } }}
                        >
                            clearPanel gives you cPanel-grade features at a fraction of the cost — installed in minutes on any Ubuntu VPS, starting at $3.99/month.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
                            <Button
                                variant="contained"
                                size="large"
                                component={NextLink}
                                href="/pricing"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                            >
                                Get Started — $3.99/mo
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component={NextLink}
                                href="/features"
                                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                            >
                                Explore Features
                            </Button>
                        </Stack>

                        {/* Install command snippet */}
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1.5,
                                bgcolor: 'rgba(0,0,0,0.35)',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                px: 2.5,
                                py: 1.2,
                                mb: 5,
                                backdropFilter: 'blur(6px)',
                                fontFamily: 'monospace',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                color: 'text.secondary',
                                cursor: 'default',
                                userSelect: 'all',
                            }}
                        >
                            <Typography component="span" sx={{ color: 'success.main', fontFamily: 'inherit', fontSize: 'inherit' }}>$</Typography>
                            <Typography component="span" sx={{ color: 'text.primary', fontFamily: 'inherit', fontSize: 'inherit' }}>
                                curl -sL https://get.clearpanel.net | sudo bash
                            </Typography>
                        </Box>

                        {/* Tech pill strip */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
                            {TECH_PILLS.map((tech) => (
                                <Chip key={tech} label={tech} size="small" sx={{ bgcolor: 'action.hover', fontWeight: 500, mb: 1 }} />
                            ))}
                        </Stack>
                    </Container>
                </Box>

                {/* ─── DASHBOARD PREVIEW ─── */}
                <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            BUILT FOR REAL WORK
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Everything in one clean interface
                        </Typography>
                        <Typography color="text.secondary" textAlign="center" mb={6} sx={{ maxWidth: 560, mx: 'auto' }}>
                            A modern, responsive dashboard that makes server management feel effortless — no bloat, no confusion.
                        </Typography>

                        {/* Browser chrome mock */}
                        <Box
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 3,
                                overflow: 'hidden',
                                boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
                                maxWidth: 900,
                                mx: 'auto',
                            }}
                        >
                            {/* Title bar */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2,
                                    py: 1.2,
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c840' }} />
                                <Box
                                    sx={{
                                        mx: 'auto',
                                        px: 2.5,
                                        py: 0.4,
                                        bgcolor: 'rgba(255,255,255,0.07)',
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                        color: 'text.disabled',
                                        fontFamily: 'monospace',
                                        userSelect: 'none',
                                    }}
                                >
                                    https://panel.yourdomain.com
                                </Box>
                            </Box>

                            {/* Dashboard body */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
                                    minHeight: 360,
                                    bgcolor: 'background.paper',
                                }}
                            >
                                {/* Sidebar */}
                                <Box
                                    sx={{
                                        borderRight: '1px solid',
                                        borderColor: 'divider',
                                        p: 2,
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    {[
                                        { label: 'Dashboard', active: true },
                                        { label: 'Domains' },
                                        { label: 'Email' },
                                        { label: 'Databases' },
                                        { label: 'Files' },
                                        { label: 'SSL / TLS' },
                                        { label: 'DNS' },
                                        { label: 'Backups' },
                                        { label: 'Settings' },
                                    ].map(({ label, active }) => (
                                        <Box
                                            key={label}
                                            sx={{
                                                px: 1.5,
                                                py: 0.8,
                                                borderRadius: 1.5,
                                                mb: 0.5,
                                                fontSize: '0.8rem',
                                                fontWeight: active ? 700 : 400,
                                                color: active ? 'primary.main' : 'text.secondary',
                                                bgcolor: active ? 'primary.main' + '18' : 'transparent',
                                                cursor: 'default',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {label}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Main content */}
                                <Box sx={{ p: 3 }}>
                                    <Typography variant="subtitle2" color="text.secondary" mb={2} sx={{ fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase' }}>
                                        Server Overview
                                    </Typography>
                                    <Grid container spacing={2} mb={3}>
                                        {[
                                            { label: 'CPU', value: '12%', color: 'success.main' },
                                            { label: 'RAM', value: '1.8 GB / 4 GB', color: 'info.main' },
                                            { label: 'Disk', value: '23 GB / 80 GB', color: 'warning.main' },
                                            { label: 'Uptime', value: '47 days', color: 'text.secondary' },
                                        ].map(({ label, value, color }) => (
                                            <Grid item xs={6} sm={3} key={label}>
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 2,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '0.7rem', color: 'text.disabled', mb: 0.5, userSelect: 'none' }}>{label}</Typography>
                                                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color, userSelect: 'none' }}>{value}</Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {/* Mini terminal */}
                                    <Box
                                        sx={{
                                            bgcolor: 'rgba(0,0,0,0.4)',
                                            borderRadius: 2,
                                            p: 2,
                                            fontFamily: 'monospace',
                                            fontSize: '0.75rem',
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {[
                                            { prompt: true, text: 'systemctl status nginx' },
                                            { prompt: false, text: '● nginx.service — active (running)', color: 'success.main' },
                                            { prompt: false, text: '  Started: 47 days ago · PID: 1284', color: 'text.disabled' },
                                            { prompt: true, text: 'clearpanel domain:list' },
                                            { prompt: false, text: '  example.com   SSL ✓   DNS ✓   PHP 8.3', color: 'text.secondary' },
                                            { prompt: false, text: '  mystore.net   SSL ✓   DNS ✓   PHP 8.1', color: 'text.secondary' },
                                        ].map((line, i) => (
                                            <Box key={i} sx={{ display: 'flex', gap: 1 }}>
                                                {line.prompt && <Typography component="span" sx={{ color: 'primary.main', fontFamily: 'inherit', fontSize: 'inherit', userSelect: 'none' }}>$</Typography>}
                                                <Typography component="span" sx={{ color: line.color ?? 'text.primary', fontFamily: 'inherit', fontSize: 'inherit', userSelect: 'none', pl: line.prompt ? 0 : 1.5 }}>
                                                    {line.text}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* ─── PROBLEM → SOLUTION ─── */}
                <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            WHY CLEARPANEL
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Stop overpaying for your server control panel
                        </Typography>
                        <Typography color="text.secondary" textAlign="center" mb={8} sx={{ maxWidth: 560, mx: 'auto' }}>
                            Commercial panels lock you in with bloated pricing. clearPanel gives you the same power, self-hosted, at a fraction of the cost.
                        </Typography>
                        <Grid container spacing={4}>
                            {[
                                {
                                    problem: 'cPanel / Plesk costs $150–$240/year',
                                    solution: 'clearPanel starts at $3.99/month — and covers unlimited domains with no per-site fees.',
                                },
                                {
                                    problem: 'Managing Nginx + BIND9 + Postfix via CLI is error-prone',
                                    solution: 'clearPanel automates every layer through a validated web UI with real-time feedback.',
                                },
                                {
                                    problem: 'Setting up DKIM, DMARC, and SPF takes hours',
                                    solution: 'One-click mail domain provisioning with DKIM, DMARC, Rspamd, and ClamAV configured automatically.',
                                },
                            ].map((item, i) => (
                                <Grid item xs={12} md={4} key={i}>
                                    <Card variant="outlined" sx={{ height: '100%', p: 1 }}>
                                        <CardContent>
                                            <Typography variant="body2" color="error.main" fontWeight={600} mb={1.5} sx={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                ✗ The Problem
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600} mb={2} color="text.secondary">
                                                {item.problem}
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            <Typography variant="body2" color="success.main" fontWeight={600} mb={1.5} sx={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                ✓ clearPanel Answer
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {item.solution}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* ─── FEATURE HIGHLIGHTS ─── */}
                <Box sx={{ py: { xs: 8, md: 12 } }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            FEATURE HIGHLIGHTS
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Everything you need to run a hosting stack
                        </Typography>
                        <Typography color="text.secondary" textAlign="center" mb={8} sx={{ maxWidth: 560, mx: 'auto' }}>
                            26 fully implemented features across domains, DNS, email, databases, security, and server management.
                        </Typography>
                        <Grid container spacing={3}>
                            {homeHighlights.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.title}>
                                    <Card
                                        component={NextLink}
                                        href={item.href}
                                        sx={{
                                            height: '100%',
                                            p: 1,
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 8,
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 2,
                                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15))',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mb: 2,
                                                }}
                                            >
                                                <DynamicIcon name={item.icon} sx={{ color: 'primary.main', fontSize: 26 }} />
                                            </Box>
                                            <Typography variant="h6" fontWeight={700} mb={1}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box textAlign="center" mt={5}>
                            <Button
                                variant="outlined"
                                size="large"
                                component={NextLink}
                                href="/features"
                                endIcon={<ArrowForwardIcon />}
                            >
                                See All Features
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* ─── SECURITY FOCUS ─── */}
                <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={5}>
                                <Typography variant="h6" color="primary" fontWeight={700} mb={1}>
                                    SECURITY-FIRST DESIGN
                                </Typography>
                                <Typography variant="h3" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                                    Secure by default, not an afterthought
                                </Typography>
                                <Typography color="text.secondary" mb={4} lineHeight={1.7}>
                                    clearPanel was built with security issues caught and fixed before release. Every critical vulnerability has been addressed: auth guards on every endpoint, bcrypt hashing, scoped sudo, and terminal command filtering.
                                </Typography>
                                <Button variant="contained" component={NextLink} href="/features#security" endIcon={<ArrowForwardIcon />}>
                                    View Security Features
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Stack spacing={1.5}>
                                    {SECURITY_ITEMS.map((item) => (
                                        <Box key={item} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                            <CheckCircleIcon sx={{ color: 'success.main', mt: 0.3, flexShrink: 0 }} fontSize="small" />
                                            <Typography variant="body2" lineHeight={1.6}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* ─── DUAL CONNECTIVITY ─── */}
                <Box sx={{ py: { xs: 8, md: 12 } }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            CONNECTIVITY
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Works anywhere — even behind NAT
                        </Typography>
                        <Typography color="text.secondary" textAlign="center" mb={8} sx={{ maxWidth: 540, mx: 'auto' }}>
                            Cloud VPS with a public IP, or a home server behind CGNAT — clearPanel has a connectivity option for both.
                        </Typography>
                        <Grid container spacing={4}>
                            {CONNECTIVITY_ITEMS.map((item) => (
                                <Grid item xs={12} md={6} key={item.title}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            height: '100%',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <CardContent>
                                            <Chip label={item.chip} size="small" color="primary" variant="outlined" sx={{ mb: 2 }} />
                                            <Typography variant="h5" fontWeight={700} mb={1.5}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                                                {item.desc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* ─── TESTIMONIALS ─── */}
                <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            WHAT USERS SAY
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={8} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Trusted by developers and agencies
                        </Typography>
                        <Grid container spacing={4}>
                            {testimonials.map((t) => (
                                <Grid item xs={12} md={4} key={t.author}>
                                    <Card sx={{ height: '100%', p: 1 }}>
                                        <CardContent>
                                            <Stack direction="row" spacing={0.5} mb={2}>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} sx={{ color: '#f59e0b', fontSize: 18 }} />
                                                ))}
                                            </Stack>
                                            <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.7} sx={{ fontStyle: 'italic' }}>
                                                &ldquo;{t.quote}&rdquo;
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontSize: 14, fontWeight: 700 }}>
                                                    {t.avatar}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight={700}>
                                                        {t.author}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {t.role}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* ─── FAQ ─── */}
                <Box sx={{ py: { xs: 8, md: 12 } }}>
                    <Container maxWidth="md">
                        <Typography variant="h6" color="primary" fontWeight={700} textAlign="center" mb={1}>
                            FREQUENTLY ASKED
                        </Typography>
                        <Typography variant="h3" textAlign="center" mb={8} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Common questions
                        </Typography>
                        <Stack spacing={1}>
                            {faqItems.map((item) => (
                                <Accordion
                                    key={item.question}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: '12px !important',
                                        mb: 1,
                                        '&:before': { display: 'none' },
                                        boxShadow: 'none',
                                    }}
                                >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography fontWeight={600}>{item.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="text.secondary" lineHeight={1.7}>
                                            {item.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Container>
                </Box>

                {/* ─── CTA ─── */}
                <Box
                    sx={{
                        py: { xs: 8, md: 14 },
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(6,182,212,0.08) 100%)',
                        textAlign: 'center',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h3" mb={2} sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            Ready to take control of your VPS?
                        </Typography>
                        <Typography color="text.secondary" mb={5} lineHeight={1.7}>
                            Get clearPanel running on your Ubuntu VPS in minutes. Full hosting stack, one flat price — no per-domain fees, no surprises.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                size="large"
                                component={NextLink}
                                href="/pricing"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                            >
                                Get Started — $3.99/mo
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component={NextLink}
                                href="/contact"
                                sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                            >
                                Talk to Us
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
}
