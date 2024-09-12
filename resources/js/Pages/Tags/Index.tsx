import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Tag } from "../Restaurant/restaurants.types";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import TagCard from "./components/TagCard";

type TProps = PageProps<{ tags: Tag[] }>;
const TabsIndex = ({ auth, tags }: TProps) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("meta.titles.tags.index")} />
            {!tags.length && (
                <div className="flex w-full flex-col items-center mt-5">
                    <p className="font-semibold text-lg">{t("tags.empty")}</p>
                    <NavlinkPrimary
                        className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                        href={route("tags.create")}
                    >
                        {t("common.create")}
                    </NavlinkPrimary>
                </div>
            )}
            <div className="flex flex-col p-3 lg:p-20">
                {tags.length > 0 && (
                    <div>
                        <NavlinkPrimary
                            className=" bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                            href={route("tags.create")}
                        >
                            {t("common.add")}
                        </NavlinkPrimary>
                    </div>
                )}
                {tags.map((tag) => (
                    <TagCard tag={tag} key={tag.id} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};
export default TabsIndex;
