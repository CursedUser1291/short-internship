import MetricCard from "./MetricCardProps.tsx";
import DailyGoals from "../enums/DailyGoals.ts"

const amountDone  = 1
const goal = 3
const daily = DailyGoals.WATER

const toDaily = (Math.round((daily - amountDone) * 100) / 100)

const WaterCard = () => {
    return (
        <div>
            <MetricCard
                title = "Water"
                mainValue ={amountDone.toString()}
                unit = "Litres"
                goal ={goal.toString()}
                recommended = {daily.toString()}
                amountToGoal = {goal - amountDone}
                amountToDaily = {toDaily}
            />
        </div>
    )
}

export default WaterCard