import ApplicationLogo from "@/Components/ApplicationLogo";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

const PasswordResetSuccess = ({ status }: PageProps<{ status?: string }>) => {
    return (
        <div className="min-h-screen flex-col bg-gray-100 flex items-center justify-center">
            <Link href="/">
                <ApplicationLogo className="block  w-auto fill-current text-gray-800" />
            </Link>
            <p className="text-lg mt-4">{status}</p>
        </div>
    );
};

export default PasswordResetSuccess;
