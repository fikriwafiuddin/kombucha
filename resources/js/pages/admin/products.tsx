import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { products as adminProducts } from '@/routes/admin';
import { formatCurrency } from '@/utils/fomatter';
import type { Product } from './products/product-form-fields';

type PageProps = {
    products: Product[];
};

export default function AdminProducts() {
    const { products } = usePage<PageProps>().props;

    const [deleting, setDeleting] = useState<Product | null>(null);

    return (
        <>
            <Head title="Kelola Produk" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Produk
                    </h2>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="products" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                                <span className="material-symbols-outlined">
                                    inventory_2
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">Produk</h3>
                        </div>
                        <Link
                            href={ProductController.create.url()}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold tracking-wide text-on-primary shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Tambah Produk
                        </Link>
                    </div>

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
                                                                alt={
                                                                    product.name
                                                                }
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
                                                    {formatCurrency(
                                                        product.price,
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={ProductController.edit.url(
                                                            {
                                                                product:
                                                                    product.id,
                                                            },
                                                        )}
                                                        className="flex items-center rounded-lg p-2 text-on-surface-variant transition-all hover:bg-surface-container active:scale-90"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">
                                                            edit
                                                        </span>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDeleting(product)
                                                        }
                                                        className="flex items-center rounded-lg p-2 text-error transition-all hover:bg-error-container/20 active:scale-90"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">
                                                            delete
                                                        </span>
                                                    </button>
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
                                                    Tambah Produk
                                                </span>{' '}
                                                untuk membuat produk pertama.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <ConfirmDeleteDialog
                item={deleting}
                onClose={() => setDeleting(null)}
                deleteUrl={(p) =>
                    ProductController.destroy.url({ product: p.id })
                }
                title="Hapus Produk?"
                description={
                    <>
                        Yakin ingin menghapus produk{' '}
                        <span className="font-semibold text-on-surface">
                            {deleting?.name}
                        </span>
                        ? Tindakan ini tidak dapat dibatalkan.
                    </>
                }
            />
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
