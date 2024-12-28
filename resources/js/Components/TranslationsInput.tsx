import { useTranslation } from "react-i18next";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { Translatable } from "@/types/common.types";
import { supportedLocales } from "@/locales/supportedLocales";

type TProps = {
    data: Translatable;
    setData: (value: Translatable) => void;
    label: string;
    optional?: boolean;
};
export const TranslationInputs = ({
    data,
    label,
    optional = false,
    setData,
}: TProps) => {
    const { t } = useTranslation();
    return (
        <div className="mt-5">
            <p>{label}</p>
            {supportedLocales.map((locale) => (
                <div className="mt-3 px-5" key={locale}>
                    <InputLabel
                        htmlFor={`${label}_${locale}`}
                        value={t(("locales." + locale) as any)}
                    />
                    <div className="flex items-center">
                        <TextInput
                            id={`${label}_${locale}`}
                            name={`${label}_${locale}`}
                            type="text"
                            value={data[locale]}
                            required={!optional}
                            className="mt-1 flex-1"
                            onChange={(e) =>
                                setData({ ...data, [locale]: e.target.value })
                            }
                            isFocused={true}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
