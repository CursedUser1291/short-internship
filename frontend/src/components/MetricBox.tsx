import { Box, Typography } from "@mui/joy";
import MetricCard from "./MetricCardProps";
import NoEntryCard from "./NoEntryCard";
import { useHealthMetrics } from "../context/HealthMetricsContext";
import { DirectionsWalk, LocalDrink, Hotel, FitnessCenter } from "@mui/icons-material";
import useModal from "../hooks/useModal.ts";
import {calculateAmountToDaily, calculateAmountToGoal} from "../util/GoalCalculator.ts";

interface MetricBoxProps {
    title: string;
    metricKey: string;
    goalKey: string;
    unit: string;
    recommended: string;
}

const MetricBox = ({ title, metricKey, goalKey, unit, recommended }: MetricBoxProps) => {
    const {user} = useHealthMetrics();
    const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

    if (!user) return <div>Loading...</div>;

    const todayMetric = user.healthMetrics.find(
        (metric) => metric.date === new Date().toISOString().split("T")[0]
    );

    const getIcon = (title: string) => {
        switch (title) {
            case "Steps":
                return <DirectionsWalk sx={{fontSize: "40px", marginRight: "8px"}}/>;
            case "Water":
                return <LocalDrink sx={{fontSize: "40px", marginRight: "8px"}}/>;
            case "Sleep":
                return <Hotel sx={{fontSize: "40px", marginRight: "8px"}}/>;
            case "Weight":
                return <FitnessCenter sx={{fontSize: "40px", marginRight: "8px"}}/>;
            default:
                return null;
        }
    };

    if (!todayMetric) {
        return (
            <>
                <Box display="flex" alignItems="center" mb={1}>
                    <Typography level="h4">{title}</Typography>
                    {getIcon(title)}
                </Box>
                <NoEntryCard
                    title={title.toLowerCase()}
                    isModalOpen={isModalOpen}
                    handleOpenModal={() => handleOpenModal("add")}
                    handleCloseModal={handleCloseModal}
                />
            </>
        );
    }

    const mainValue = todayMetric[metricKey];
    const goalValue = todayMetric[goalKey];

    const amountToGoal = calculateAmountToGoal(goalValue, mainValue);
    const amountToDaily = calculateAmountToDaily(recommended, mainValue);

    if (todayMetric?.[metricKey] === null) {
        return (
            <>
                <Box display="flex" alignItems="center" mb={1}>
                    <Typography level="h4">{title}</Typography>
                    {getIcon(title)}
                </Box>
                <NoEntryCard
                    title={title.toLowerCase()}
                    isModalOpen={isModalOpen}
                    handleOpenModal={() => handleOpenModal("add")}
                    handleCloseModal={handleCloseModal}
                />
            </>
        );
    }

    return (
        <Box mb={3}>
            <Box display="flex" alignItems="center" mb={1}>
                {getIcon(title)}
                <Typography level="h4">{title}</Typography>
            </Box>
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
    );
};

export default MetricBox;