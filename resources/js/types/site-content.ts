export type SiteContent = {
    id: number;
    // Hero
    hero_headline: string | null;
    hero_subheadline: string | null;
    hero_cta_text: string | null;
    hero_cta_link: string | null;
    hero_image: string | null;
    // About
    about_tag: string | null;
    about_title: string | null;
    about_description: string | null;
    about_feature_1_icon: string | null;
    about_feature_1_title: string | null;
    about_feature_1_description: string | null;
    about_feature_2_icon: string | null;
    about_feature_2_title: string | null;
    about_feature_2_description: string | null;
    about_image_1: string | null;
    about_image_2: string | null;
    // Benefits
    benefits_title: string | null;
    benefits_description: string | null;
    benefits_card_1_icon: string | null;
    benefits_card_1_title: string | null;
    benefits_card_1_description: string | null;
    benefits_card_2_icon: string | null;
    benefits_card_2_title: string | null;
    benefits_card_2_description: string | null;
    benefits_card_3_icon: string | null;
    benefits_card_3_title: string | null;
    benefits_card_3_description: string | null;
    // Contact
    whatsapp: string | null;
    operating_hours: string | null;
    instagram: string | null;
    address: string | null;
};

/**
 * Resolve a stored media path or an absolute URL into a usable image src.
 * Stored paths (e.g. "about/abc.jpg") are prefixed with the public disk URL,
 * while absolute URLs are returned untouched.
 */
export function assetUrl(path: string | null | undefined): string | null {
    if (!path) {
        return null;
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return `/storage/${path}`;
}
