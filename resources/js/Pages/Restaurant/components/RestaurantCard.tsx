import { useTranslation } from "react-i18next";
import { Restaurant } from "../restaurants.types";
import { imagePath } from "@/utils/storage";
import { MdCheck, MdClear } from "react-icons/md";
import SecondaryButton from "@/Components/SecondaryButton";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import { router } from "@inertiajs/react";
import Dialog from "@/Components/Dialog";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const { t } = useTranslation();
    const handleDelete = () => {
        router.delete(
            route("my-restaurants.destroy", { my_restaurant: restaurant.id })
        );
    };

    const edit = () => router.visit(route("my-restaurants.edit", restaurant));
    return (
        <div className="w-full h-auto flex flex-wrap p-5 border border-gray-500 shadow-sm bg-white rounded-md  my-5">
            <img
                className="lg:w-60 lg:mr-5"
                src={`${imagePath}${restaurant.img}`}
                alt="IMG"
            />
            <div className="flex flex-col justify-between">
                <p className="font-semibold text-xl">{restaurant.name}</p>
                <p className="flex items-center">
                    {t("restaurants.list.confirmed")}
                    {restaurant.confirmed ? (
                        <MdCheck color="green" />
                    ) : (
                        <MdClear color="red" />
                    )}
                </p>
                <NavlinkPrimary
                    href={route("categories.index", {
                        restaurant: restaurant.id,
                    })}
                >
                    {t("restaurants.list.menu")}
                </NavlinkPrimary>
            </div>
            <div className="lg:mt-0 mt-5 lg:ml-auto flex flex-col lg:w-auto w-full">
                <SecondaryButton
                    data-open={1}
                    className="!bg-blue-500 text-white data-[open='0']:bg-red-500 data-[open='0']:text-white"
                >
                    {t(
                        restaurant.is_open
                            ? "restaurants.list.close"
                            : "restaurants.list.open"
                    )}
                </SecondaryButton>
                <SecondaryButton className="my-2" onClick={edit}>
                    {t("common.edit")}
                </SecondaryButton>
                <Dialog
                    actions={[
                        { title: t("common.delete"), callback: handleDelete },
                        { title: t("common.cancel") },
                    ]}
                    description={t("restaurants.alerts.deleteDesc")}
                    title={t("restaurants.alerts.delete")}
                >
                    <SecondaryButton className="!bg-red-500 text-white">
                        {t("common.delete")}
                    </SecondaryButton>
                </Dialog>
            </div>
        </div>
    );
};

export default RestaurantCard;
