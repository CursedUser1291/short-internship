import {Add, DeleteForever} from '@mui/icons-material';
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
    const { setUser } = useHealthMetrics()

    const onSubmit = async (mainValue: string, goalValue: string, userId: string) => {
        const entryDate = date ?? new Date().toISOString().split("T")[0]
        await handleSubmit(mainValue, goalValue, userId, title, entryDate, handleCloseModal, setUser)
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

    const getDangerThreshold = (title: string): number => {
        const thresholds: { [key: string]: number } = {
            steps: 999,
            water: 1,
            sleep: 1.5,
            weight: 3.5,
        };
        return thresholds[title] || 1;
    };

    const getWarningThreshold = (title: string): number => {
        const thresholds: { [key: string]: number } = {
            steps: 999,
            water: 0.5,
            sleep: 0.7,
            weight: 1.5,
        };
        return thresholds[title] || 1;
    };

    const getCardStyle = (mainValue: string, goal: string | undefined, title: string, getDangerThreshold: (title: string) => number, getWarningThreshold: (title: string) => number) => {
        if (!goal) {
            return { variant: "outlined", color: "neutral" };
        }

        const mainValueNum = parseFloat(mainValue);
        const goalNum = parseFloat(goal);
        const dangerThreshold = getDangerThreshold(title.toLowerCase());
        const warningThreshold = getWarningThreshold(title.toLowerCase());

        if (title.toLowerCase() === "weight" && mainValueNum > goalNum && Math.abs(mainValueNum - goalNum) > dangerThreshold) {
            return { variant: "soft", color: "danger" };
        } else if (Math.abs(mainValueNum - goalNum) > dangerThreshold && mainValueNum < goalNum) {
            return { variant: "soft", color: "danger" };
        } else if (Math.abs(mainValueNum - goalNum) > warningThreshold && mainValueNum < goalNum) {
            return { variant: "soft", color: "warning" };
        }

        return { variant: "outlined", color: "neutral" };
    };

    const mainUnitText = getUnitText(parseFloat(mainValue), unit)
    const { variant, color } = getCardStyle(mainValue, goal, title, getDangerThreshold, getWarningThreshold);

    return (
        <>
            <Card variant={variant} color={color} sx={{mb: 2}}>
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

                        <div>
                        <IconButton onClick={() => handleOpenModal("update", { mainValue, goalValue: goal ?? "", date })}><Add /></IconButton>
                            <IconButton onClick={() => handleOpenModal("delete", { mainValue, goalValue: goal ?? "", date })}><DeleteForever /></IconButton>
                        </div>
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