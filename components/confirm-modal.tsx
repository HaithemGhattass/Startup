"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
    
} from "@/components/ui/alert-dialog"
interface ConfirmModalProps {
    children: React.ReactNode
    onConfirm: () => void;
    disabled?: boolean;
    header: string;
    description?: string;
};
export const ConfirmModal = ({ children, onConfirm, disabled, header, description }: ConfirmModalProps) => {
    const handleConfirm = () => {
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={disabled} onClick={handleConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}