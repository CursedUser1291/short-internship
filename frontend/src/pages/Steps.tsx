import NavBar from "../components/NavBar.tsx";
import {CssVarsProvider, Typography} from "@mui/joy";

const Steps = () => {
    return (
        <CssVarsProvider>
            <Typography level="h3" sx={{textAlign:'center'}}>
                Your steps statistics
            </Typography>
            <NavBar />
        </CssVarsProvider>
    )
}

export default Steps