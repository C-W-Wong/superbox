import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SuperBox",
    short_name: "SuperBox",
    description:
      "The 3-in-1 Laser Measuring Tape Tool. 60m laser, 5m steel tape, 90° cross-line laser.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#EAB308",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
