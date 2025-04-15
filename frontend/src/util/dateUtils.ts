export const getAllMissingDates = (history: { date: string }[]): string[] => {
    const dates: string[] = history.map(metric => metric.date);
    const oldestDate = new Date(dates[dates.length - 1]);
    const newestDate = new Date(new Date().setDate(new Date().getDate() - 1));

    const currentDate = new Date(oldestDate);
    let uniqueDates = new Set(dates);

    while (currentDate <= newestDate) {
        uniqueDates.add(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    uniqueDates = Array.from(uniqueDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const allDates = dates.concat(Array.from(uniqueDates)).filter((date, _, arr) => arr.indexOf(date) === arr.lastIndexOf(date));

    return allDates;
};