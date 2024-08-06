import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { CategoryWithItems } from "../menu.types";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import { Translatable } from "@/types/common.types";
import ItemCard from "./components/ItemCard";

type TProps = PageProps<{ category: CategoryWithItems }>;
const CategoriesIndex = ({ auth, category }: TProps) => {
    const { t, i18n } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={t("meta.titles.items.index", {
                    name: category.name,
                })}
            />
            <h1 className="font-bold text-2xl text-center mt-2">
                {category.name[i18n.language as keyof Translatable]}
            </h1>
            {!category.items.length && (
                <div className="flex w-full flex-col items-center mt-5">
                    <p className="font-semibold text-lg">{t("items.empty")}</p>
                    <NavlinkPrimary
                        className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                        href={route("items.create", {
                            category: category.id,
                        })}
                    >
                        {t("common.create")}
                    </NavlinkPrimary>
                </div>
            )}
            <div className="flex flex-col p-3 lg:p-20">
                {category.items.length > 0 && (
                    <div>
                        <NavlinkPrimary
                            className=" bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                            href={route("items.create", {
                                category: category.id,
                            })}
                        >
                            {t("common.add")}
                        </NavlinkPrimary>
                    </div>
                )}
                {category.items.map((item) => (
                    <ItemCard {...item} key={item.id} category={category.id} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default CategoriesIndex;
