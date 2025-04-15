import {units} from "../enums/units.ts";

export const getUnitForTitle = (title: string): string => {
    switch (title) {
        case units.STEPS:
            return "steps";
        case units.WATER:
            return "liters";
        case units.SLEEP:
            return "hours";
        case units.WEIGHT:
            return "kg";
        default:
            return "units";
    }
};