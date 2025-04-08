import {CssVarsProvider, Box} from "@mui/joy";
import NavBar from "../components/NavBar.tsx";
import StepsCard from "../components/StepsCard.tsx";
import WaterCard from "../components/WaterCard.tsx";
import SleepCard from "../components/SleepCard.tsx";
import WeightCard from "../components/WeightCard.tsx";
import Greeting from "../components/Greeting.tsx";

const Home = () => {
    return (
        <CssVarsProvider>
            <Box sx={{marginTop:'70px'}}>
                <NavBar />
                <Greeting />
                <StepsCard />
                <WaterCard />
                <SleepCard />
                <WeightCard />
            </Box>
        </CssVarsProvider>
    );
};

export default Home;