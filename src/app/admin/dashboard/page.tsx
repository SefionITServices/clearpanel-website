'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CancelIcon from '@mui/icons-material/Cancel';

const fmt = (cents: number, currency = 'usd') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

const STATUS_COLOR: Record<string, 'success' | 'error' | 'warning' | 'info' | 'default'> = {
    active: 'success',
    canceled: 'error',
    past_due: 'warning',
    trialing: 'info',
    incomplete: 'default',
};

interface RecentSub {
    id: string;
    plan: string;
    status: string;
    amount: number;
    interval: string;
    currency: string;
    createdAt: string;
    customer: { email: string; name: string | null };
}

interface Stats {
    totalCustomers: number;
    newCustomersThisMonth: number;
    activeSubscriptions: number;
    canceledThisMonth: number;
    mrr: number;
    recentSubscriptions: RecentSub[];
}

function StatCard({
    title,
    value,
    sub,
    icon,
    color,
}: {
    title: string;
    value: string | number;
    sub?: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight={700} mb={0.5}>
                            {value}
                        </Typography>
                        {sub && (
                            <Typography variant="caption" color="text.secondary">
                                {sub}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: color + '22',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color,
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((r) => r.json())
            .then((d) => {
                setStats(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} mb={0.5}>
                Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Overview of your clearPanel subscriptions and customers.
            </Typography>

            {/* Stat Cards */}
            <Grid container spacing={2.5} mb={4}>
                {[
                    {
                        title: 'Total Customers',
                        value: loading ? '—' : stats?.totalCustomers ?? 0,
                        sub: loading ? '' : `+${stats?.newCustomersThisMonth ?? 0} this month`,
                        icon: <PeopleIcon />,
                        color: '#6366f1',
                    },
                    {
                        title: 'Active Subscriptions',
                        value: loading ? '—' : stats?.activeSubscriptions ?? 0,
                        sub: 'Currently billing',
                        icon: <CreditCardIcon />,
                        color: '#10b981',
                    },
                    {
                        title: 'Monthly Recurring Revenue',
                        value: loading ? '—' : fmt(stats?.mrr ?? 0),
                        sub: 'Normalized MRR',
                        icon: <TrendingUpIcon />,
                        color: '#f59e0b',
                    },
                    {
                        title: 'Canceled This Month',
                        value: loading ? '—' : stats?.canceledThisMonth ?? 0,
                        sub: 'Churned subscriptions',
                        icon: <CancelIcon />,
                        color: '#ef4444',
                    },
                ].map((s) => (
                    <Grid item xs={12} sm={6} xl={3} key={s.title}>
                        {loading ? (
                            <Skeleton variant="rounded" height={120} />
                        ) : (
                            <StatCard {...s} />
                        )}
                    </Grid>
                ))}
            </Grid>

            {/* Recent Subscriptions */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ px: 3, py: 2.5 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Recent Subscriptions
                        </Typography>
                    </Box>
                    <Divider />
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress size={28} />
                        </Box>
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Plan</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(stats?.recentSubscriptions ?? []).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                            No subscriptions yet
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    (stats?.recentSubscriptions ?? []).map((sub) => (
                                        <TableRow key={sub.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {sub.customer.name || sub.customer.email}
                                                </Typography>
                                                {sub.customer.name && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {sub.customer.email}
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={sub.plan}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={sub.status}
                                                    size="small"
                                                    color={STATUS_COLOR[sub.status] ?? 'default'}
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2" fontWeight={500}>
                                                    {fmt(sub.amount, sub.currency)}/{sub.interval}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
