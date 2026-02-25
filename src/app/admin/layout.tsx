'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    AppBar,
    IconButton,
    Typography,
    Avatar,
    Divider,
    Chip,
    Tooltip,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const DRAWER_WIDTH = 240;

const adminTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#6366f1' },
        background: { default: '#0a0e1a', paper: '#141824' },
        divider: 'rgba(255,255,255,0.08)',
    },
    shape: { borderRadius: 10 },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: { borderRight: '1px solid rgba(255,255,255,0.08)', background: '#0f1320' },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&.Mui-selected': { backgroundColor: 'rgba(99,102,241,0.15)' },
                    '&.Mui-selected:hover': { backgroundColor: 'rgba(99,102,241,0.2)' },
                },
            },
        },
    },
});

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { label: 'Subscriptions', href: '/admin/subscriptions', icon: <CreditCardIcon fontSize="small" /> },
    { label: 'Customers', href: '/admin/customers', icon: <PeopleIcon fontSize="small" /> },
    { label: 'Admin Users', href: '/admin/users', icon: <ManageAccountsIcon fontSize="small" /> },
];

interface AdminUser { name: string; email: string; role: string }

function SidebarContent({ user, onLogout, onNavigate, pathname }: {
    user: AdminUser | null;
    onLogout: () => void;
    onNavigate: (href: string) => void;
    pathname: string;
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar sx={{ px: 2.5 }}>
                <Typography variant="h6" fontWeight={800} color="primary.main" sx={{ letterSpacing: '-0.5px' }}>
                    clearPanel
                </Typography>
                <Chip label="Admin" size="small" color="primary" variant="outlined"
                    sx={{ ml: 1.5, fontSize: '0.65rem', height: 20 }} />
            </Toolbar>
            <Divider />
            <List sx={{ px: 1.5, pt: 1.5, flex: 1 }}>
                {NAV_ITEMS.map((item) => (
                    <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={pathname.startsWith(item.href)}
                            onClick={() => onNavigate(item.href)}
                        >
                            <ListItemIcon sx={{ minWidth: 34, color: 'inherit' }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {user && (
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.85rem', fontWeight: 700 }}>
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>{user.role}</Typography>
                    </Box>
                    <Tooltip title="Logout">
                        <IconButton size="small" onClick={onLogout} sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<AdminUser | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!isLoginPage) {
            fetch('/api/admin/auth/me')
                .then((r) => r.json())
                .then((d) => { if (d.user) setUser(d.user); });
        }
    }, [isLoginPage]);

    const handleLogout = async () => {
        await fetch('/api/admin/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const handleNavigate = (href: string) => {
        router.push(href);
        setMobileOpen(false);
    };

    if (isLoginPage) {
        return (
            <ThemeProvider theme={adminTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        );
    }

    const sidebarProps = { user, onLogout: handleLogout, onNavigate: handleNavigate, pathname };

    return (
        <ThemeProvider theme={adminTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Mobile AppBar */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        display: { md: 'none' },
                        zIndex: (t) => t.zIndex.drawer + 1,
                        bgcolor: 'background.paper',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight={800} ml={1} color="primary.main">
                            clearPanel Admin
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
                        }}
                    >
                        <SidebarContent {...sidebarProps} />
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
                        }}
                        open
                    >
                        <SidebarContent {...sidebarProps} />
                    </Drawer>
                </Box>

                {/* Main */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 3 },
                        mt: { xs: '64px', md: 0 },
                        minHeight: '100vh',
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
