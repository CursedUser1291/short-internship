import React, {useEffect, useState} from 'react'
import { Box, Button, TextField, Typography, Container } from '@mui/material'
import {handleLogin} from "../util/AuthHandler.ts"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useHealthMetrics} from "../context/HealthMetricsContext.tsx"

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useHealthMetrics()

    useEffect(() => {
        localStorage.setItem('loggedIn', 'false')
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('Passwords do not match!')
            return
        }
        setError('')

        try {
            const payload = { username, password };
            await axios.post('http://localhost:8040/api/register', payload);
            await handleLogin(username, password, login, navigate, setError)
        } catch (err) {
            setError('Registration failed. Please try again.')
            console.error(err)
        }
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
                Register an Account
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && (
                    <Typography sx={{ color: 'red', fontSize: '14px' }}>
                        {error}
                    </Typography>
                )}

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
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
