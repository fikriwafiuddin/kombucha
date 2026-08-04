import { router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type ConfirmDeleteDialogProps<T> = {
    /** The item pending deletion, or null when the dialog is closed. */
    item: T | null;
    onClose: () => void;
    /** Build the DELETE endpoint URL for the selected item. */
    deleteUrl: (item: T) => string;
    title: string;
    description: ReactNode;
    confirmText?: string;
    cancelText?: string;
};

/**
 * A reusable confirmation dialog for destructive deletes. It owns the dialog
 * chrome and the delete request (with a loading state), so callers only need to
 * track which item is selected and how to build its delete URL.
 */
export function ConfirmDeleteDialog<T>({
    item,
    onClose,
    deleteUrl,
    title,
    description,
    confirmText = 'Hapus',
    cancelText = 'Batal',
}: ConfirmDeleteDialogProps<T>) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = () => {
        if (!item || isDeleting) {
            return;
        }

        setIsDeleting(true);
        router.delete(deleteUrl(item), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
                onClose();
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Dialog
            open={item !== null}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
