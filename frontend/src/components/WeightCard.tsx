import MetricCard from "./MetricCardProps.tsx";

const amountDone = 61
const goal = 60
let toGoal: number;

if (amountDone > goal) {
    toGoal = (Math.round((amountDone - goal) * 100) / 100)
} else {
    toGoal = (Math.round((goal - amountDone) * 100) / 100)
}

const WeightCard = () => {
    return (
        <div>
            <MetricCard
                title = "Weight"
                mainValue ={amountDone.toString()}
                unit = "Kilograms"
                goal ={goal.toString()}
                amountToGoal = {toGoal}
            />
        </div>
    )
}

export default WeightCard