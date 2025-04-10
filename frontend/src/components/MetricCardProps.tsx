import { Add } from '@mui/icons-material';
import {Card, CardContent, Typography, Box, IconButton} from '@mui/joy';
import DateFormatter from "../util/DateFormatter";
import ModalWrapper from "./ModalWrapper";
import useModal from "../hooks/useModal";
import { useHealthMetrics } from "../context/HealthMetricsContext";
import {handleSubmit} from "../util/SubmitHandler.ts";

interface MetricCardProps {
    title: string;
    mainValue: string;
    unit: string;
    goal?: string;
    recommended?: string;
    amountToGoal?: string;
    amountToDaily?: string;
    date?: string;
    isModalOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

const MetricCard = ({
    title,
    mainValue,
    unit,
    goal,
    recommended,
    amountToGoal,
    amountToDaily,
    date,
}: MetricCardProps & { modalMode: "add" | "update"; currentMetric: { mainValue: string; id: string; goalValue: string } | null }) => {
    const { isModalOpen, modalState, handleOpenModal, handleCloseModal } = useModal();
    const { setUser } = useHealthMetrics();

    const onSubmit = async (mainValue: string, goalValue: string, userId: string) => {
        await handleSubmit(mainValue, goalValue, userId, title, handleCloseModal, setUser);
    };

    let untilGoalText = ''
    let untilDailyText = ''

    const getUnitText = (value: number, unit: string) => {
        return value === 1 ? unit.slice(0, -1) : unit
    };

    if (amountToGoal !== undefined) {
        let amountToGoalNum = parseFloat(amountToGoal)
        const mainValueNum = parseFloat(mainValue)
        const goalUnitText = getUnitText(amountToGoalNum, unit)

        if (title === "Weight" && mainValueNum > parseFloat(goal ?? "0")) {
            amountToGoalNum = Math.round((mainValueNum - parseFloat(goal ?? "0")) * 10) / 10;
        }

        untilGoalText = amountToGoalNum <= 0
            ? 'Goal fulfilled!'
            : `${Math.abs(amountToGoalNum)} ${goalUnitText} left to go`
    }

    if (amountToDaily !== undefined && title !== "Weight") {
        const amountToDailyNum = parseFloat(amountToDaily)
        const dailyUnitText = getUnitText(amountToDailyNum, unit)
        untilDailyText = amountToDailyNum <= 0
            ? 'Daily target reached!'
            : `${amountToDaily} ${dailyUnitText} left to go`
    }

    const mainUnitText = getUnitText(parseFloat(mainValue), unit)

    return (
        <>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    {date && (
                        <Typography level="body-sm" sx={{ mb: 1 }}>
                            {DateFormatter.formatDate(date)}
                        </Typography>
                    )}

                    <Typography level="body-sm">{title}</Typography>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography level="h3" sx={{ fontSize: "35px" }}>
                            {mainValue} {mainUnitText}
                        </Typography>

                        <IconButton onClick={() => handleOpenModal("update", { mainValue, goalValue: goal ?? "" })}><Add /></IconButton>
                    </Box>

                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography level="body-sm">
                            {goal && <>Goal: {goal} {unit}<br />{untilGoalText}</>}
                        </Typography>
                        {title !== "Weight" && (
                            <Typography level="body-sm" textAlign="right">
                                {recommended && <>Daily Recommended: {recommended} {unit}<br />{untilDailyText}</>}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <ModalWrapper
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={title}
                mode={modalState.mode}
                currentMetric={modalState.metric}
                onSubmit={onSubmit}
                unit={unit}
            />
        </>
    );
};

export default MetricCard;