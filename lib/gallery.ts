/**
 * Екрани для 3D-кільця в секції Портфоліо (десктоп, від 1024px).
 *
 * Один запис — одна картка кільця. Щоб додати екран (головна, адмінка,
 * мобільна версія): покласти картинку в public/projects/ і додати сюди
 * рядок. Коду чіпати не треба — кільце саме перерахує радіус.
 *
 * - projectId — slug проєкту з HERO_BROWSER_PROJECTS (lib/constants.ts).
 *   Назва, опис, теги й посилання інфо-панелі беруться звідти, тут вони
 *   не дублюються. Кілька екранів одного проєкту мають однаковий projectId.
 * - src       — шлях від public/. WebP, ширина ~1400px, пропорції близько
 *               2:1 (картка обрізає зайве знизу, вирівнювання по верху).
 * - subtitle  — коротко, що це за екран; показується в mono-мітці панелі.
 *
 * Порядок у масиві — порядок карток по колу. Екрани одного проєкту
 * варто ставити поруч.
 */
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";

export type GalleryProjectId = (typeof HERO_BROWSER_PROJECTS)[number]["slug"];

export type GalleryItem = {
    projectId: GalleryProjectId;
    src: string;
    alt: string;
    title: string;
    subtitle: string;
};

const titleOf = (id: GalleryProjectId) =>
    HERO_BROWSER_PROJECTS.find((p) => p.slug === id)!.title;

const screen = (
    projectId: GalleryProjectId,
    src: string,
    subtitle: string
): GalleryItem => ({
    projectId,
    src,
    subtitle,
    title: titleOf(projectId),
    alt: `${titleOf(projectId)} — ${subtitle.toLowerCase()}`,
});

export const GALLERY: GalleryItem[] = [
    screen("tokarchuk-dental", "/projects/tokarchuk-dental.webp", "Головна сторінка"),
    screen("bavovnastore", "/projects/bavovnastore.webp", "Головна сторінка"),
    screen("florist-shop", "/projects/florist-shop.webp", "Головна сторінка"),
    screen("furniture-site", "/projects/furniture-site.webp", "Головна сторінка"),
];
