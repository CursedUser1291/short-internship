import NavBar from "../components/NavBar.tsx";
import {CssVarsProvider, Typography} from "@mui/joy";

const Water = () => {
    return (
        <CssVarsProvider>
            <Typography level="h3" sx={{textAlign:'center'}}>
                Your water statistics
            </Typography>
            <NavBar />
        </CssVarsProvider>
    )
}

export default Water