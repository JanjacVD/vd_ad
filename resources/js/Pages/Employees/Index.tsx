import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Employee, Restaurant } from "../Restaurant/restaurants.types";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from "react";
import InviteForm from "./components/InviteForm";
import Checkbox from "@/Components/Checkbox";
import DangerButton from "@/Components/DangerButton";
import { router } from "@inertiajs/react";

const Employees = ({
    auth,
    restaurant,
}: PageProps<{ restaurant: Restaurant }>) => {
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);
    const handleUpdate = (employee: Employee, checked: boolean) => {
        router.patch(
            route("employees.update", {
                restaurant: restaurant.id,
                employee: employee.id,
            }),
            {
                adminRights: checked,
            },
            { preserveState: false }
        );
    };

    const handleDelete = (employee: Employee) => {
        router.delete(
            route("employees.update", {
                restaurant: restaurant.id,
                employee: employee.id,
            }),

            { preserveState: false }
        );
    };
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
                            <th>{t("auth.email")}</th>
                            <th>{t("auth.phone")}</th>
                            <th className="text-center">
                                {t("restaurants.employees.admin")}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurant.employees?.map((user) => (
                            <tr
                                className="border border-collapse"
                                key={user.id}
                            >
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="text-center">
                                    <Checkbox
                                        checked={user.adminRights}
                                        onChange={(e) =>
                                            handleUpdate(user, e.target.checked)
                                        }
                                    />
                                </td>
                                <DangerButton
                                    className="h-4 w-auto"
                                    onClick={() => handleDelete(user)}
                                >
                                    {t("common.delete")}
                                </DangerButton>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal onClose={setModal} show={modal}>
                <InviteForm
                    handleClose={() => setModal(false)}
                    restaurant={restaurant}
                />
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Employees;
