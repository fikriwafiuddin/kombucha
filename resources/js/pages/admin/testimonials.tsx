import { Form, Head, router, usePage } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import TestimonialController from '@/actions/App/Http/Controllers/Admin/TestimonialController';
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

type Testimonial = {
    id: number;
    name: string;
    role: string | null;
    avatar: string | null;
    review: string;
    rating: number;
    status: 'published' | 'draft';
};

type PageProps = {
    testimonials: Testimonial[];
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

function TestimonialFormFields({
    errors,
    testimonial,
}: {
    errors: Record<string, string>;
    testimonial?: Testimonial;
}) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        testimonial?.avatar ? `/storage/${testimonial.avatar}` : null,
    );

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className={labelClasses} htmlFor="name">
                        Nama Pelanggan
                    </label>
                    <input
                        id="name"
                        className={inputClasses}
                        type="text"
                        name="name"
                        defaultValue={testimonial?.name ?? ''}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="space-y-2">
                    <label className={labelClasses} htmlFor="role">
                        Peran
                    </label>
                    <input
                        id="role"
                        className={inputClasses}
                        type="text"
                        name="role"
                        defaultValue={testimonial?.role ?? ''}
                        placeholder="Verified Buyer"
                    />
                    <InputError message={errors.role} />
                </div>
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="avatar">
                    Avatar (Opsional)
                </label>
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full border border-outline-variant/50 bg-surface-variant">
                        <input
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        />
                        {avatarPreview ? (
                            <img
                                className="h-full w-full object-cover"
                                alt={testimonial?.name ?? 'Avatar'}
                                src={avatarPreview}
                            />
                        ) : (
                            <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[24px] text-on-surface-variant">
                                person
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-on-surface-variant">
                        <p className="font-semibold text-on-surface">
                            Klik avatar untuk memilih foto
                        </p>
                        <p>JPG, PNG, atau WebP · Maks 2MB</p>
                    </div>
                </div>
                <InputError message={errors.avatar} />
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="review">
                    Isi Review
                </label>
                <textarea
                    id="review"
                    className={inputClasses}
                    rows={3}
                    name="review"
                    defaultValue={testimonial?.review ?? ''}
                />
                <InputError message={errors.review} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className={labelClasses} htmlFor="rating">
                        Rating
                    </label>
                    <select
                        id="rating"
                        className={inputClasses}
                        name="rating"
                        defaultValue={testimonial?.rating ?? 5}
                    >
                        {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>
                                {r} Bintang
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.rating} />
                </div>
                <div className="space-y-2">
                    <label className={labelClasses} htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        className={inputClasses}
                        name="status"
                        defaultValue={testimonial?.status ?? 'published'}
                    >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <InputError message={errors.status} />
                </div>
            </div>
        </div>
    );
}

export default function AdminTestimonials() {
    const { testimonials } = usePage<PageProps>().props;

    const [testimonialDialog, setTestimonialDialog] = useState<{
        open: boolean;
        editing: Testimonial | null;
    }>({ open: false, editing: null });

    const closeTestimonial = () =>
        setTestimonialDialog({ open: false, editing: null });

    const [deleting, setDeleting] = useState<Testimonial | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const closeDelete = () => setDeleting(null);

    const confirmDelete = () => {
        if (!deleting || isDeleting) {
            return;
        }

        setIsDeleting(true);
        router.delete(
            TestimonialController.destroy.url({ testimonial: deleting.id }),
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
            <Head title="Kelola Testimonials" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Testimonials
                    </h2>
                </div>
            </header>

            <div className="mx-auto max-w-[1400px] space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="testimonials" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                                <span className="material-symbols-outlined">
                                    reviews
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold">
                                    Testimonials
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Review jujur dari pelanggan setia Kombucha
                                    Co.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                setTestimonialDialog({
                                    open: true,
                                    editing: null,
                                })
                            }
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold tracking-wide text-on-primary shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Tambah Review
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-outline-variant/30 bg-surface-container-lowest shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-surface-container-low/50">
                                        <th className="px-8 py-4 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                                            Pelanggan
                                        </th>
                                        <th className="px-8 py-4 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                                            Review Content
                                        </th>
                                        <th className="px-8 py-4 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                                            Rating
                                        </th>
                                        <th className="px-8 py-4 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                                            Status
                                        </th>
                                        <th className="px-8 py-4 text-right text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20">
                                    {testimonials.map((t) => (
                                        <tr
                                            key={t.id}
                                            className="transition-colors hover:bg-surface-variant/5"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-variant">
                                                        {t.avatar ? (
                                                            <img
                                                                className="h-full w-full object-cover"
                                                                alt={t.name}
                                                                src={`/storage/${t.avatar}`}
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">
                                                            {t.name}
                                                        </p>
                                                        <p className="text-[11px] text-on-surface-variant">
                                                            {t.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="line-clamp-1 text-sm text-on-surface-variant italic">
                                                    &ldquo;{t.review}&rdquo;
                                                </p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex text-primary">
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`material-symbols-outlined fill-1 text-[16px] ${i < t.rating ? '' : 'opacity-30'}`}
                                                        >
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${t.status === 'published' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}
                                                >
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        setTestimonialDialog({
                                                            open: true,
                                                            editing: t,
                                                        })
                                                    }
                                                    className="rounded-lg p-2 text-primary hover:bg-surface-container-high"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDeleting(t)
                                                    }
                                                    className="rounded-lg p-2 text-error hover:bg-error-container"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        delete
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {testimonials.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-8 py-12 text-center text-sm text-on-surface-variant"
                                            >
                                                Belum ada testimonial.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <Dialog
                open={testimonialDialog.open}
                onOpenChange={(next) =>
                    next
                        ? setTestimonialDialog((s) => ({ ...s, open: true }))
                        : closeTestimonial()
                }
            >
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {testimonialDialog.editing
                                ? 'Edit Testimonial'
                                : 'Tambah Review'}
                        </DialogTitle>
                        <DialogDescription>
                            {testimonialDialog.editing
                                ? 'Perbarui detail testimonial ini.'
                                : 'Tambahkan testimonial pelanggan baru.'}
                        </DialogDescription>
                    </DialogHeader>
                    <Form
                        key={
                            testimonialDialog.editing
                                ? `edit-${testimonialDialog.editing.id}`
                                : 'create'
                        }
                        {...(testimonialDialog.editing
                            ? TestimonialController.update.form({
                                  testimonial: testimonialDialog.editing.id,
                              })
                            : TestimonialController.store.form())}
                        options={{ preserveScroll: true }}
                        onSuccess={closeTestimonial}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <TestimonialFormFields
                                    errors={errors}
                                    testimonial={
                                        testimonialDialog.editing ?? undefined
                                    }
                                />
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={closeTestimonial}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {testimonialDialog.editing
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
                        <DialogTitle>Hapus Testimonial?</DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus review dari{' '}
                            <span className="font-semibold text-on-surface">
                                {deleting?.name}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
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
