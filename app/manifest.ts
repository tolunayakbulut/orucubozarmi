import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Orucu Bozar Mı?",
    short_name: "OrucuBozarMi",
    description:
      "Diyanet fetvalarına göre orucu bozan ve bozmayan durumları öğrenin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#059669",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
