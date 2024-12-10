import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Restaurant, RestaurantForm, Tag } from "./restaurants.types";
import InputLabel from "@/Components/InputLabel";
import { FormEventHandler, useRef, useState } from "react";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loader from "@/Components/Loader";
import useFetchLocation from "@/hooks/useFetchLocation";
import WorktimeInput from "./components/WorktimeInput";
import ToggleGroup from "@/Components/Toggle";
import { initWorktime } from "@/data/worktime";

type TProps = PageProps<{ tags: Tag[]; restaurant?: Restaurant }>;

const RestaurantCreate = ({ auth, tags, restaurant }: TProps) => {
    const { data, setData, setError, post, processing, errors } =
        useForm<RestaurantForm>(
            restaurant
                ? {
                      ...restaurant,
                      img: null,
                      tags: restaurant?.tags?.map((tag) => tag.id) ?? [],
                  }
                : {
                      name: "",
                      work_days: initWorktime,
                      img: null,
                      tags: [],
                      contact: "+385",
                  }
        );
    const { t } = useTranslation();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (restaurant?.id) {
            post(route("my-restaurants.update", restaurant.id), {
                forceFormData: true,
            });
        } else {
            post(route("my-restaurants.store"), {
                forceFormData: true,
            });
        }
    };
    const [address, setAddress] = useState(
        restaurant?.address.formatted_address ?? ""
    );
    const addressRef = useRef<HTMLInputElement>(null);

    const { fetchLocation, isLoading, clearMap } = useFetchLocation();
    const mapRef = useRef<HTMLDivElement>(null);
    const handleSetTags = (t: number[]) => {
        setData("tags", t);
    };
    const handleLocationFetch = async () => {
        try {
            await fetchLocation(address, mapRef, (add) =>
                setData("address", add)
            );
        } catch (e) {
            setError("address", String(e));
        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
            setData("img", e.target.files[0]);
        }
    };
    const clearAddress = () => {
        setData("address", undefined);
        clearMap(mapRef);
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={
                    restaurant
                        ? t("meta.titles.restaurant.update")
                        : t("meta.titles.restaurant.create")
                }
            />
            <h1 className="text-2xl font-semibold w-full text-center mt-5">
                {restaurant ? t("restaurants.update") : t("restaurants.create")}
            </h1>
            <form
                onSubmit={submit}
                className="w-full m-auto mt-10 p-20"
                encType="multipart/form-data"
            >
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
                        {data.address ? (
                            <PrimaryButton
                                className="mx-2"
                                type="button"
                                onClick={clearAddress}
                            >
                                {t("restaurants.form.clearAddress")}
                            </PrimaryButton>
                        ) : (
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
                                mapRef.current?.innerHTML !== ""
                                    ? "min-h-52 w-full text-white flex items-center justify-center"
                                    : ""
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

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-5">
                    <InputLabel
                        htmlFor="contact"
                        value={t("restaurants.form.contact")}
                    />
                    <div className="flex items-center">
                        <TextInput
                            id="contact"
                            type="text"
                            name="contact"
                            value={data.contact}
                            className="mt-1 flex-1"
                            onChange={(e) => {
                                const countryCode = "+385";
                                let value = e.target.value;
                                if (!value.startsWith(countryCode)) {
                                    value = countryCode;
                                }
                                setData("contact", value);
                            }}
                            isFocused={true}
                        />
                    </div>

                    <InputError message={errors.name} className="mt-2" />
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
                    mode={restaurant?.id ? "edit" : "create"}
                    data={data.work_days}
                    setData={(worktime) => setData("work_days", worktime)}
                />

                <div className="mt-5 ">
                    <InputLabel
                        htmlFor="tags"
                        value={t("restaurants.form.tags")}
                    />
                    <div className="flex items-center">
                        <ToggleGroup
                            setData={handleSetTags}
                            options={tags}
                            values={data?.tags ?? []}
                            labelKey={"name.en" as keyof Tag}
                            valueKey="id"
                        />
                    </div>

                    <InputError message={errors.img} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton
                        className="ms-4"
                        disabled={processing || !data.address}
                    >
                        {t("common.save")}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default RestaurantCreate;
