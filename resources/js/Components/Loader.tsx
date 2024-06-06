import { PropsWithChildren } from "react";

const Loader = ({
    isLoading,
    children,
}: { isLoading: boolean } & PropsWithChildren) => {
    return (
        <div
            className={
                isLoading
                    ? "fixed top-0 left-0 w-full h-full bg-black opacity-20"
                    : ""
            }
        >
            {children}
        </div>
    );
};
export default Loader;
