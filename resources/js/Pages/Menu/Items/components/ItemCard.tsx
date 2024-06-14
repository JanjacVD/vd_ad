import Dialog from "@/Components/Dialog";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import SecondaryButton from "@/Components/SecondaryButton";
import i18n from "@/i18n";
import { Translatable } from "@/types/common.types";
import { imagePath } from "@/utils/storage";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

type TProps = {
    name: Translatable;
    img: string;
    id: number;
};
const ItemCard = ({ img, name, id }: TProps) => {
    const { t } = useTranslation();
    const handleDelete = () => {
        router.delete(
            route("items.destroy", {
                item: id,
            })
        );
    };
    return (
        <div className="flex flex-col lg:flex-row w-full border border-gray-500 rounded-lg bg-white my-4">
            <img
                className="lg:w-60 lg:mr-5"
                src={`${imagePath}${img}`}
                alt="IMG"
            />
            <p className="text-lg font-semibold p-5">
                {name[i18n.language as keyof Translatable]}
            </p>
            <div className="ml-auto lg:w-auto place-items-center w-full lg:text-right grid grid-cols-3 gap-x-2">
                <NavlinkPrimary href="">{t("common.edit")}</NavlinkPrimary>
                <NavlinkPrimary href={""}>
                    {t("categories.gotoItems")}
                </NavlinkPrimary>
                <Dialog
                    actions={[
                        { title: t("common.delete"), callback: handleDelete },
                        { title: t("common.cancel") },
                    ]}
                    description={t("categories.alerts.deleteDesc")}
                    title={t("categories.alerts.delete")}
                >
                    <SecondaryButton className="!bg-red-500 text-white">
                        {t("common.delete")}
                    </SecondaryButton>
                </Dialog>
            </div>
        </div>
    );
};

export default ItemCard;
