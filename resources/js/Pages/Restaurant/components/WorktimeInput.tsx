import Checkbox from "@/Components/Checkbox";
import { WorktimeSchedule } from "../restaurants.types";
import { useRef, useState } from "react";
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
    const [{ sameFrom, sameTo }, setSameTime] = useState({
        sameFrom: "",
        sameTo: "",
    });

    const handleCheckDay = (day: keyof WorktimeSchedule, checked: boolean) => {
        let worktime: WorktimeSchedule = { ...data };
        worktime[day] = {
            day: day,
            isWorking: checked,
            from: sameForEveryDay ? sameFrom : "",
            to: sameForEveryDay ? sameTo : "",
        };
        setData(worktime);
        console.log(data, worktime);
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
                                    value={data[day]?.from}
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
                                    value={data[day]?.to}
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
    // return (
    // <div>
    //     <div className="block mt-4">
    //         <label className="flex items-center">
    //             <Checkbox
    //                 name="remember"
    //                 className="w-5 h-5"
    //                 checked={sameForEveryDay}
    //                 onChange={(e) => setSameForEveryDay(e.target.checked)}
    //             />
    //             <span className="ms-2 text-lg text-gray-600">
    //                 {t("restaurants.form.worktimeSame")}
    //             </span>
    //         </label>
    //         {sameForEveryDay && (
    //             <div>
    //                 <div>
    //                     {t("restaurants.form.from")}
    //                     <TextInput
    //                         className="mx-2"
    //                         type="time"
    //                         onChange={(e) =>
    //                             handleChangeTimeForAll(
    //                                 e.target.value,
    //                                 "from"
    //                             )
    //                         }
    //                     />
    //                 </div>
    //                 {t("restaurants.form.to")}
    //                 <TextInput
    //                     className="mx-2"
    //                     type="time"
    //                     onChange={(e) =>
    //                         handleChangeTimeForAll(e.target.value, "to")
    //                     }
    //                 />
    //             </div>
    //         )}
    //     </div>
    //     {days.map((day) => (
    //         <div key={day}>
    //             <div className="flex flex-row mt-2">
    //                 <Checkbox
    //                     className="w-5 h-5 mr-2"
    //                     checked={data[day]?.isWorking}
    //                     onChange={(e) =>
    //                         handleCheckDay(day, e.target.checked)
    //                     }
    //                 />
    //                 <p>{t(("days." + day) as any)}</p>
    //             </div>
    //             <div>
    //                 {!sameForEveryDay && data[day]?.isWorking && (
    //                     <div>
    //                         {t("restaurants.form.from")}
    //                         <TextInput
    //                             className="mx-2"
    //                             value={data[day]?.from}
    //                             type="time"
    //                             onChange={(e) =>
    //                                 handleChangeTime(
    //                                     day,
    //                                     e.target.value,
    //                                     "from"
    //                                 )
    //                             }
    //                         />
    //                         {t("restaurants.form.to")}
    //                         <TextInput
    //                             className="mx-2"
    //                             value={data[day]?.to}
    //                             type="time"
    //                             onChange={(e) =>
    //                                 handleChangeTime(
    //                                     day,
    //                                     e.target.value,
    //                                     "to"
    //                                 )
    //                             }
    //                         />
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     ))}
    // </div>
    // );
};

export default WorktimeInput;
