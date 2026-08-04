import type { ChangeEvent } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { assetUrl } from '@/types';

export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
};

const inputClasses =
    'h-auto w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-surface-container-lowest';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

export function ProductFormFields({
    errors,
    product,
}: {
    errors: Record<string, string>;
    product?: Product;
}) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        assetUrl(product?.image),
    );

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className={labelClasses} htmlFor="name">
                    Nama Produk
                </label>
                <Input
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
                <Textarea
                    id="description"
                    className={inputClasses}
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
                <Input
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
                <div className="group relative mx-auto flex aspect-4/5 w-full max-w-[220px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-high/50 transition-colors hover:border-primary">
                    <input
                        id="image"
                        className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview ? (
                        <img
                            className="absolute inset-0 h-full w-full object-cover opacity-60"
                            alt="Pratinjau produk"
                            src={imagePreview}
                        />
                    ) : (
                        <span className="material-symbols-outlined mb-2 text-[48px] text-primary">
                            add_photo_alternate
                        </span>
                    )}
                    <p className="pointer-events-none relative z-10 text-sm font-bold text-on-surface">
                        {imagePreview
                            ? 'Klik untuk mengganti gambar'
                            : 'Klik untuk memilih gambar'}
                    </p>
                    <p className="pointer-events-none relative z-10 text-center text-[11px] text-on-surface-variant">
                        JPG, PNG, atau WebP · Maks 2MB · Rekomendasi 800x1000px
                    </p>
                </div>
                <InputError message={errors.image} />
            </div>
        </div>
    );
}
