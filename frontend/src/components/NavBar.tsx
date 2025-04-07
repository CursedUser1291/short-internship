import { Box, Button } from '@mui/joy';

const NavBar = () => {
    const buttons = ['Home', 'Steps', 'Water', 'Sleep', 'Weight'];

    return (
        <Box
            sx={{
        display: 'flex',
            overflowX: 'auto',
            gap: 2,
            padding: 1,
            maxWidth: '100%',
            '&::-webkit-scrollbar': {
            display: 'none'
        },
    }}
>
    {buttons.map((label, index) => (
        <Button
            key={label}
        variant={index === 0 ? 'solid' : 'outlined'}
        color="neutral"
        sx={{ flexShrink: 0, minWidth: '100px' }}
    >
        {label}
        </Button>
    ))}
    </Box>
);
};

export default NavBar;
