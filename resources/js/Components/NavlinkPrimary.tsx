import { InertiaLinkProps, Link } from "@inertiajs/react";

const NavlinkPrimary = ({ ...props }: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                "bg-blue-500 text-white font-semibold px-3 py-2 rounded-lg text-center"
            }
        ></Link>
    );
};

export default NavlinkPrimary;
