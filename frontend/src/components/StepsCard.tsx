import MetricCard from "./MetricCardProps.tsx"
import DailyGoals from "../enums/DailyGoals.ts"

const amountDone  = 7216
const goal = 9000
const daily = DailyGoals.STEPS

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