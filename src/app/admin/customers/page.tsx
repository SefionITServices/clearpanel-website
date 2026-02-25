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
    Tooltip,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const fmt = (cents: number, currency = 'usd') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

interface ActiveSub {
    plan: string;
    status: string;
    amount: number;
    interval: string;
}

interface Customer {
    id: string;
    stripeCustomerId: string;
    email: string;
    name: string | null;
    notes: string | null;
    tags: string | null;
    createdAt: string;
    subscriptions: ActiveSub[];
}

export default function CustomersPage() {
    const [items, setItems] = useState<Customer[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), q });
        fetch(`/api/admin/customers?${params}`)
            .then((r) => r.json())
            .then((d) => {
                setItems(d.items ?? []);
                setTotal(d.total ?? 0);
                setTotalPages(d.totalPages ?? 1);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [page, q]);

    useEffect(() => { load(); }, [load]);

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} mb={0.5}>Customers</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                {total} total customer{total !== 1 ? 's' : ''}
            </Typography>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 0 }}>
                    {/* Search */}
                    <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <TextField
                            size="small"
                            placeholder="Search by name or email…"
                            value={q}
                            onChange={(e) => { setQ(e.target.value); setPage(1); }}
                            sx={{ width: { xs: '100%', sm: 320 } }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {loading ? (
                        <Box sx={{ p: 6, textAlign: 'center' }}><CircularProgress size={28} /></Box>
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Active Plan</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Since</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                                            No customers found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map((c) => {
                                        const activeSub = c.subscriptions[0];
                                        const tags = c.tags ? JSON.parse(c.tags) as string[] : [];
                                        return (
                                            <TableRow key={c.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {c.name || c.email}
                                                    </Typography>
                                                    {c.name && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {c.email}
                                                        </Typography>
                                                    )}
                                                    {c.notes && (
                                                        <Typography variant="caption" display="block" color="info.main"
                                                            sx={{ mt: 0.25, fontStyle: 'italic' }}>
                                                            {c.notes}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {activeSub ? (
                                                        <Stack spacing={0.5}>
                                                            <Chip
                                                                label={activeSub.plan}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{ textTransform: 'capitalize' }}
                                                            />
                                                            <Typography variant="caption" color="text.secondary">
                                                                {fmt(activeSub.amount)}/{activeSub.interval}
                                                            </Typography>
                                                        </Stack>
                                                    ) : (
                                                        <Typography variant="caption" color="text.disabled">No active plan</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                                        {tags.map((tag: string) => (
                                                            <Chip key={tag} label={tag} size="small"
                                                                sx={{ fontSize: '0.65rem' }} />
                                                        ))}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(c.createdAt).toLocaleDateString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="View in Stripe">
                                                        <a
                                                            href={`https://dashboard.stripe.com/test/customers/${c.stripeCustomerId}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ color: 'inherit', opacity: 0.5 }}
                                                        >
                                                            <OpenInNewIcon fontSize="small" />
                                                        </a>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
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
