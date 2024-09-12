import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { FormEventHandler, useMemo } from "react";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { TranslationInputs } from "@/Components/TranslationsInput";
import { Tag, TagForm } from "../Restaurant/restaurants.types";

type TProps = PageProps<{ tag?: Tag }>;

const TagsCreate = ({ auth, tag }: TProps) => {
    const initial = useMemo(
        () =>
            tag
                ? {
                      ...tag,
                      img: null,
                  }
                : {
                      name: { en: "", hr: "" },
                      img: null,
                  },
        []
    );
    const { data, setData, post, processing, errors } =
        useForm<TagForm>(initial);
    const { t } = useTranslation();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (tag?.id) {
            post(
                route("tags.update", {
                    tag: tag.id,
                }),
                { forceFormData: true }
            );
        } else {
            post(route("tags.store"), {
                forceFormData: true,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
            setData("img", e.target.files[0]);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={
                    tag
                        ? t("meta.titles.tags.update")
                        : t("meta.titles.tags.create")
                }
            />
            <h1 className="text-2xl font-semibold w-full text-center mt-5">
                {tag ? t("tags.update") : t("tags.create")}
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

export default TagsCreate;
