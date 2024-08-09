import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Restaurant } from "@/Pages/Restaurant/restaurants.types";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const InviteForm = ({
    restaurant,
    handleClose,
}: {
    restaurant: Restaurant;
    handleClose(): void;
}) => {
    const { data, setData, post } = useForm({
        email: "",
        adminRights: false,
        restaurantId: restaurant.id,
    });
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (restaurant.employees.some((user) => user.email === data.email)) {
            toast.warning(t("restaurants.employees.exists"));
            return;
        }
        post(route("employees.sendInvite", { restaurant: restaurant.id }));
        toast.success(t("restaurants.employees.sent"));
        handleClose();
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
