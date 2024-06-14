import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { FormEventHandler, useMemo, useState } from "react";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Category, CategoryForm, Item, ItemForm } from "../menu.types";
import { TranslationInputs } from "@/Components/TranslationsInput";

type TProps = PageProps<{ categoryId?: number; item: Item }>;

const ItemsCreate = ({ auth, categoryId, item }: TProps) => {
    const initial = useMemo(
        () =>
            item
                ? {
                      ...item,
                      img: null,
                  }
                : {
                      name: { en: "", hr: "" },
                      description: { en: "", hr: "" },
                      price: 0,
                      img: null,
                  },
        [item]
    );
    const { data, setData, post, processing, errors } =
        useForm<ItemForm>(initial);
    const { t } = useTranslation();

    const [priceInput, setPriceInput] = useState(
        (data.price / 100).toFixed(2) + "€"
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (item?.id) {
            post(
                route("items.update", {
                    category: categoryId,
                    restaurant: item,
                }),
                { forceFormData: true }
            );
        } else {
            post(route("items.store", { category: categoryId }), {
                forceFormData: true,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
            setData("img", e.target.files[0]);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPriceInput(value);

        const numericValue = parseFloat(value.replace(/€/, ""));
        if (!isNaN(numericValue) && numericValue >= 0) {
            setData("price", Math.round(numericValue * 100));
        } else {
            setData("price", 0);
        }
    };

    const handlePriceBlur = () => {
        const numericValue = parseFloat(priceInput.replace(/€/, ""));
        if (!isNaN(numericValue) && numericValue >= 0) {
            setPriceInput(numericValue.toFixed(2) + "€");
        } else {
            setPriceInput("0.00€");
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={
                    item
                        ? t("meta.titles.items.update")
                        : t("meta.titles.items.create")
                }
            />
            <h1 className="text-2xl font-semibold w-full text-center mt-5">
                {item ? t("items.update") : t("items.create")}
            </h1>
            <form
                onSubmit={submit}
                className="w-full m-auto mt-10 p-20"
                encType="multipart/form-data"
            >
                <TranslationInputs
                    data={data.name}
                    label={t("restaurants.form.name")}
                    setData={(val) => setData("name", val)}
                />
                <TranslationInputs
                    data={data.description}
                    label={t("items.form.description")}
                    setData={(val) => setData("description", val)}
                />
                <div className="mt-5 ">
                    <InputLabel htmlFor="price" value={t("items.form.price")} />
                    <div className="flex items-center">
                        <TextInput
                            id="price"
                            type="text"
                            name="price"
                            className="mt-1 flex-1 bg-white"
                            onChange={handlePriceChange}
                            onBlur={handlePriceBlur}
                            value={priceInput}
                        />
                    </div>

                    <InputError message={errors.price} className="mt-2" />
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
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t("common.save")}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default ItemsCreate;
