import {
    Worktime,
    WorktimeSchedule,
} from "@/Pages/Restaurant/restaurants.types";

export const areWorktimesEqual = (schedule: WorktimeSchedule): boolean => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

    let referenceWorktime: Worktime | null = null;

    for (const day of days) {
        const worktime = schedule[day];

        if (worktime) {
            if (!referenceWorktime) {
                referenceWorktime = worktime;
            } else if (
                worktime.from !== referenceWorktime.from ||
                worktime.to !== referenceWorktime.to
            ) {
                return false;
            }
        }
    }

    return true;
};

export const getFirstNonNullWorktimeIfEqual = (
    schedule: WorktimeSchedule
): Worktime => {
    if (!areWorktimesEqual(schedule)) {
        return { from: "", to: "" };
    }

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

    for (const day of days) {
        const worktime = schedule[day];
        if (worktime) {
            return worktime;
        }
    }

    return { from: "", to: "" };
};
