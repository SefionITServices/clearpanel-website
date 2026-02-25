'use client';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CheckoutSuccess() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                px: 2,
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 72, color: 'success.main', mb: 3 }} />
                <Typography variant="h4" fontWeight={700} mb={2}>
                    You&apos;re all set!
                </Typography>
                <Typography color="text.secondary" mb={4} sx={{ lineHeight: 1.7 }}>
                    Your clearPanel subscription is active. Check your email for a receipt and
                    getting-started instructions. Your server will be ready to install in minutes.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    component={NextLink}
                    href="/docs"
                    sx={{ mr: 2, mb: 1 }}
                >
                    View Docs
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    component={NextLink}
                    href="/"
                    sx={{ mb: 1 }}
                >
                    Back to Home
                </Button>
            </Container>
        </Box>
    );
}
