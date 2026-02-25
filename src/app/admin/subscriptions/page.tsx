'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    InputAdornment,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const fmt = (cents: number, currency = 'usd') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

const STATUS_COLOR: Record<string, 'success' | 'error' | 'warning' | 'info' | 'default'> = {
    active: 'success',
    canceled: 'error',
    past_due: 'warning',
    trialing: 'info',
    incomplete: 'default',
};

interface Subscription {
    id: string;
    stripeSubscriptionId: string;
    plan: string;
    status: string;
    amount: number;
    currency: string;
    interval: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    customer: { id: string; email: string; name: string | null };
}

const STATUS_FILTERS = ['all', 'active', 'canceled', 'past_due', 'trialing'];

export default function SubscriptionsPage() {
    const [items, setItems] = useState<Subscription[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('all');
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), status, q });
        fetch(`/api/admin/subscriptions?${params}`)
            .then((r) => r.json())
            .then((d) => {
                setItems(d.items ?? []);
                setTotal(d.total ?? 0);
                setTotalPages(d.totalPages ?? 1);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [page, status, q]);

    useEffect(() => { load(); }, [load]);

    const handleStatusChange = (_: React.MouseEvent, val: string) => {
        if (val !== null) { setStatus(val); setPage(1); }
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} mb={0.5}>Subscriptions</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                {total} total subscription{total !== 1 ? 's' : ''}
            </Typography>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 0 }}>
                    {/* Filters */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems={{ sm: 'center' }}
                        sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}
                    >
                        <ToggleButtonGroup
                            value={status}
                            exclusive
                            onChange={handleStatusChange}
                            size="small"
                        >
                            {STATUS_FILTERS.map((s) => (
                                <ToggleButton key={s} value={s}
                                    sx={{ textTransform: 'capitalize', px: 1.5, fontSize: '0.75rem' }}>
                                    {s}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <TextField
                            size="small"
                            placeholder="Search customer…"
                            value={q}
                            onChange={(e) => { setQ(e.target.value); setPage(1); }}
                            sx={{ minWidth: 220 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>

                    {loading ? (
                        <Box sx={{ p: 6, textAlign: 'center' }}><CircularProgress size={28} /></Box>
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Plan</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell>Period End</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                                            No subscriptions found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((sub) => (
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
                                                <Chip label={sub.plan} size="small" variant="outlined"
                                                    color="primary" sx={{ textTransform: 'capitalize' }} />
                                            </TableCell>
                                            <TableCell>
                                                <Stack spacing={0.5}>
                                                    <Chip
                                                        label={sub.status}
                                                        size="small"
                                                        color={STATUS_COLOR[sub.status] ?? 'default'}
                                                        sx={{ textTransform: 'capitalize' }}
                                                    />
                                                    {sub.cancelAtPeriodEnd && (
                                                        <Chip label="cancels at period end" size="small"
                                                            variant="outlined" color="warning"
                                                            sx={{ fontSize: '0.65rem' }} />
                                                    )}
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2" fontWeight={600}>
                                                    {fmt(sub.amount, sub.currency)}/{sub.interval}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="View in Stripe">
                                                    <a
                                                        href={`https://dashboard.stripe.com/test/subscriptions/${sub.stripeSubscriptionId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: 'inherit', opacity: 0.5 }}
                                                    >
                                                        <OpenInNewIcon fontSize="small" />
                                                    </a>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}

                    {totalPages > 1 && (
                        <>
                            <Divider />
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(_, v) => setPage(v)}
                                    color="primary"
                                    size="small"
                                />
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
