'use client';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

function AddUserDialog({ open, onClose, onAdded }: {
    open: boolean;
    onClose: () => void;
    onAdded: () => void;
}) {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) {
            setError(data.error ?? 'Failed to create user');
        } else {
            setForm({ name: '', email: '', password: '', role: 'admin' });
            onAdded();
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add Admin User</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <Stack spacing={2}>
                        <TextField
                            label="Full Name" required fullWidth size="small"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <TextField
                            label="Email" type="email" required fullWidth size="small"
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <TextField
                            label="Password" type="password" required fullWidth size="small"
                            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <FormControl size="small" fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select label="Role" value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="superadmin">Superadmin</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Create User'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    const load = () => {
        setLoading(true);
        fetch('/api/admin/users')
            .then((r) => r.json())
            .then((d) => { setUsers(d); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this admin user?')) return;
        setDeleting(id);
        await fetch('/api/admin/users', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setDeleting(null);
        load();
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={0.5}>Admin Users</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage who has access to this admin panel.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setAddOpen(true)}
                >
                    Add User
                </Button>
            </Stack>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 6, textAlign: 'center' }}><CircularProgress size={28} /></Box>
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((u) => (
                                    <TableRow key={u.id} hover>
                                        <TableCell>
                                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                                <Avatar
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        bgcolor: 'primary.main',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {u.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight={500}>{u.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{u.email}</Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={u.role}
                                                size="small"
                                                color={u.role === 'superadmin' ? 'secondary' : 'default'}
                                                variant="outlined"
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {users.length > 1 && (
                                                <Tooltip title="Remove user">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        disabled={deleting === u.id}
                                                        onClick={() => handleDelete(u.id)}
                                                    >
                                                        {deleting === u.id
                                                            ? <CircularProgress size={16} />
                                                            : <DeleteIcon fontSize="small" />
                                                        }
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {!loading && users.length === 0 && (
                        <>
                            <Divider />
                            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                                No admin users found. Run the seed script to create the first one.
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            <AddUserDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onAdded={load}
            />
        </Box>
    );
}
