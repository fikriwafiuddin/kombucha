import type { SiteContent } from '@/types';

export function WhatsAppFab({ siteContent }: { siteContent: SiteContent }) {
    return (
        <a
            className="group fixed right-8 bottom-8 z-60 flex w-auto items-center gap-2 rounded-full bg-secondary px-6 py-3 text-on-secondary shadow-[0_24px_24px_-4px_rgba(27,43,30,0.08)] transition-all hover:scale-105 active:scale-95"
            href={`https://wa.me/${(siteContent.whatsapp ?? '').replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi kami via WhatsApp"
        >
            <span className="material-symbols-outlined fill-1">chat</span>
            <span className="text-sm font-semibold">WhatsApp</span>
        </a>
    );
}
