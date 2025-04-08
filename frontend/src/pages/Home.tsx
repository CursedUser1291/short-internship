import { CssVarsProvider, Typography } from "@mui/joy";
import NavBar from "../components/NavBar.tsx";
import StepsCard from "../components/StepsCard.tsx";
import WaterCard from "../components/WaterCard.tsx";
import SleepCard from "../components/SleepCard.tsx";
import WeightCard from "../components/WeightCard.tsx";

const Home = () => {
    return (
        <CssVarsProvider>
            <Typography level="h3" sx={{textAlign:'center'}}>
                Welcome to Checkup.
                Today&#39;s health check
            </Typography>
            <NavBar />
            <StepsCard />
            <WaterCard />
            <SleepCard />
            <WeightCard />
        </CssVarsProvider>
    );
}

export default Home;