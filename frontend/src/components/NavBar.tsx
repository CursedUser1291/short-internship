import {Box, Button } from '@mui/joy'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

const NavBar = () => {


    const buttons = [
        { label: 'Home', path: '/' },
        { label: 'Steps', path: '/steps' },
        { label: 'Water', path: '/water' },
        { label: 'Sleep', path: '/sleep' },
        { label: 'Weight', path: '/weight' },
    ];

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                padding: 1,
                maxWidth: '100%',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            {buttons.map(({ label, path }) => (
                <Button
                    key={label}
                    onClick={() => navigate(path)}
                    variant={location.pathname === path ? 'solid' : 'outlined'}
                    color="neutral"
                    sx={{ flexShrink: 0, minWidth: '100px' }}
                >
                    {label}
                </Button>
            ))}
            <Box sx={{ marginLeft: 'auto' }}>
            </Box>

            <Outlet />
        </Box>
    );
};

export default NavBar;
