import { BASE_PATH } from "@/config";

/** Prefixa arquivos de public/ com o basePath (GitHub Pages). */
export const asset = (path: string) => `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
