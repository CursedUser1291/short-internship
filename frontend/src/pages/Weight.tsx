import NavBar from "../components/NavBar.tsx";
import {CssVarsProvider, Typography} from "@mui/joy";

const Weight = () => {
    return (
        <CssVarsProvider>
            <Typography level="h3" sx={{textAlign:'center'}}>
                Your weight statistics
            </Typography>
            <NavBar />
        </CssVarsProvider>
    )
}

export default Weight