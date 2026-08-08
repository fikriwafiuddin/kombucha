import { Head, Link } from '@inertiajs/react';
import { LandingFooter } from '@/components/landing-footer';
import { LandingNav } from '@/components/landing-nav';
import { WhatsAppFab } from '@/components/whatsapp-fab';
import { landing } from '@/routes';
import type { Product, SiteContent } from '@/types';
import { formatCurrency } from '@/utils/fomatter';

interface ProductsProps {
    siteContent: SiteContent;
    products: Product[];
}

export default function Products({ siteContent, products }: ProductsProps) {
    return (
        <>
            <Head title="Produk Kami" />

            <div className="scroll-smooth bg-background font-sans text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
                <LandingNav />

                {/* Page Header */}
                <section className="mx-auto max-w-[1280px] px-[24px] pt-32 pb-12">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-semibold text-primary md:text-5xl">
                            Produk Kami
                        </h1>
                        <p className="mx-auto max-w-2xl text-on-surface-variant">
                            Diseduh dengan buah asli dan rempah segar.
                        </p>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="mx-auto max-w-[1280px] px-[24px] pb-24">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <div
                                className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                                key={product.id}
                            >
                                <div className="relative aspect-4/5 overflow-hidden">
                                    <img
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={product.name}
                                        src={`/storage/${product.image}`}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-on-surface">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 mb-4 text-sm text-on-surface-variant">
                                        {product.description}
                                    </p>
                                    <span className="font-bold text-primary">
                                        {formatCurrency(product.price)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <p className="py-16 text-center text-on-surface-variant">
                            Belum ada produk yang tersedia.
                        </p>
                    )}

                    <div className="mt-16 text-center">
                        <Link
                            href={landing()}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </section>

                <LandingFooter siteContent={siteContent} />
                <WhatsAppFab siteContent={siteContent} />
            </div>
        </>
    );
}

Products.layout = {
    breadcrumbs: [],
    hideSidebar: true,
    hideHeader: true,
};
