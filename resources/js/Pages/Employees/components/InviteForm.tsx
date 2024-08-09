import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const InviteForm = ({ restaurantId }: { restaurantId: number }) => {
    const { data, setData, post } = useForm({
        email: "",
        adminRights: false,
        restaurantId,
    });
    const { t } = useTranslation();

    const handleSubmit = () => {
        post(route("employees.sendInvite", { restaurant: restaurantId }));
    };
    return (
        <div className="min-h-80 p-5 flex flex-col">
            <h3 className="text-xl text-center">
                {t("restaurants.employees.add")}
            </h3>
            <InputLabel className="mt-6">
                {t("auth.email")}:
                <TextInput
                    className="ml-3"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />{" "}
            </InputLabel>

            <InputLabel className="mt-4">
                {t("restaurants.employees.admin")}
                <Checkbox
                    className="ml-3 w-5 h-5"
                    checked={data.adminRights}
                    onChange={(e) => setData("adminRights", e.target.checked)}
                />
            </InputLabel>
            <PrimaryButton className="mt-auto ml-auto" onClick={handleSubmit}>
                {t("common.add")}
            </PrimaryButton>
        </div>
    );
};

export default InviteForm;
