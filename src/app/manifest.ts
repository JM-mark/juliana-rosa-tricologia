import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Juliana Rosa · Tricologia e Sobrancelha",
    short_name: "Juliana Rosa",
    start_url: ".",
    display: "standalone",
    background_color: "#f4ece3",
    theme_color: "#f4ece3",
    icons: [{ src: "icon.png", sizes: "512x512", type: "image/png" }],
  };
}
