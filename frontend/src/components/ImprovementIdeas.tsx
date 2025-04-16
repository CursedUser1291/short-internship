import { Box, Typography } from "@mui/joy";

interface ImprovementIdeasProps {
    title: string
    mainValues: number[]
}

const ImprovementIdeas = ({ title, mainValues }: ImprovementIdeasProps) => {
    const averageValue = Math.round(mainValues.reduce((sum, value) => sum + value, 0) / mainValues.length * 100) / 100
    const intros: Record<string, string> = {
        steps: `For the past 7 days, you have moved ${Math.round(averageValue)} steps on average.`,
        water: `For the past 7 days, you have drunk ${averageValue} liters of water per day on average.`,
        sleep: `For the past 7 days, you have slept ${averageValue} hours per night on average.`
    }

    const thresholds: Record<string, { min: number, max: number, comment: string }[]> = {
        steps: [
            { min: 0, max: 5000, comment: `You don't have a healthy amount of steps. Let's go on a walk!` },
            { min: 5000, max: 7000, comment: `That's not bad! We're getting there. Let's go on a walk.` },
            { min: 7000, max: 9000, comment: `You're doing great! Just one last push.` },
            { min: 9000, max: Infinity, comment: `You're doing amazing. Keep it up!` },
        ],
        water: [
            { min: 0, max: 1, comment: `Your body needs more water.` },
            { min: 1, max: 2, comment: `You're getting there! Try to drink more regularly.` },
            { min: 2, max: 2.5, comment: `That's almost perfect. Just a little more!` },
            { min: 2.5, max: Infinity, comment: `Great job staying hydrated!` },
        ],
        sleep: [
            { min: 0, max: 6, comment: `That's below the recommended amount. Try sleeping earlier.` },
            { min: 6, max: 7, comment: `That's not bad, but a bit more sleep would help.` },
            { min: 7, max: 8, comment: `That's a healthy amount of sleep!` },
            { min: 8, max: Infinity, comment: `Excellent! Keep that sleep rhythm going.` },
        ]
    }

    const evaluateStatus = (): string => {
        const key = title.toLowerCase()
        const intro = intros[key]
        const ranges = thresholds[key]

        if (key === "weight") {
            return ""
        }

        const range = ranges.find(r => averageValue >= r.min && averageValue < r.max)
        return range ? `${intro} ${range.comment}` : "Invalid value"
    };

    return (
        <Box display="flex" alignItems="center" mb={1}>
            <Typography level="h4">{evaluateStatus()}</Typography>
        </Box>
    )
}

export default ImprovementIdeas
