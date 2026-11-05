import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

// Only pages that are linked from the site. The Bavovna case page is left
// out: that site is down and the page is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${SITE.url}/`,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE.url}/projects/tokarchuk-dental`,
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
