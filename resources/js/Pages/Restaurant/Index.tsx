import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Restaurant } from "./restaurants.types";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import RestaurantCard from "./components/RestaurantCard";

type TProps = PageProps<{ restaurants: Restaurant[] }>;
const RestaurantIndex = ({ auth, restaurants }: TProps) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("meta.titles.myEstablishments")} />
            {!restaurants.length && (
                <div className="flex w-full flex-col items-center mt-5">
                    <p className="font-semibold text-lg">
                        {t("restaurants.empty")}
                    </p>
                    <NavlinkPrimary
                        className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                        href={route("my-restaurants.create")}
                    >
                        {t("common.create")}
                    </NavlinkPrimary>
                </div>
            )}
            <div className="flex flex-col p-3 lg:p-20">
                {restaurants.length > 0 && (
                    <div>
                        <NavlinkPrimary
                            className=" bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                            href={route("my-restaurants.create")}
                        >
                            {t("common.add")}
                        </NavlinkPrimary>
                    </div>
                )}
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default RestaurantIndex;
