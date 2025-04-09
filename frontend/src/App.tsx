import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MetricPage from "./pages/MetricPage";
import Layout from "../src/Layout";
import {metricsData} from "./context/metricData.ts";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {metricsData.map(({ title, metricKey, goalKey, dailyGoal, unit }) => (
                    <Route
                        key={title}
                        path={title.toLowerCase()}
                        element={
                            <MetricPage
                                title={title}
                                metricKey={metricKey}
                                goalKey={goalKey}
                                dailyGoal={dailyGoal.toString()}
                                unit={unit}
                            />
                        }
                    />
                ))}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}
