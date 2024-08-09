import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const UserList = ({ auth, users }: PageProps<{ users: User[] }>) => {
    const { t } = useTranslation();
    const [searchInput, setSearchInput] = useState("");
    const deferredInput = useDeferredValue(searchInput);
    const filteredData = useMemo(
        () =>
            users.filter((u) =>
                u.name.toLowerCase().includes(deferredInput.toLowerCase())
            ),
        [deferredInput]
    );
    const handleCheck = (fields: Partial<User>) => {
        router.patch(
            route("users.update", { user: fields.id }),
            {
                ...fields,
                id: undefined,
            },
            { preserveState: false }
        );
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={t("admin.users.title")} />
            <div className="px-6 pt-10">
                <h1 className="text-4xl text-center pb-8">
                    {t("admin.users.title")}
                </h1>
                <div className="flex items-center pb-4">
                    {t("common.search")}:{" "}
                    <TextInput
                        className="ml-3"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <table className="w-full text-2xl text-center border-collapse">
                    <tr className="border border-collapse">
                        <td>{t("admin.users.table.name")}</td>
                        <td>{t("admin.users.table.isLoyalty")}</td>
                        <td>{t("admin.users.table.isDelivery")}</td>
                        <td>{t("admin.users.table.isSuperAdmin")}</td>
                    </tr>
                    {filteredData.map((user) => (
                        <tr className="border border-collapse" key={user.id}>
                            <td className="border border-collapse">
                                {user.name}
                            </td>
                            <td className="border border-collapse">
                                <Checkbox
                                    className="w-6 h-6"
                                    checked={user.isLoyalty}
                                    onChange={(e) =>
                                        handleCheck({
                                            isLoyalty: e.target.checked,
                                            id: user.id,
                                        })
                                    }
                                />
                            </td>
                            <td className="border border-collapse">
                                <Checkbox
                                    className="w-6 h-6"
                                    checked={user.isDelivery}
                                    onChange={(e) =>
                                        handleCheck({
                                            isDelivery: e.target.checked,
                                            id: user.id,
                                        })
                                    }
                                />
                            </td>
                            <td className="border border-collapse">
                                <Checkbox
                                    className="w-6 h-6"
                                    checked={user.isSuperAdmin}
                                    onChange={(e) =>
                                        handleCheck({
                                            isSuperAdmin: e.target.checked,
                                            id: user.id,
                                        })
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </AuthenticatedLayout>
    );
};
export default UserList;
