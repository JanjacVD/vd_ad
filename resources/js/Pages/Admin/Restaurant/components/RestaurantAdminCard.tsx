import Checkbox from "@/Components/Checkbox";
import Dialog from "@/Components/Dialog";
import SecondaryButton from "@/Components/SecondaryButton";
import { Restaurant } from "@/Pages/Restaurant/restaurants.types";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const RestaurantAdminCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const { t } = useTranslation();
    const handleDelete = () => {
        router.delete(
            route("restaurants.destroy", { restaurant: restaurant.id })
        );
    };
    const handleUpdate = (fields: Omit<Partial<Restaurant>, "employees">) => {
        router.put(
            route("restaurants.destroy", { restaurant: restaurant.id }),
            { ...fields },
            { preserveState: false }
        );
    };
    const handleUpdateConfirm = () => {
        handleUpdate({ confirmed: !restaurant.confirmed });
    };
    const handleUpdateFee = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdate({ delivery_fee: e.target.checked });
    };
    return (
        <article className="w-full h-auto flex flex-wrap p-5 border border-gray-500 shadow-sm bg-white rounded-md  my-5">
            <div className="flex flex-col justify-between">
                <p className="font-semibold text-xl">{restaurant.name}</p>
                <p className="flex items-center">
                    {t("restaurants.list.freeDelivery")}
                    <Checkbox
                        className="ml-2"
                        checked={restaurant.delivery_fee}
                        onChange={handleUpdateFee}
                    />
                </p>
            </div>
            <div className="lg:mt-0 mt-5 lg:ml-auto flex flex-col lg:w-auto w-full">
                <SecondaryButton
                    data-open={restaurant.confirmed ? 1 : 0}
                    className="!bg-blue-500 text-white data-[open='0']:bg-red-500 data-[open='0']:text-white"
                    onClick={handleUpdateConfirm}
                >
                    {t(
                        restaurant.confirmed
                            ? "admin.restaurant.ban"
                            : "admin.restaurant.allow"
                    )}
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
        </article>
    );
};

export default RestaurantAdminCard;
