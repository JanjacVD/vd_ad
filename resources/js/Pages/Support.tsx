import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useTranslation } from "react-i18next";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const { t } = useTranslation();
    return (
        <>
            <Head title="Welcome" />
            <nav className="border-b flex px-2 items-center justify-between  py-4">
                <ApplicationLogo className="h-10 m-0" />
            </nav>
            <main className="min-h-screen">
                <header className="w-full p-10 flex relative flex-col bg-slate-100 min-h-[40svh]">
                    <h1 className="text-5xl">Having an issue?</h1>
                    <div className="m-auto">
                        <h2 className="text-3xl">Contact our support?</h2>
                        <div className="z-10 flex flex-col">
                            <a href="mailto:vodiceapsolutnadostava@gmail.com">
                                vodiceapsolutnadostava@gmail.com
                            </a>
                        </div>
                    </div>
                </header>
            </main>
        </>
    );
}
