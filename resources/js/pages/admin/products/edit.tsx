import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { Button } from '@/components/ui/button';
import { products as adminProducts } from '@/routes/admin';
import type { Product } from './product-form-fields';
import { ProductFormFields } from './product-form-fields';

type PageProps = {
    product: Product;
};

export default function AdminProductEdit() {
    const { product } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Edit Produk" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <Link
                        href={adminProducts()}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container"
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </Link>
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Edit Produk
                    </h2>
                </div>
            </header>

            <div className="p-6 md:p-8">
                <Form
                    {...ProductController.update.form({
                        product: product.id,
                    })}
                    options={{ preserveScroll: true }}
                    className="mx-auto max-w-3xl space-y-6 rounded-4xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8"
                >
                    {({ processing, errors }) => (
                        <>
                            <ProductFormFields
                                errors={errors}
                                product={product}
                            />
                            <div className="flex items-center justify-end gap-3">
                                <Button type="button" variant="ghost" asChild>
                                    <Link href={adminProducts()}>Batal</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

AdminProductEdit.layout = {
    breadcrumbs: [
        {
            title: 'Kelola Produk',
            href: adminProducts(),
        },
        {
            title: 'Edit Produk',
            href: adminProducts(),
        },
    ],
};
