import MetricCard from "./MetricCardProps.tsx";

const amountDone  = 7216
const goal = 9000
const daily = 10000

const StepsCard = () => {
    return (
        <div>
            <MetricCard
            title = "Steps"
            mainValue ={amountDone}
            unit = "Steps"
            goal ={goal.toString()}
            recommended = {daily.toString()}
            amountToGoal = {goal - amountDone}
            amountToDaily = {daily - amountDone}
            />
        </div>
    )
}

export default StepsCard