import React, {useEffect, useState} from 'react'
import { Box, Button, TextField, Typography, Container } from '@mui/material'
import { login } from '../context/HealthMetricsContext.ts'
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = await login(username, password)
        if (user) {
            setUser(user)
            navigate('/')
        } else {
            setError("Login failed. Please check your credentials.")
        }
    };

    useEffect(() => {
        localStorage.setItem('loggedIn', 'false');
    }, []);

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
                    label="Username"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Typography variant="body2" sx={{ mt: 2 }}>
                Don&#39;t have an account? <a href="/register">Sign up</a>
            </Typography>
        </Container>
    );
};

export default Login;
