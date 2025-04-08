import MetricCard from "./MetricCardProps.tsx";
import DailyGoals from "../enums/DailyGoals.ts"

const amountDone = 8
const goal = 7.8
const daily = DailyGoals.SLEEP

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