import MetricCard from "./MetricCardProps.tsx";

const amountDone = 8
const goal = 7.8
const daily = 8

const SleepCard = () => {
    return (
        <div>
            <MetricCard
                title = "Sleep"
                mainValue = {amountDone}
                unit = "hours"
                goal = {goal.toString()}
                recommended = {daily.toString()}
                amountToGoal = {goal - amountDone}
                amountToDaily = {daily - amountDone}
            />
        </div>
    )
}

export default SleepCard