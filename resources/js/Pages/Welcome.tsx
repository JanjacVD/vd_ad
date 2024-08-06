import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useTranslation } from "react-i18next";
import appStoreImg from "@/assets/app-store-badge.svg";
import playStoreImg from "@/assets/google-play-badge.svg";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const { t } = useTranslation();
    return (
        <>
            <Head title="Welcome" />
            <nav className="border-b flex px-2 items-center justify-between  py-4">
                <ApplicationLogo className="h-10 m-0" />
                <div>
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="rounded-md  hover:text-gray-700 font-semibold"
                        >
                            {t("nav.links.dashboard")}
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md  mr-2 hover:text-gray-700 font-semibold"
                            >
                                {t("auth.login")}
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-md  hover:text-gray-700 font-semibold"
                            >
                                {t("auth.register")}
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <main className="min-h-screen">
                <header className="w-full p-10 flex relative flex-col bg-slate-100 min-h-[40svh]">
                    <h1 className="text-5xl">We deliver anything!</h1>
                    <div className="m-auto">
                        <h2 className="text-3xl">Own A Restaurant?</h2>
                        <div className="z-10 flex flex-col">
                            <Link
                                href={route("my-restaurants.create")}
                                className="border-gray-50 rounded-md text-center py-2 font-bold hover:text-red-700 hover:border-red-700 border-2 text-lg transition-all"
                            >
                                {t("homepage.joinNow")}
                            </Link>
                        </div>
                    </div>
                </header>
                <section className="p-10">
                    <h2 className="text-3xl">Need a Delivery?</h2>
                    <h3 className="ml-5  mt-4 text-xl">Get the App now</h3>
                    <div className="flex items-center">
                        <a href="">
                            <img
                                src={appStoreImg}
                                className="w-40 mr-5"
                                alt="App store img"
                            />
                        </a>
                        <a href="">
                            <img
                                src={playStoreImg}
                                className="w-40"
                                alt="Play store img"
                            />
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}
