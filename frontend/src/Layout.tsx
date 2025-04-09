import { Box, IconButton, Typography } from "@mui/joy";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("user")
        navigate('/login')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    background: 'linear-gradient(to right, teal, purple)',
                    height: '60px',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <Typography
                    level="h3"
                    sx={{
                        fontSize: '30px',
                        marginLeft: '10px',
                        color: 'white'
                    }}
                >
                    CheckUp
                </Typography>
                <IconButton
                    onClick={() => logOut()}
                    sx={{
                        marginRight: '10px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                >
                    <Person sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, paddingTop: '60px' }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;
