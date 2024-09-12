import { useTranslation } from "react-i18next";
import { imagePath } from "@/utils/storage";
import { MdCheck, MdClear } from "react-icons/md";
import SecondaryButton from "@/Components/SecondaryButton";
import NavlinkPrimary from "@/Components/NavlinkPrimary";
import { router } from "@inertiajs/react";
import Dialog from "@/Components/Dialog";
import { Tag } from "@/Pages/Restaurant/restaurants.types";

const TagCard = ({ tag }: { tag: Tag }) => {
    // const { t } = useTranslation();
    // const handleDelete = () => {
    //     router.delete(
    //         route("tags.destroy", { tag: tag.id }),
    //         { preserveState: false }
    //     );
    // };
    // const edit = () => router.visit(route("tags.edit", tag));
    // return (
    //     <article className="w-full h-auto flex flex-wrap p-5 border border-gray-500 shadow-sm bg-white rounded-md  my-5">
    //         <img
    //             className="lg:w-60 lg:mr-5"
    //             src={`${imagePath}${tag.img}`}
    //             alt="IMG"
    //         />
    //         <div className="flex flex-col justify-between">
    //             <p className="font-semibold text-xl">{tag.name}</p>
    //             <p className="flex items-center">
    //                 {t("restaurants.list.confirmed")}
    //                 {restaurant.confirmed ? (
    //                     <MdCheck color="green" />
    //                 ) : (
    //                     <MdClear color="red" />
    //                 )}
    //             </p>
    //             <div className="flex items-center gap-4">
    //                 <NavlinkPrimary
    //                     href={route("categories.index", {
    //                         restaurant: restaurant.id,
    //                     })}
    //                 >
    //                     {t("restaurants.list.menu")}
    //                 </NavlinkPrimary>
    //                 <NavlinkPrimary
    //                     href={route("employees.index", {
    //                         restaurant: restaurant.id,
    //                     })}
    //                 >
    //                     {t("restaurants.list.employees")}
    //                 </NavlinkPrimary>
    //             </div>
    //         </div>
    //         <div className="lg:mt-0 mt-5 lg:ml-auto flex flex-col lg:w-auto w-full">
    //             <SecondaryButton className="my-2" onClick={edit}>
    //                 {t("common.edit")}
    //             </SecondaryButton>
    //             <Dialog
    //                 actions={[
    //                     { title: t("common.delete"), callback: handleDelete },
    //                     { title: t("common.cancel") },
    //                 ]}
    //                 description={t("restaurants.alerts.deleteDesc")}
    //                 title={t("restaurants.alerts.delete")}
    //             >
    //                 <SecondaryButton className="!bg-red-500 text-white">
    //                     {t("common.delete")}
    //                 </SecondaryButton>
    //             </Dialog>
    //         </div>
    //     </article>
    // );
};

export default TagCard;
