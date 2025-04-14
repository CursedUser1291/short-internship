type Unit = "steps" | "water" | "sleep" | "weight";

export const getUnitForTitle = (title: Unit): string => {
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