import { Form, Head, router, usePage } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import GalleryController from '@/actions/App/Http/Controllers/Admin/GalleryController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type GalleryImage = {
    id: number;
    image: string;
};

type PageProps = {
    galleryImages: GalleryImage[];
};

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

function GalleryFormFields({
    errors,
    galleryImage,
}: {
    errors: Record<string, string>;
    galleryImage?: GalleryImage;
}) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        galleryImage?.image ? `/storage/${galleryImage.image}` : null,
    );

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-2">
            <label className={labelClasses} htmlFor="image">
                Foto {galleryImage ? '(opsional)' : ''}
            </label>
            <div className="relative aspect-video cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-high/50 transition-colors hover:border-primary">
                <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                {imagePreview ? (
                    <img
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                        alt="Gallery preview"
                        src={imagePreview}
                    />
                ) : (
                    <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[48px] text-primary">
                        add_photo_alternate
                    </span>
                )}
            </div>
            <p className="text-xs text-on-surface-variant">
                {galleryImage
                    ? 'Klik untuk mengganti foto. Biarkan jika tidak ingin mengubah.'
                    : 'Klik untuk memilih foto.'}{' '}
                JPG, PNG, atau WebP · Maks 2MB
            </p>
            <InputError message={errors.image} />
        </div>
    );
}

export default function AdminGallery() {
    const { galleryImages } = usePage<PageProps>().props;

    const [galleryDialog, setGalleryDialog] = useState<{
        open: boolean;
        editing: GalleryImage | null;
    }>({ open: false, editing: null });

    const closeGallery = () => setGalleryDialog({ open: false, editing: null });

    const [deleting, setDeleting] = useState<GalleryImage | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const closeDelete = () => setDeleting(null);

    const confirmDelete = () => {
        if (!deleting || isDeleting) {
            return;
        }

        setIsDeleting(true);
        router.delete(
            GalleryController.destroy.url({ galleryImage: deleting.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleting(false);
                    setDeleting(null);
                },
                onFinish: () => setIsDeleting(false),
            },
        );
    };

    return (
        <>
            <Head title="Kelola Gallery" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Gallery Grid
                    </h2>
                </div>
            </header>

            <div className="mx-auto max-w-300 space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="gallery" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                                <span className="material-symbols-outlined">
                                    gallery_thumbnail
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">
                                Gallery Grid
                            </h3>
                        </div>
                        <button
                            onClick={() =>
                                setGalleryDialog({ open: true, editing: null })
                            }
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold tracking-wide text-on-primary shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Tambah Foto
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {galleryImages.map((image) => (
                            <div
                                key={image.id}
                                className="group relative aspect-square overflow-hidden rounded-2xl border border-outline-variant/30"
                            >
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt="Gallery"
                                    src={`/storage/${image.image}`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                        onClick={() =>
                                            setGalleryDialog({
                                                open: true,
                                                editing: image,
                                            })
                                        }
                                        className="flex size-10 items-center justify-center rounded-full bg-white text-primary"
                                    >
                                        <span className="material-symbols-outlined size-7">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setDeleting(image)}
                                        className="flex size-10 items-center justify-center rounded-full bg-white text-error"
                                    >
                                        <span className="material-symbols-outlined size-7">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {galleryImages.length === 0 && (
                            <p className="col-span-2 rounded-2xl border border-dashed border-outline-variant/30 p-6 text-center text-sm text-on-surface-variant md:col-span-4">
                                Belum ada foto galeri.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <Dialog
                open={galleryDialog.open}
                onOpenChange={(next) =>
                    next
                        ? setGalleryDialog((s) => ({ ...s, open: true }))
                        : closeGallery()
                }
            >
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {galleryDialog.editing
                                ? 'Edit Foto'
                                : 'Tambah Foto'}
                        </DialogTitle>
                    </DialogHeader>
                    <Form
                        key={
                            galleryDialog.editing
                                ? `edit-${galleryDialog.editing.id}`
                                : 'create'
                        }
                        {...(galleryDialog.editing
                            ? GalleryController.update.form({
                                  galleryImage: galleryDialog.editing.id,
                              })
                            : GalleryController.store.form())}
                        options={{ preserveScroll: true }}
                        onSuccess={closeGallery}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <GalleryFormFields
                                    errors={errors}
                                    galleryImage={
                                        galleryDialog.editing ?? undefined
                                    }
                                />
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={closeGallery}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {galleryDialog.editing
                                            ? 'Simpan'
                                            : 'Tambah'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleting !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        closeDelete();
                    }
                }}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Hapus Foto?</DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus foto galeri ini? Tindakan ini
                            tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={closeDelete}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
