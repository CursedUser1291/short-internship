import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in with', { email, password });
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login to Your Account
            </Typography>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account? <a href="/register">Sign up</a>
            </Typography>
        </Container>
    );
};

export default LoginPage;
