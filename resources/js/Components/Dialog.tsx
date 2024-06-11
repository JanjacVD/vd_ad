import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { PropsWithChildren } from "react";

type TAction = {
    callback?(): void;
    title: string;
};
type TProps = {
    title: string;
    description: string;
    actions: TAction[];
} & PropsWithChildren;
const Dialog = ({ children, actions, description, title }: TProps) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="AlertDialogOverlay" />
                <AlertDialog.Content className="AlertDialogContent">
                    <AlertDialog.Title className="AlertDialogTitle">
                        {title}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="AlertDialogDescription">
                        {description}
                    </AlertDialog.Description>
                    <div
                        style={{
                            display: "flex",
                            gap: 25,
                            justifyContent: "flex-end",
                        }}
                    >
                        {actions.map((action) => (
                            <AlertDialog.Cancel key={action.title} asChild>
                                <button onClick={action.callback}>
                                    {action.title}
                                </button>
                            </AlertDialog.Cancel>
                        ))}
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default Dialog;
