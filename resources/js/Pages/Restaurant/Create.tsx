import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { RestaurantForm } from "./restaurants.types";
import InputLabel from "@/Components/InputLabel";
import { FormEventHandler, useRef, useState } from "react";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loader from "@/Components/Loader";
import useFetchLocation from "@/hooks/useFetchLocation";
import WorktimeInput from "./components/WorktimeInput";

type TProps = PageProps<{ tags: string[] }>;

const RestaurantCreate = ({ auth, tags }: TProps) => {
    const { data, setData, setError, post, processing, errors, reset } =
        useForm<RestaurantForm>({
            name: "",
            worktime: {},
            img: null,
        });
    const { t } = useTranslation();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route("login"));
    };
    const [address, setAddress] = useState("");
    const addressRef = useRef<HTMLInputElement>(null);

    const { fetchLocation, isLoading } = useFetchLocation();
    const mapRef = useRef<HTMLDivElement>(null);
    const handleLocationFetch = async () => {
        try {
            fetchLocation("Kamila Pamukovica 96 vodice", mapRef, (add) =>
                setData("address", add)
            );
        } catch (e) {
            setError("address", String(e));
        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("img", e.target.files[0]);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="text-2xl font-semibold w-full text-center mt-5">
                {t("restaurants.create")}
            </h1>
            <form onSubmit={submit} className="w-full m-auto mt-10 px-20">
                <div>
                    <InputLabel
                        htmlFor="address"
                        value={t("restaurants.form.address")}
                    />
                    <div className="flex items-center">
                        <TextInput
                            ref={addressRef}
                            disabled={!!data.address}
                            id="address"
                            type="text"
                            name="address"
                            value={address}
                            className="mt-1 flex-1"
                            onChange={(e) => setAddress(e.target.value)}
                            autoComplete="address-level1"
                            isFocused={true}
                        />
                        {!data.address && (
                            <PrimaryButton
                                className="mx-2"
                                type="button"
                                onClick={handleLocationFetch}
                            >
                                {t("restaurants.form.checkAddress")}
                            </PrimaryButton>
                        )}
                    </div>

                    <InputError message={errors.address} className="mt-2" />
                </div>
                <div className="block mt-4">
                    <Loader isLoading={isLoading}>
                        <div
                            ref={mapRef}
                            className={
                                "min-h-52 w-full text-white flex items-center justify-center"
                            }
                        ></div>
                    </Loader>
                </div>

                <div className="mt-5">
                    <InputLabel
                        htmlFor="name"
                        value={t("restaurants.form.name")}
                    />
                    <div className="flex items-center">
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 flex-1"
                            onChange={(e) => setData("name", e.target.value)}
                            isFocused={true}
                        />
                    </div>

                    <InputError message={errors.address} className="mt-2" />
                </div>
                <div className="mt-5 ">
                    <InputLabel
                        htmlFor="img"
                        value={t("restaurants.form.image")}
                    />
                    <div className="flex items-center">
                        <TextInput
                            id="img"
                            type="file"
                            name="img"
                            className="mt-1 flex-1 bg-white"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <InputError message={errors.img} className="mt-2" />
                </div>

                <WorktimeInput
                    data={data.worktime}
                    setData={(worktime) => setData("worktime", worktime)}
                />
                <div className="flex items-center justify-end mt-4">
                    {/* <PrimaryButton className="ms-4" disabled={processing}>
                        {t("auth.login")}
                    </PrimaryButton> */}
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default RestaurantCreate;
