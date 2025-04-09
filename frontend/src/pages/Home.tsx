import { Box, CssVarsProvider } from "@mui/joy";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
import MetricBox from "../components/MetricBox";

const Home = () => {
    return (
        <CssVarsProvider>
            <Box>
                <NavBar />
                <Greeting />

                <MetricBox
                    title="Steps"
                    metricKey="steps"
                    goalKey="stepGoal"
                    unit="steps"
                    recommended="10000"
                />
                <MetricBox
                    title="Water"
                    metricKey="water"
                    goalKey="waterGoal"
                    unit="liters"
                    recommended="3.7"
                />
                <MetricBox
                    title="Sleep"
                    metricKey="sleep"
                    goalKey="sleepGoal"
                    unit="hours"
                    recommended="8"
                />
                <MetricBox
                    title="Weight"
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
