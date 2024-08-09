import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Restaurant } from "../Restaurant/restaurants.types";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from "react";
import InviteForm from "./components/InviteForm";

const Employees = ({
    auth,
    restaurant,
}: PageProps<{ restaurant: Restaurant }>) => {
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);
    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="text-center text-2xl mt-4">
                {restaurant.name} {t("restaurants.list.employees")}
            </h1>
            <div className="flex flex-col items-center py-5 px-10">
                <PrimaryButton
                    className="mb-5"
                    onClick={() => setModal((prev) => !prev)}
                >
                    {t("restaurants.employees.add")}
                </PrimaryButton>
                <table className="w-full text-left border border-collapse">
                    <thead>
                        <tr className="border border-collapse">
                            <th>{t("auth.name")}</th>
                            <th>{t("auth.name")}</th>
                            <th>{t("auth.name")}</th>
                            <th>{t("auth.name")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-collapse">
                            <td>A</td>
                            <td>A</td>
                            <td>A</td>
                            <td>A</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal onClose={setModal} show={modal}>
                <InviteForm restaurantId={restaurant.id} />
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Employees;
