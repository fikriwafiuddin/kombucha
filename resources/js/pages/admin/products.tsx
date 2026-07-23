import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
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
import { products as adminProducts } from '@/routes/admin';
import { formatCurrency } from '@/utils/fomatter';
// import type { BreadcrumbItem } from '@/types';

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
};

type PageProps = {
    products: Product[];
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

function ProductFormFields({
    errors,
    product,
}: {
    errors: Record<string, string>;
    product?: Product;
}) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="name">
                    Nama Produk
                </label>
                <input
                    id="name"
                    className={inputClasses}
                    type="text"
                    name="name"
                    defaultValue={product?.name ?? ''}
                    placeholder="Contoh: Wild Ginger Roots"
                />
                <InputError message={errors.name} />
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="description">
                    Deskripsi Singkat
                </label>
                <textarea
                    id="description"
                    className={inputClasses}
                    rows={2}
                    name="description"
                    defaultValue={product?.description ?? ''}
                    placeholder="Contoh: Fermentasi jahe emprit dengan lemon segar."
                />
                <InputError message={errors.description} />
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="price">
                    Harga (Rupiah)
                </label>
                <input
                    id="price"
                    className={inputClasses}
                    type="number"
                    name="price"
                    min={0}
                    step={500}
                    defaultValue={product?.price ?? 0}
                    placeholder="45000"
                />
                <InputError message={errors.price} />
            </div>
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="image">
                    Foto Produk
                </label>
                <input
                    id="image"
                    className={`${inputClasses} py-2.25`}
                    type="file"
                    name="image"
                    accept="image/*"
                />
                {product?.image && (
                    <p className="mt-1 text-xs text-on-surface-variant">
                        Gambar saat ini:{' '}
                        <a
                            href={product.image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                        >
                            Lihat Gambar
                        </a>
                    </p>
                )}
                <InputError message={errors.image} />
            </div>
        </div>
    );
}

export default function AdminProducts() {
    const { products } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditing(product);
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
        setEditing(null);
    };

    return (
        <>
            <Head title="Kelola Produk" />

            {/* Top App Bar */}
            <header className="sticky top-0 z-40 flex items-center justify-between border-b border-outline-variant/10 bg-surface/80 px-6 py-4 backdrop-blur-md md:px-8">
                <div className="flex items-center gap-4">
                    <button className="p-2 text-on-surface md:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h2 className="text-2xl font-semibold">Kelola Produk</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={openCreate}
                        className="hidden items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold tracking-wide text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:flex"
                    >
                        <span className="material-symbols-outlined text-base">
                            add
                        </span>
                        Tambah Produk Baru
                    </button>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                {/* Data Table */}
                <div className="overflow-hidden rounded-4xl border border-outline-variant/10 bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(27,43,30,0.05)]">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                                    <th className="px-6 py-5 text-xs font-semibold tracking-widest text-on-surface-variant/70 uppercase">
                                        Produk
                                    </th>
                                    <th className="px-6 py-5 text-xs font-semibold tracking-widest text-on-surface-variant/70 uppercase">
                                        Harga
                                    </th>
                                    <th className="px-6 py-5 text-right text-xs font-semibold tracking-widest text-on-surface-variant/70 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="cursor-pointer transition-colors hover:bg-surface-container-low/30"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-surface-container">
                                                    {product.image ? (
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            alt={product.name}
                                                            src={`/storage/${product.image}`}
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <span className="material-symbols-outlined text-on-surface-variant/40">
                                                                image
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">
                                                        {product.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-primary">
                                                {formatCurrency(product.price)}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEdit(product)
                                                    }
                                                    className="rounded-lg p-2 text-on-surface-variant transition-all hover:bg-surface-container active:scale-90"
                                                >
                                                    <span className="material-symbols-outlined text-xl">
                                                        edit
                                                    </span>
                                                </button>
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    preserveScroll
                                                    href={ProductController.destroy.url(
                                                        {
                                                            product: product.id,
                                                        },
                                                    )}
                                                    onClick={(e) => {
                                                        if (
                                                            !window.confirm(
                                                                `Hapus produk "${product.name}"?`,
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="rounded-lg p-2 text-error transition-all hover:bg-error-container/20 active:scale-90"
                                                >
                                                    <span className="material-symbols-outlined text-xl">
                                                        delete
                                                    </span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-16 text-center text-on-surface-variant"
                                        >
                                            Belum ada produk. Klik{' '}
                                            <span className="font-semibold">
                                                Tambah Produk Baru
                                            </span>{' '}
                                            untuk membuat produk pertama.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create / Edit dialog */}
            <Dialog
                open={open}
                onOpenChange={(next) => (next ? setOpen(true) : close())}
            >
                <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </DialogTitle>
                        <DialogDescription>
                            {editing
                                ? 'Perbarui detail produk ini.'
                                : 'Lengkapi detail untuk menambahkan produk baru.'}
                        </DialogDescription>
                    </DialogHeader>
                    <Form
                        key={editing ? `edit-${editing.id}` : 'create'}
                        {...(editing
                            ? ProductController.update.form({
                                  product: editing.id,
                              })
                            : ProductController.store.form())}
                        options={{ preserveScroll: true }}
                        onSuccess={() => close()}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <ProductFormFields
                                    errors={errors}
                                    product={editing ?? undefined}
                                />
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={close}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {editing ? 'Simpan' : 'Tambah'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Floating action for mobile */}
            <button
                onClick={openCreate}
                className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform active:scale-95 md:hidden"
            >
                <span className="material-symbols-outlined">add</span>
            </button>
        </>
    );
}

AdminProducts.layout = {
    breadcrumbs: [
        {
            title: 'Kelola Produk',
            href: adminProducts(),
        },
    ],
};
