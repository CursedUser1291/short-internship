import { Card, CardContent, Typography, Box } from '@mui/joy';

interface MetricCardProps {
    title: string;
    mainValue: number;
    unit: string;
    goal?: string;
    recommended?: string;
    amountToGoal?: number;
    amountToDaily?: number;
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

    let untilGoalText = '';
    let untilDailyText = '';

    const mainUnitText = mainValue !== undefined ? getUnitText(mainValue, unit) : '';
    const goalUnitText = amountToGoal !== undefined ? getUnitText(amountToGoal, unit) : '';
    const dailyUnitText = amountToDaily !== undefined ? getUnitText(amountToDaily, unit) : '';

    function getUnitText(value: number, unit: string) {
        return value === 1 ? `${unit.slice(0, -1)}` : `${unit}`;
    }

    if (amountToGoal !== undefined) {
        untilGoalText = amountToGoal <= 0
            ? 'Goal fulfilled!'
            : `${amountToGoal} ${goalUnitText} left to go`;
    }

    if (amountToDaily !== undefined) {
        untilDailyText = amountToDaily <= 0
            ? 'Daily target reached!'
            : `${amountToDaily} ${dailyUnitText} left to go`;
    }

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography level="body-sm">{title}</Typography>
                <Typography level="h3">
                    {mainValue} {mainUnitText}
                </Typography>

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
