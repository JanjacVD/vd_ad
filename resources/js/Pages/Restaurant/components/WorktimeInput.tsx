import Checkbox from "@/Components/Checkbox";
import { WorktimeSchedule } from "../restaurants.types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";

const days: (keyof WorktimeSchedule)[] = [1, 2, 3, 4, 5, 6, 0];
const WorktimeInput = ({
    data,
    setData,
}: {
    data: WorktimeSchedule;
    setData: (schedule: WorktimeSchedule) => void;
}) => {
    const { t } = useTranslation();
    const [sameForEveryDay, setSameForEveryDay] = useState(true);

    const handleCheckDay = (day: keyof WorktimeSchedule, checked: boolean) => {
        setData({
            ...data,
            [day]: { ...data[day], isWorking: checked },
        });
    };

    const handleChangeTimeForAll = (value: string, key: "from" | "to") => {
        let worktime = data;
        days.forEach((day) => {
            if (worktime[day]?.isWorking)
                worktime = {
                    ...worktime,
                    [day]: { ...worktime[day], [key]: value },
                };
        });
        setData(worktime);
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
        <div>
            <div className="block mt-4">
                <label className="flex items-center">
                    <Checkbox
                        name="remember"
                        className="w-5 h-5"
                        checked={sameForEveryDay}
                        onChange={(e) => setSameForEveryDay(e.target.checked)}
                    />
                    <span className="ms-2 text-lg text-gray-600">
                        {t("restaurants.form.worktimeSame")}
                    </span>
                </label>
                {sameForEveryDay && (
                    <div>
                        <div>
                            {t("restaurants.form.from")}
                            <TextInput
                                className="mx-2"
                                type="time"
                                onChange={(e) =>
                                    handleChangeTimeForAll(
                                        e.target.value,
                                        "from"
                                    )
                                }
                            />
                        </div>
                        {t("restaurants.form.to")}
                        <TextInput
                            className="mx-2"
                            type="time"
                            onChange={(e) =>
                                handleChangeTimeForAll(e.target.value, "to")
                            }
                        />
                    </div>
                )}
            </div>
            <table className="w-full">
                {days.map((day) => (
                    <tr>
                        <td colSpan={2}>
                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    className="w-5 h-5 mr-2"
                                    checked={data[day]?.isWorking}
                                    onChange={(e) =>
                                        handleCheckDay(day, e.target.checked)
                                    }
                                />
                                <p>{t(("days." + day) as any)}</p>
                            </div>
                        </td>
                        {!sameForEveryDay && data[day]?.isWorking && (
                            <td>
                                {t("restaurants.form.from")}
                                <TextInput
                                    className="mx-2"
                                    value={data[day]?.from}
                                    type="time"
                                    onChange={(e) =>
                                        handleChangeTime(
                                            day,
                                            e.target.value,
                                            "from"
                                        )
                                    }
                                />
                                {t("restaurants.form.to")}
                                <TextInput
                                    className="mx-2"
                                    value={data[day]?.to}
                                    type="time"
                                    onChange={(e) =>
                                        handleChangeTime(
                                            day,
                                            e.target.value,
                                            "to"
                                        )
                                    }
                                />
                            </td>
                        )}
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default WorktimeInput;
