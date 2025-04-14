import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts"
import "@fontsource/inter"

interface HealthChartProps {
    data: { mainValue: number; goal: number; dailyGoal: number; title: string; date: string }[]
}

const HealthChart = ({ data }: HealthChartProps) => {
    const [timeRange, setTimeRange] = useState<"all" | "weekly" | "monthly">("all");

    const filterDataByTimeRange = () => {
        const now = new Date();
        if (timeRange === "weekly") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            return data.filter((entry) => new Date(entry.date).getTime() >= oneWeekAgo.getTime());
        } else if (timeRange === "monthly") {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return data.filter((entry) => new Date(entry.date).getTime() >= oneMonthAgo.getTime());
        }
        return data;
    };

    const filteredData = filterDataByTimeRange();

    return (
        <div>
            <div style={{marginBottom: "16px"}}>
                <label htmlFor="timeRange" style={{marginRight: "8px", fontSize: "16px", fontFamily: "Inter"}}>
                    Time Range:
                </label>
                <select
                    id="timeRange"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as "all" | "weekly" | "monthly")}
                    style={{
                        padding: "8px",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        outline: "none",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <option value="all">All Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <LineChart width={1300} height={400} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee"/>
                <XAxis
                    dataKey="displayDate"
                    tick={{fontSize: 14, fontFamily: "Inter", fill: "#555"}}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{fontSize: 14, fontFamily: "Inter", fill: "#555"}}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    contentStyle={{
                        fontSize: 16,
                        fontFamily: "Inter",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                    itemStyle={{color: "#333"}}
                    labelStyle={{fontWeight: "bold", color: "#555"}}
                />
                <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{fontSize: 20, fontFamily: "Inter"}}
                    payload={[
                        {value: "Your Entry", type: "line", color: "#4A90E2"},
                        {value: "Daily Recommended", type: "line", color: "#35B5AC"},
                        {value: "Your Goal", type: "line", color: "#9013FE"},
                    ]}
                />
                <Line
                    type="linear"
                    dataKey="mainValue"
                    stroke="#4A90E2"
                    strokeWidth={3}
                    dot={{r: 4, strokeWidth: 2, fill: "#fff", stroke: "#4A90E2"}}
                    activeDot={{r: 6}}
                />
                {filteredData.some((item) => item.title !== "Weight") && (
                    <Line
                        type="linear"
                        dataKey="dailyGoal"
                        stroke="#35B5AC"
                        strokeWidth={3}
                        dot={{r: 4, strokeWidth: 2, fill: "#fff", stroke: "#35B5AC"}}
                        activeDot={{r: 6}}
                    />
                )}
                <Line
                    type="linear"
                    dataKey="goal"
                    stroke="#9013FE"
                    strokeWidth={3}
                    dot={{r: 4, strokeWidth: 2, fill: "#fff", stroke: "#9013FE"}}
                    activeDot={{r: 6}}
                />
            </LineChart>
        </div>
    );
};

export default HealthChart;