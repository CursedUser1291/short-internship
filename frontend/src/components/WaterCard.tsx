import MetricCard from "./MetricCardProps.tsx";

import {useHealthMetrics} from "../context/HealthMetricsContext.tsx";

const WaterCard = () => {
    const { user } = useHealthMetrics();
    if (!user) return <div>Loading...</div>;

    const latestMetric = user.healthMetrics[0];

    const amountDone = latestMetric.water;
    const goal = latestMetric.waterGoal;
    const daily = 3.7;

    const amountToDaily = (daily - parseFloat(amountDone));
    const toDaily = (Math.round((amountToDaily) * 100) / 100)

    const amountToGoal = (parseFloat(goal) - parseFloat(amountDone));
    const toGoal = (Math.round((amountToGoal) * 100) / 100)

    return (
        <div>
            <MetricCard
                title = "Water"
                mainValue ={amountDone.toString()}
                unit = "Litres"
                goal ={goal.toString()}
                recommended = {daily.toString()}
                amountToGoal = {toGoal.toString()}
                amountToDaily = {toDaily.toString()}
            />
        </div>
    )
}

export default WaterCard