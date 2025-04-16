import { Box, Typography } from "@mui/joy"
import MetricCard from "./MetricCardProps"
import NoEntryCard from "./NoEntryCard"
import { useHealthMetrics } from "../context/HealthMetricsContext"
import { DirectionsWalk, LocalDrink, Hotel, FitnessCenter } from "@mui/icons-material"
import useModal from "../hooks/useModal.ts"
import {calculateAmountToDaily, calculateAmountToGoal} from "../util/GoalCalculator.ts"
import {Titles} from "../enums/Titles.ts"
import ImprovementIdeas from "./ImprovementIdeas.tsx";

interface MetricBoxProps {
    title: string
    metricKey: string
    goalKey: string
    unit: string
    recommended: string
}

const MetricBox = ({ title, metricKey, goalKey, unit, recommended }: MetricBoxProps) => {
    const {user} = useHealthMetrics()
    const { isModalOpen, handleOpenModal, handleCloseModal } = useModal()

    if (!user) return <div>Loading...</div>

    const mainValueWeek = user.healthMetrics
        .filter((metric) => {
            const metricDate = new Date(metric.date)
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            return metricDate >= sevenDaysAgo && metricDate <= new Date()
        })
        .map((metric) => parseFloat(metric[metricKey]))
        .filter((value) => !isNaN(value))

    const todayMetric = user.healthMetrics.find(
        (metric) => metric.date === new Date().toISOString().split("T")[0]
    );

    const getIcon = (title: string) => {
        switch (title) {
            case Titles.STEPS:
                return <DirectionsWalk sx={{fontSize: "40px", marginRight: "8px",  color: "neutral"}}/>
            case Titles.WATER:
                return <LocalDrink sx={{fontSize: "40px", marginRight: "8px"}}/>
            case Titles.SLEEP:
                return <Hotel sx={{fontSize: "40px", marginRight: "8px"}}/>
            case Titles.WEIGHT:
                return <FitnessCenter sx={{fontSize: "40px", marginRight: "8px"}}/>
            default:
                return null
        }
    }

    //If no entry in DB found
    if (!todayMetric) {
        return (
            <>
                <Box display="flex" alignItems="center" mb={1}>
                    {getIcon(title)}
                    <Typography level="h4">{title}</Typography>
                </Box>
                <ImprovementIdeas  title={title} mainValues={mainValueWeek} />
                <NoEntryCard
                    title={title.toLowerCase()}
                />
                <ImprovementIdeas  title={title} mainValues={mainValueWeek} />
            </>
        )
    }

    const mainValue = todayMetric[metricKey]
    const goalValue = todayMetric[goalKey]

    const amountToGoal = calculateAmountToGoal(goalValue, mainValue)
    const amountToDaily = calculateAmountToDaily(recommended, mainValue)

    //If entry in DB found but steps is empty
    if (todayMetric?.[metricKey] === null) {
        return (
            <>
                <Box display="flex" alignItems="center" mb={1}>
                    {getIcon(title)}
                    <Typography level="h4">{title}</Typography>
                </Box>
                <ImprovementIdeas  title={title} mainValues={mainValueWeek} />
                <NoEntryCard
                    title={title.toLowerCase()}
                />
            </>
        )
    }

    return (
        <Box mt={5}>
            <Box display="flex" alignItems="center" mb={1}>
                {getIcon(title)}
                <Typography level="h4">{title}</Typography>
            </Box>
            <ImprovementIdeas  title={title} mainValues={mainValueWeek}/>
            <MetricCard
                title={title}
                mainValue={mainValue}
                unit={unit}
                goal={goalValue}
                recommended={recommended}
                amountToGoal={amountToGoal}
                amountToDaily={amountToDaily}
                isModalOpen={isModalOpen}
                handleOpenModal={() => handleOpenModal("update", { mainValue, goalValue })}
                handleCloseModal={handleCloseModal}
                currentMetric={{id: todayMetric.id, mainValue, goalValue}} modalMode={"update"}/>
        </Box>
    )
}

export default MetricBox