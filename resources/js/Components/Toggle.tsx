import SecondaryButton from "./SecondaryButton";
type TProps<T> = {
    labelKey: keyof T;
    valueKey: keyof T;
};
type TToggleProps<T> = TProps<T> & {
    option: T;
    selected: boolean;
    handleClick: (selected: boolean, val: T[keyof T]) => void;
};
type TToggleGroupProps<T> = TProps<T> & {
    options: T[];
    values: (string | number | T)[];
    setData: (values: number[]) => void;
};

const Toggle = <T extends object>({
    labelKey,
    option,
    valueKey,
    handleClick,
    selected,
}: TToggleProps<T>) => {
    return (
        <SecondaryButton
            type="button"
            data-selected={selected}
            className="data-[selected=true]:bg-blue-200 mx-2"
            onClick={() =>
                handleClick(
                    selected,
                    getNestedValue(option, valueKey as string)
                )
            }
        >
            {getNestedValue(option, labelKey as string) as string}
        </SecondaryButton>
    );
};
const getNestedValue = <T extends object>(obj: T, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj as any);
};

const ToggleGroup = <T extends Object>({
    setData,
    options,
    values,
    labelKey,
    valueKey,
}: TToggleGroupProps<T>) => {
    const handleClick = (selected: boolean, value: T[keyof T]) => {
        if (selected)
            setData(values.filter((val) => val !== value) as number[]);
        else setData([...values, value] as number[]);
    };

    return (
        <div>
            {options.map((option, index) => (
                <Toggle
                    key={index}
                    labelKey={labelKey}
                    valueKey={valueKey}
                    option={option}
                    selected={values.includes(
                        Number(getNestedValue(option, valueKey as string))
                    )}
                    handleClick={handleClick}
                />
            ))}
        </div>
    );
};

export default ToggleGroup;
