import { Box } from "@mui/joy";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
import MetricBox from "../components/MetricBox";
import {Titles} from "../enums/Titles.ts";
import CardColorGuide from "../components/CardColorGuide.tsx";

const Home = () => {
    return (
            <Box>
                <NavBar />
                <Greeting />

                <CardColorGuide />
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
                    recommended="2.8"
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
    )
}

export default Home;
