export const getUnitForTitle = (title: string): string => {
    switch (title) {
        case "steps":
            return "steps";
        case "water":
            return "liters";
        case "sleep":
            return "hours";
        case "weight":
            return "kg";
        default:
            return "units";
    }
};