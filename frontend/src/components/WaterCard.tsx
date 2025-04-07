import MetricCard from "./MetricCardProps.tsx";

const amountDone  = 1
const goal = 3
const daily = 3.7

const toDaily = (Math.round((daily - amountDone) * 100) / 100)

const WaterCard = () => {
    return (
        <div>
            <MetricCard
                title = "Water"
                mainValue ={amountDone}
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