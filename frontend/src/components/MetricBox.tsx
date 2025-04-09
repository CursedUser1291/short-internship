import { Add } from '@mui/icons-material'
import { Card, CardContent, Typography, Box, IconButton } from '@mui/joy'
import DateFormatter from "../util/DateFormatter"
import { JSX } from 'react'

interface MetricCardProps {
    title: string
    mainValue: string
    unit: string
    goal?: string
    recommended?: string
    amountToGoal?: string
    amountToDaily?: string
    date?: string
    icon?: JSX.Element
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
                        icon,
                    }: MetricCardProps) => {

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
            amountToGoalNum = mainValueNum - parseFloat(goal ?? "0")
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

    const renderTitleWithIcon = () => (
        <Box display="flex" alignItems="center" mb={1}>
            {icon}
            <Typography level="body-sm" sx={{ ml: 1 }}>
                {title}
            </Typography>
        </Box>
    );

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                {date && (
                    <Typography level="body-sm" sx={{ mb: 1 }}>
                        {DateFormatter.formatDate(date)}
                    </Typography>
                )}

                {renderTitleWithIcon()}

                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography level="h3" sx={{ fontSize: "35px" }}>
                        {mainValue} {mainUnitText}
                    </Typography>
                    <IconButton><Add /></IconButton>
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
    );
};

export default MetricCard;