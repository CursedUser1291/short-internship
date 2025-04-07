import { CssVarsProvider} from "@mui/joy";
import NavBar from "./components/NavBar.tsx";
import StepsCard from "./components/StepsCard.tsx";
import WaterCard from "./components/WaterCard.tsx";
import SleepCard from "./components/SleepCard.tsx";
import WeightCard from "./components/WeightCard.tsx";


export default function App() {
    return (
        <CssVarsProvider>
            <NavBar />
            <StepsCard />
            <WaterCard />
            <SleepCard />
            <WeightCard />
        </CssVarsProvider>
    );
}
