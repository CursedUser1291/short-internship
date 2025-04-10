import { Add } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/joy';

interface MetricCardProps {
    title: string;
    mainValue: string;
    unit: string;
    goal?: string;
    recommended?: string;
    amountToGoal?: string;
    amountToDaily?: string;
}

const MetricCard = ({
                        title,
                        mainValue,
                        unit,
                        goal,
                        recommended,
                        amountToGoal,
                        amountToDaily,
                    }: MetricCardProps) => {

    let untilGoalText = ''
    let untilDailyText = ''

    const mainUnitText = mainValue !== undefined ? getUnitText(parseFloat(mainValue), unit) : ''
    const goalUnitText = amountToGoal !== undefined ? getUnitText(parseFloat(amountToGoal), unit) : ''
    const dailyUnitText = amountToDaily !== undefined ? getUnitText(parseFloat(amountToDaily), unit) : ''

    function getUnitText(value: number, unit: string) {
        return value === 1 ? `${unit.slice(0, -1)}` : `${unit}`
    }

    if (amountToGoal !== undefined) {
        const amountToGoalNum = parseFloat(amountToGoal);
        untilGoalText = amountToGoalNum <= 0
            ? 'Goal fulfilled!'
            : `${amountToGoal} ${goalUnitText} left to go`
    }

    if (amountToDaily !== undefined) {
        const amountToDailyNum = parseFloat(amountToDaily);
        untilDailyText = amountToDailyNum <= 0
            ? 'Daily target reached!'
            : `${amountToDaily} ${dailyUnitText} left to go`
    }

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography level="body-sm">{title}</Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography level="h3" sx={{ fontSize: "35px" }}>
                        {mainValue} {mainUnitText}
                    </Typography>

                    <IconButton><Add /></IconButton>
                </Box>

                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography level="body-sm">
                        {goal && <>Goal: {goal} {goalUnitText}<br />{untilGoalText}</>}
                    </Typography>
                    <Typography level="body-sm" textAlign="right">
                        {recommended && <>Daily Recommended: {recommended} {dailyUnitText}<br />{untilDailyText}</>}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
