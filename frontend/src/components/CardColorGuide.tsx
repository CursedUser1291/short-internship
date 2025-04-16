import {Box, Typography} from "@mui/joy"
import {Circle} from "@mui/icons-material"

const CardColorGuide = () => {
    return (
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Typography level="h4" sx={{ mr: 3, ml: 1 }}>
                Color Guide:
            </Typography>

            <Circle color="error"/>
            <Typography sx={{ mr: 3, ml: 1 }}>
                <b>Below Goal</b> – You didn&#39;t reach your goal.
            </Typography>

            <Circle color="warning"/>
            <Typography sx={{ mr: 3, ml: 1 }}>
                <b>Almost There</b> – You&#39;re close to your goal.
            </Typography>

            <Circle sx={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }}/>
            <Typography sx={{ mr: 3, ml: 1}}>
                <b>Goal Achieved</b> – Great job meeting your goal!
            </Typography>
        </Box>
    )
}

export default CardColorGuide