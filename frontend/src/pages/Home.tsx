import { Box, CssVarsProvider } from "@mui/joy";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
import MetricBox from "../components/MetricBox";
import {Titles} from "../enums/Titles.ts";

const Home = () => {
    return (
        <CssVarsProvider>
            <Box>
                <NavBar />
                <Greeting />

                <MetricBox
                    title={Titles.STEPS}
                    metricKey="steps"
                    goalKey="stepGoal"
                    unit="steps"
                    recommended="10000"
                />
                <MetricBox
                    title={Titles.WATER}
                    metricKey="water"
                    goalKey="waterGoal"
                    unit="liters"
                    recommended="3.7"
                />
                <MetricBox
                    title={Titles.SLEEP}
                    metricKey="sleep"
                    goalKey="sleepGoal"
                    unit="hours"
                    recommended="8"
                />
                <MetricBox
                    title={Titles.WEIGHT}
                    metricKey="weight"
                    goalKey="weightGoal"
                    unit="kg"
                    recommended="70"
                />
            </Box>
        </CssVarsProvider>
    );
};

export default Home;
