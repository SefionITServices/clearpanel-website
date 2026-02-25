'use client';
import NextLink from 'next/link';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { pricingTiers, comparisonRows } from '@/content/pricing';

function FeatureValue({ val }: { val: string | boolean }) {
    if (val === true) return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />;
    if (val === false) return <CancelIcon sx={{ color: 'text.disabled', fontSize: 20 }} />;
    return <Typography variant="body2" fontWeight={500}>{val}</Typography>;
}

export default function PricingPage() {
    const starter = pricingTiers.find((t) => t.id === 'starter')!;
    const custom = pricingTiers.find((t) => t.id === 'custom')!;

    return (
        <>
            <Navbar />
            <Box component="main">
                {/* Header */}
                <Box
                    sx={{
                        py: { xs: 8, md: 12 },
                        textAlign: 'center',
                        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)',
                    }}
                >
                    <Container maxWidth="md">
                        <Chip label="PRICING" size="small" color="primary" variant="outlined" sx={{ mb: 3, fontWeight: 700 }} />
                        <Typography variant="h2" mb={2} sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                            Simple, Transparent Pricing
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                            One affordable plan that covers everything â€” or a custom solution built around your needs.
                        </Typography>
                    </Container>
                </Box>

                {/* Pricing Cards */}
                <Container maxWidth="md" sx={{ pb: 8 }}>
                    <Grid container spacing={4} alignItems="stretch" justifyContent="center">

                        {/* Starter Card */}
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                    position: 'relative',
                                    overflow: 'visible',
                                }}
                            >
                                <Chip
                                    label="Most Popular"
                                    size="small"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: -12,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontWeight: 700,
                                        px: 1,
                                    }}
                                />
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h5" fontWeight={800} mb={0.5}>{starter.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={3}>{starter.tagline}</Typography>

                                    <Stack direction="row" alignItems="baseline" spacing={0.5} mb={0.5}>
                                        <Typography variant="h3" fontWeight={800}>{starter.price}</Typography>
                                        <Typography color="text.secondary" variant="body2">/{starter.pricePeriod}</Typography>
                                    </Stack>
                                    {starter.priceNote && (
                                        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                                            {starter.priceNote}
                                        </Typography>
                                    )}

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        component="a"
                                        href={starter.ctaHref}
                                        sx={{ mb: 3 }}
                                        endIcon={<ArrowForwardIcon />}
                                    >
                                        {starter.ctaLabel}
                                    </Button>
                                    <Button
                                        variant="text"
                                        fullWidth
                                        component="a"
                                        href="/api/stripe/checkout?plan=starter_yearly"
                                        size="small"
                                        sx={{ mb: 1, color: 'text.secondary', fontSize: '0.8rem' }}
                                    >
                                        or $39/year (save 18%)
                                    </Button>

                                    <Divider sx={{ mb: 3 }} />

                                    <Stack spacing={1.2}>
                                        {starter.features.map((f) => (
                                            <Stack key={f} direction="row" spacing={1.5} alignItems="flex-start">
                                                <CheckCircleIcon sx={{ color: 'success.main', mt: 0.15, flexShrink: 0, fontSize: 18 }} />
                                                <Typography variant="body2" lineHeight={1.5}>{f}</Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Custom Card */}
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'relative',
                                    overflow: 'visible',
                                    background: 'linear-gradient(145deg, rgba(99,102,241,0.04) 0%, rgba(6,182,212,0.04) 100%)',
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                                        <TuneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                        <Typography variant="h5" fontWeight={800}>{custom.name}</Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" mb={3}>{custom.tagline}</Typography>

                                    <Stack direction="row" alignItems="baseline" spacing={0.5} mb={0.5}>
                                        <Typography variant="h3" fontWeight={800}>{custom.price}</Typography>
                                    </Stack>
                                    {custom.priceNote && (
                                        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                                            {custom.priceNote}
                                        </Typography>
                                    )}

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        component={NextLink}
                                        href={custom.ctaHref}
                                        sx={{ mb: 3 }}
                                    >
                                        {custom.ctaLabel}
                                    </Button>

                                    <Divider sx={{ mb: 3 }} />

                                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                        Choose what you need
                                    </Typography>
                                    <Stack spacing={1.2} mt={1.5}>
                                        {custom.addons?.map((addon, i) => (
                                            <Stack key={addon} direction="row" spacing={1.5} alignItems="flex-start">
                                                {i === 0
                                                    ? <CheckCircleIcon sx={{ color: 'success.main', mt: 0.15, flexShrink: 0, fontSize: 18 }} />
                                                    : <TuneIcon sx={{ color: 'primary.light', mt: 0.15, flexShrink: 0, fontSize: 18 }} />
                                                }
                                                <Typography variant="body2" lineHeight={1.5}
                                                    sx={i === 0 ? { fontWeight: 600 } : {}}
                                                >
                                                    {addon}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Comparison Table */}
                    <Box mt={10}>
                        <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
                            Full Feature Comparison
                        </Typography>
                        <Typography color="text.secondary" textAlign="center" mb={5}>
                            A detailed breakdown of what&apos;s included in each plan
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, width: '50%' }}>Feature</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700 }}>Starter</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700 }}>Custom</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {comparisonRows.map((row, i) => (
                                        <TableRow
                                            key={row.feature}
                                            sx={{ bgcolor: i % 2 === 0 ? 'transparent' : 'action.hover' }}
                                        >
                                            <TableCell sx={{ fontWeight: 500 }}>{row.feature}</TableCell>
                                            <TableCell align="center"><FeatureValue val={row.starter} /></TableCell>
                                            <TableCell align="center"><FeatureValue val={row.custom} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* CTA */}
                    <Box textAlign="center" mt={8}>
                        <Typography variant="h4" mb={2}>Ready to get started?</Typography>
                        <Typography color="text.secondary" mb={4}>
                            Start with the Starter plan at $3.99/month, or contact us to build a custom solution.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                size="large"
                                component={NextLink}
                                href="/contact"
                                endIcon={<ArrowForwardIcon />}
                            >
                                Get Started â€” $3.99/mo
                            </Button>
                            <Button variant="outlined" size="large" component={NextLink} href="/contact">
                                Discuss Custom Plan
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
}


