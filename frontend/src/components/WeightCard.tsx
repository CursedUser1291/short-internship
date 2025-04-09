import MetricCard from "./MetricCardProps.tsx";
import {useHealthMetrics} from "../context/HealthMetricsContext.tsx";

const WeightCard = () => {
    const { user } = useHealthMetrics();
    if (!user) return <div>Loading...</div>;

    const latestMetric = user.healthMetrics[0];

    const amountDone = latestMetric.weight;
    const goal = latestMetric.weightGoal;

    let toGoal: number;
    if (amountDone > goal) {
        toGoal = (Math.round((parseFloat(amountDone) - parseFloat(goal)) * 100) / 100)
    } else {
        toGoal = (Math.round((parseFloat(goal) - parseFloat(amountDone)) * 100) / 100)
    }
    return (
        <div>
            <MetricCard
                title = "Weight"
                mainValue ={amountDone.toString()}
                unit = "Kilograms"
                goal ={goal.toString()}
                amountToGoal = {toGoal.toString()}
            />
        </div>
    )
}

export default WeightCard