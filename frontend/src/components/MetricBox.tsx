import { Box } from "@mui/joy";
import MetricCard from "./MetricCardProps";
import NoEntryCard from "./NoEntryCard";
import { useHealthMetrics } from "../context/HealthMetricsContext";

interface MetricBoxProps {
    title: string;
    metricKey: string;
    goalKey: string;
    unit: string;
    recommended: string;
}

const MetricBox = ({ title, metricKey, goalKey, unit, recommended }: MetricBoxProps) => {
    const { user } = useHealthMetrics();

    if (!user) return <div>Loading...</div>;

    const todayMetric = user.healthMetrics.find(
        (metric) => metric.date === new Date().toISOString().split("T")[0]
    );

    if (!todayMetric) {
        return <NoEntryCard title={title.toLowerCase()} />;
    }

    const mainValue = todayMetric[metricKey];
    const goalValue = todayMetric[goalKey];

    const amountToGoal = (parseInt(goalValue) - parseInt(mainValue)).toString();
    const amountToDaily = (parseInt(recommended) - parseInt(mainValue)).toString();

    return (
        <Box mb={3}>
            <MetricCard
                title={title}
                mainValue={mainValue}
                unit={unit}
                goal={goalValue.toString()}
                recommended={recommended}
                amountToGoal={amountToGoal}
                amountToDaily={amountToDaily}
            />
        </Box>
    );
};

export default MetricBox;
