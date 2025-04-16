import { Box, Typography, Select, Option } from "@mui/joy"
import MetricCard from "../components/MetricCardProps"
import { useHealthMetrics } from "../context/HealthMetricsContext"
import NavBar from "../components/NavBar"
import NoEntryCard from "../components/NoEntryCard"
import {useState} from "react";
import {calculateAmountToDaily, calculateAmountToGoal} from "../util/GoalCalculator.ts";
import HealthChart from "../components/HealthChart.tsx";
import NoHistoryEntryCard from "../components/NoHistoryEntryCard.tsx";
import {getAllMissingDates} from "../util/dateUtils.ts";

interface MetricPageProps {
    title: string
    metricKey: string
    goalKey: string
    dailyGoal: string
    unit: string
}

const MetricPage = ({ title, metricKey, goalKey, dailyGoal, unit }: MetricPageProps) => {
    const { user } = useHealthMetrics()
    const [isModalOpen, setModalOpen] = useState(false)
    const [filter, setFilter] = useState<string>("");

    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    if (!user) return <div>Loading...</div>
    const todayMetric = user.healthMetrics.find(metric => metric.date === new Date().toISOString().split('T')[0])
    const latestMetric = todayMetric ?? null

    const history = user.healthMetrics.filter(metric => metric.date !== latestMetric?.date)
    history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const allMissingDates = getAllMissingDates(history)

    return (
        <Box>
            <NavBar />
            <Typography level="h3" sx={{ mb: 2 }}>
                {title} Summary
            </Typography>

            {latestMetric?.[metricKey] != null ? (
                <>
                    <Typography>
                        Here you can track your {title.toLowerCase()} habits.
                    </Typography>
                    <MetricCard
                        title={title}
                        mainValue={latestMetric[metricKey]}
                        unit={unit}
                        goal={parseFloat(latestMetric[goalKey]).toString()}
                        recommended={dailyGoal}
                        amountToGoal={calculateAmountToGoal(latestMetric[goalKey], latestMetric[metricKey])}
                        amountToDaily={calculateAmountToDaily(dailyGoal, latestMetric[metricKey])}
                        isModalOpen={isModalOpen}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        modalMode="update"
                        currentMetric={{
                            mainValue: latestMetric[metricKey],
                            id: latestMetric.id,
                            goalValue: latestMetric[goalKey],
                        }}
                    />
                </>
            ) : (
                <NoEntryCard
                    title={title.toLowerCase()}
                />
            )}

            <Box mb={10} mt={3}>
                <Typography level="h3" sx={{ mb: 2 }}>
                    {title} Chart
                </Typography>

                <HealthChart
                    data={user.healthMetrics
                        .filter(metric => metric[metricKey] != null)
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map(metric => ({
                            mainValue: Number(metric[metricKey]),
                            goal: Number(metric[goalKey]),
                            dailyGoal: Number(dailyGoal),
                            title: title,
                            date: metric.date,
                            displayDate: new Date(metric.date).toLocaleDateString("de-DE"),
                        }))}
                />
            </Box>

            <Box mt={3}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    {title} History
                </Typography>
                {history.length > 0 ? (
                    history.map((metric, index) =>
                            metric[metricKey] != null ? (
                                <Box key={index} mb={2}>
                                    <MetricCard
                                        title={title}
                                        mainValue={metric[metricKey]}
                                        unit={unit}
                                        goal={metric[goalKey]}
                                        recommended={dailyGoal}
                                        amountToGoal={calculateAmountToGoal(metric[goalKey], metric[metricKey])}
                                        amountToDaily={calculateAmountToDaily(dailyGoal, metric[metricKey])}
                                        date={metric.date}
                                        isModalOpen={isModalOpen}
                                        handleOpenModal={handleOpenModal}
                                        handleCloseModal={handleCloseModal}
                                        modalMode="update"
                                        currentMetric={{
                                            mainValue: latestMetric?.[metricKey] ?? "",
                                            id: latestMetric?.id ?? "",
                                            goalValue: latestMetric?.[goalKey] ?? "",
                                        }}
                                    />
                                </Box>
                            ) : (
                                <NoHistoryEntryCard
                                    key={index}
                                    title={title}
                                    date={metric.date}
                                />
                            )
                        )
                ) : (
                    <Typography>No previous entries available.</Typography>
                )}
            </Box>

            <Box mt={4}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    Empty Entries
                </Typography>
                {allMissingDates.length > 0 ? (
                    <>
                        <Select
                            placeholder="Filter by month"
                            onChange={(event, newValue) => setFilter(newValue || "")}
                            sx={{ mb: 2, width: 200 }}
                        >
                            <Option value="">All</Option>
                            {Array.from(
                                new Set(
                                    allMissingDates.map(date =>
                                        new Date(date).toLocaleString("default", { month: "long", year: "numeric" })
                                    )
                                )
                            ).map((monthYear, index) => (
                                <Option key={index} value={monthYear}>
                                    {monthYear}
                                </Option>
                            ))}
                        </Select>
                        {Object.entries(
                            allMissingDates.reduce((acc, date) => {
                                const monthYear = new Date(date).toLocaleString("default", { month: "long", year: "numeric" });
                                if (!acc[monthYear]) acc[monthYear] = [];
                                acc[monthYear].push(date);
                                return acc;
                            }, {} as { [key: string]: string[] })
                        )
                            .filter(([monthYear]) => !filter || monthYear === filter)
                            .map(([monthYear, dates], index) => (
                                <Box key={index} mb={3}>
                                    <Typography level="h4" sx={{ mb: 1 }}>
                                        {monthYear}
                                    </Typography>
                                    {dates.map((date, subIndex) => (
                                        <NoHistoryEntryCard
                                            key={`${index}-${subIndex}`}
                                            title={title.toLowerCase()}
                                            date={date}
                                        />
                                    ))}
                                </Box>
                            ))}
                    </>
                ) : (
                    <Typography level="h4" sx={{ mb: 2 }}>
                        None fouYou&#39;re keeping up! Well done!
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default MetricPage;
