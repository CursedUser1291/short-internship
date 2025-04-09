import MetricCard from "./MetricCardProps.tsx";
import { useHealthMetrics } from "../context/HealthMetricsContext.tsx";

const SleepCard = () => {
    const { user } = useHealthMetrics();
    if (!user) return <div>Loading...</div>;

    const latestMetric = user.healthMetrics[0];

    const amountDone = latestMetric.sleep;
    const goal = latestMetric.sleepGoal;
    const daily = 10000.00;

    const amountToDaily = (daily - parseFloat(amountDone));
    const toDaily = (Math.round((amountToDaily) * 100) / 100)

    const amountToGoal = (parseFloat(goal) - parseFloat(amountDone));
    const toGoal = (Math.round((amountToGoal) * 100) / 100)

    return (
        <div>
            <MetricCard
                title="Sleep"
                mainValue={amountDone}
                unit="hours"
                goal={goal.toString()}
                recommended={daily.toString()}
                amountToGoal={toGoal.toString()}
                amountToDaily={toDaily.toString()}
            />
        </div>
    );
};

export default SleepCard;
