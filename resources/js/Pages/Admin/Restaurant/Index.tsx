import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Restaurant } from "@/Pages/Restaurant/restaurants.types";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import RestaurantAdminCard from "./components/RestaurantAdminCard";

type TProps = PageProps<{ restaurants: Restaurant[] }>;
const RestaurantIndex = ({ auth, restaurants }: TProps) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("meta.titles.admin.restaurant")} />
            <h1 className="text-2xl text-center mt-4">
                {t("admin.restaurant.title")}
            </h1>
            {!restaurants.length && <h2>{t("common.empty")}</h2>}
            <div className="p-4">
                {restaurants.map((restaurant) => (
                    <RestaurantAdminCard
                        restaurant={restaurant}
                        key={restaurant.id}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default RestaurantIndex;
