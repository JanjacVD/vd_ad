import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { RestaurantWithCategory } from "../menu.types";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import CategoryCard from "./components/CategoryCard";

type TProps = PageProps<{ restaurant: RestaurantWithCategory }>;
const CategoriesIndex = ({ auth, restaurant }: TProps) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={t("meta.titles.categories.index", {
                    name: restaurant.name,
                })}
            />
            <h1 className="font-bold text-2xl text-center mt-2">
                {restaurant.name}
            </h1>
            {!restaurant.categories.length && (
                <div className="flex w-full flex-col items-center mt-5">
                    <p className="font-semibold text-lg">
                        {t("categories.empty")}
                    </p>
                    <NavlinkPrimary
                        className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                        href={route("categories.create", {
                            restaurant: restaurant.id,
                        })}
                    >
                        {t("common.create")}
                    </NavlinkPrimary>
                </div>
            )}
            <div className="flex flex-col p-3 lg:p-20">
                {restaurant.categories.length > 0 && (
                    <div>
                        <NavlinkPrimary
                            className=" bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                            href={route("categories.create", {
                                restaurant: restaurant.id,
                            })}
                        >
                            {t("common.add")}
                        </NavlinkPrimary>
                    </div>
                )}
                {restaurant.categories.map((category) => (
                    <CategoryCard
                        restaurantId={restaurant.id}
                        {...category}
                        key={category.id}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default CategoriesIndex;
