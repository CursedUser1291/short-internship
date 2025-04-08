import NavBar from "../components/NavBar.tsx";
import {CssVarsProvider, Typography} from "@mui/joy";

const Sleep = () => {
    return (
        <CssVarsProvider>
            <Typography level="h3" sx={{textAlign:'center'}}>
                Your sleep statistics
            </Typography>
            <NavBar />
        </CssVarsProvider>
    )
}

export default Sleep