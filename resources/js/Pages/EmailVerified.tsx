import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useTranslation } from "react-i18next";

export default function EmailVerified({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const { t } = useTranslation();
    return (
        <>
            <Head title="Email Verified" />
            <ApplicationLogo className="h-10 m-0" />
            <main className="min-h-screen">
                <header className="w-full p-10 flex relative flex-col bg-slate-100 min-h-[40svh]">
                    <h1 className="text-5xl">
                        Email Verified, you can return to the app
                    </h1>
                </header>
            </main>
        </>
    );
}
