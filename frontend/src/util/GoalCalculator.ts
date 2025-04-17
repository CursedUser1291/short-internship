export const calculateAmountToDaily = (dailyGoal: string, metricValue: string): string => (
    Math.round((parseFloat(dailyGoal) - parseFloat(metricValue)) * 10) / 10).toString();

export const calculateAmountToGoal = (goal: string, metricValue: string): string => (
    Math.round((parseFloat(goal) - parseFloat(metricValue)) * 10) / 10).toString();