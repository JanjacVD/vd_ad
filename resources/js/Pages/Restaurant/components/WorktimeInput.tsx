import Checkbox from "@/Components/Checkbox";
import { WorktimeSchedule } from "../restaurants.types";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import {
    areWorktimesEqual,
    getFirstNonNullWorktimeIfEqual,
} from "@/utils/worktimeHelper";

const days: (keyof WorktimeSchedule)[] = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
];
const WorktimeInput = ({
    data,
    setData,
    mode = "create",
}: {
    data: WorktimeSchedule;
    setData: (schedule: WorktimeSchedule) => void;
    mode?: "create" | "edit";
}) => {
    const [isEqual, defaultValue] = useMemo(
        () => [areWorktimesEqual(data), getFirstNonNullWorktimeIfEqual(data)],
        []
    );
    const { t } = useTranslation();
    const [sameForEveryDay, setSameForEveryDay] = useState(
        mode === "create" ? true : isEqual
    );
    const [{ sameFrom, sameTo }, setSameTime] = useState({
        sameFrom: defaultValue.from,
        sameTo: defaultValue.to,
    });

    const handleCheckDay = (day: keyof WorktimeSchedule, checked: boolean) => {
        let worktime: WorktimeSchedule = { ...data };
        worktime[day] = checked
            ? {
                  from: sameForEveryDay ? sameFrom : "",
                  to: sameForEveryDay ? sameTo : "",
              }
            : null;
        setData({ ...worktime });
    };

    const handleChangeTime = (
        day: keyof WorktimeSchedule,
        value: string,
        key: "from" | "to"
    ) => {
        setData({
            ...data,
            [day]: {
                ...data[day],
                [key]: value,
            },
        });
    };
    return (
        <div className="mt-4">
            <p className="pb-2">{t("restaurants.form.worktime")}</p>
            <div className="flex items-center py-1 flex-wrap">
                <Checkbox
                    className="mr-2 w-5 h-5"
                    checked={sameForEveryDay}
                    onChange={() => setSameForEveryDay((prev) => !prev)}
                />
                <p>{t("restaurants.form.worktimeSame")}</p>
                {sameForEveryDay && (
                    <div className="w-full flex">
                        <div className="pr-2">
                            {t("restaurants.form.from")}
                            <TextInput
                                type="time"
                                value={sameFrom}
                                onChange={(e) =>
                                    setSameTime((prev) => ({
                                        ...prev,
                                        sameFrom: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            {t("restaurants.form.to")}
                            <TextInput
                                type="time"
                                value={sameTo}
                                onChange={(e) =>
                                    setSameTime((prev) => ({
                                        ...prev,
                                        sameTo: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {days.map((day) => (
                <div key={day} className="flex items-center py-1 flex-wrap">
                    <Checkbox
                        className="mr-2 w-5 h-5"
                        checked={data[day] !== null}
                        disabled={sameForEveryDay && (!sameFrom || !sameTo)}
                        onChange={(e) => handleCheckDay(day, e.target.checked)}
                    />
                    <p>{t(("days." + day) as any)}</p>
                    {!sameForEveryDay && (
                        <div className="w-full flex">
                            <div className="pr-2">
                                {t("restaurants.form.from")}
                                <TextInput
                                    type="time"
                                    value={data[day]?.from ?? ""}
                                    onChange={(e) =>
                                        handleChangeTime(
                                            day,
                                            e.target.value,
                                            "from"
                                        )
                                    }
                                />
                            </div>
                            <div>
                                {t("restaurants.form.to")}
                                <TextInput
                                    type="time"
                                    value={data[day]?.to ?? ""}
                                    onChange={(e) =>
                                        handleChangeTime(
                                            day,
                                            e.target.value,
                                            "to"
                                        )
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WorktimeInput;
