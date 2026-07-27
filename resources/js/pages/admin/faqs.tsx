import { Form, Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FaqController from '@/actions/App/Http/Controllers/Admin/FaqController';
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
import { faqs as adminFaqs } from '@/routes/admin';
// import type { BreadcrumbItem } from '@/types';

type Faq = {
    id: number;
    question: string;
    answer: string;
};

type PageProps = {
    faqs: Faq[];
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

function FaqFormFields({
    errors,
    faq,
}: {
    errors: Record<string, string>;
    faq?: Faq;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="question">
                    Pertanyaan
                </label>
                <input
                    id="question"
                    className={inputClasses}
                    type="text"
                    name="question"
                    defaultValue={faq?.question ?? ''}
                />
                <InputError message={errors.question} />
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="answer">
                    Jawaban
                </label>
                <textarea
                    id="answer"
                    className={inputClasses}
                    rows={4}
                    name="answer"
                    defaultValue={faq?.answer ?? ''}
                />
                <InputError message={errors.answer} />
            </div>
        </div>
    );
}

export default function AdminFaqs() {
    const { faqs } = usePage<PageProps>().props;
    const [faqDialog, setFaqDialog] = useState<{
        open: boolean;
        editing: Faq | null;
    }>({ open: false, editing: null });

    const closeFaq = () => setFaqDialog({ open: false, editing: null });

    const [deleting, setDeleting] = useState<Faq | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const closeDelete = () => setDeleting(null);

    const confirmDelete = () => {
        if (!deleting || isDeleting) {
            return;
        }

        setIsDeleting(true);
        router.delete(FaqController.destroy.url({ faq: deleting.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
                setDeleting(null);
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <>
            <Head title="Kelola FAQ" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Tanya Jawab
                    </h2>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="faq" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                                <span className="material-symbols-outlined">
                                    quiz
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">
                                Tanya Jawab
                            </h3>
                        </div>
                        <button
                            onClick={() =>
                                setFaqDialog({ open: true, editing: null })
                            }
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold tracking-wide text-on-primary shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Tambah
                        </button>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="group rounded-3xl border border-outline-variant/30 bg-surface-container-low p-5"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <p className="font-bold text-primary">
                                        {faq.question}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setFaqDialog({
                                                    open: true,
                                                    editing: faq,
                                                })
                                            }
                                            className="text-on-surface-variant hover:text-primary"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                edit
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setDeleting(faq)}
                                            className="text-error hover:opacity-70"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs leading-relaxed text-on-surface-variant">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                        {faqs.length === 0 && (
                            <p className="rounded-3xl border border-dashed border-outline-variant/30 p-6 text-center text-sm text-on-surface-variant">
                                Belum ada FAQ.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <Dialog
                open={faqDialog.open}
                onOpenChange={(next) =>
                    next
                        ? setFaqDialog((s) => ({ ...s, open: true }))
                        : closeFaq()
                }
            >
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {faqDialog.editing ? 'Edit FAQ' : 'Tambah FAQ'}
                        </DialogTitle>
                    </DialogHeader>
                    <Form
                        key={
                            faqDialog.editing
                                ? `edit-${faqDialog.editing.id}`
                                : 'create'
                        }
                        {...(faqDialog.editing
                            ? FaqController.update.form({
                                  faq: faqDialog.editing.id,
                              })
                            : FaqController.store.form())}
                        options={{ preserveScroll: true }}
                        onSuccess={closeFaq}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <FaqFormFields
                                    errors={errors}
                                    faq={faqDialog.editing ?? undefined}
                                />
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={closeFaq}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {faqDialog.editing
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
                        <DialogTitle>Hapus FAQ?</DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus pertanyaan{' '}
                            <span className="font-semibold text-on-surface">
                                {deleting?.question}
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

AdminFaqs.layout = {
    breadcrumbs: [
        {
            title: 'FAQ List',
            href: adminFaqs(),
        },
    ],
};
