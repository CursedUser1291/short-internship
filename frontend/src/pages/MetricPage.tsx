import { Box, Typography } from "@mui/joy"
import MetricCard from "../components/MetricCardProps"
import { useHealthMetrics } from "../context/HealthMetricsContext"
import NavBar from "../components/NavBar"
import NoEntryCard from "../components/NoEntryCard"

interface MetricPageProps {
    title: string
    metricKey: string
    goalKey: string
    dailyGoal: string
    unit: string
}

const MetricPage = ({ title, metricKey, goalKey, dailyGoal, unit }: MetricPageProps) => {
    const { user } = useHealthMetrics();

    if (!user) return <div>Loading...</div>;
    const todayMetric = user.healthMetrics.find(metric => metric.date === new Date().toISOString().split('T')[0]);
    const latestMetric = todayMetric ?? null;

    const history = user.healthMetrics.filter(metric => metric.date !== latestMetric?.date);

    return (
        <Box>
            <NavBar />
            <Typography level="h4" sx={{ mb: 2 }}>
                {title} Summary
            </Typography>

            {latestMetric ? (
                <>
                    <Typography>
                        Here you can track your {title.toLowerCase()} habits.
                    </Typography>
                    <MetricCard
                        title={title}
                        mainValue={latestMetric?.[metricKey]}
                        unit={unit}
                        goal={parseFloat(latestMetric?.[goalKey]).toString()}
                        recommended={dailyGoal}
                        amountToGoal={(parseFloat(latestMetric?.[goalKey]) - parseFloat(latestMetric?.[metricKey])).toFixed(2).toString()}
                        amountToDaily={(parseFloat(dailyGoal) - parseFloat(latestMetric?.[metricKey])).toFixed(2).toString()}
                    />
                </>
            ) : (
                <NoEntryCard title={title.toLowerCase()}/>
            )}

            <Box mt={3}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    {title} History
                </Typography>
                {history.length > 0 ? (
                    history.map((metric, index) => (
                        <Box key={index} mb={2}>
                            <MetricCard
                                title={title}
                                mainValue={metric[metricKey]}
                                unit={unit}
                                goal={metric[goalKey]}
                                recommended={dailyGoal}
                                amountToGoal={(parseFloat(metric[goalKey]) - parseFloat(metric[metricKey])).toFixed(2).toString()}
                                amountToDaily={(parseFloat(dailyGoal) - parseFloat(metric[metricKey])).toFixed(2).toString()}
                                date={metric.date}
                            />
                        </Box>
                    ))
                ) : (
                    <Typography>No previous entries available.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default MetricPage;
