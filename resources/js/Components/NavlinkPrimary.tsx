import { InertiaLinkProps, Link } from "@inertiajs/react";

const NavlinkPrimary = ({ ...props }: InertiaLinkProps) => {
    return (
        <Link
            className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
            {...props}
        ></Link>
    );
};

export default NavlinkPrimary;
