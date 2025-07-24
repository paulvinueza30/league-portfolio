import ColorThief from "colorthief";
import { skins } from "../components/skin-carousel/skins";

export interface Gradient {
  light: string;
  dark: string;
}
export const defaultGradient: Gradient = {
  light: "rgba(20, 20, 60, 0.6)",
  dark: "rgba(15, 15, 45, 0.9)",
};

export async function buildGradientMap(): Promise<Map<string, Gradient>> {
  const gradientMap = new Map<string, Gradient>();

  const promises = skins.map(async (skin) => {
    const gradient = await getGradient(skin.skinImg);
    gradientMap.set(skin.skinImg, gradient);
  });

  await Promise.all(promises);

  return gradientMap;
}

async function getGradient(skinImg: string): Promise<Gradient> {
  return new Promise((resolve) => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const palette = colorThief.getPalette(img, 2);
        resolve({
          light: `rgba(${palette[0].join(",")}, 0.6)`,
          dark: `rgba(${palette[1].join(",")}, 0.9)`,
        });
      } catch {
        resolve({
          light: "rgba(20, 20, 60, 0.6)",
          dark: "rgba(15, 15, 45, 0.9)",
        });
      }
    };

    img.onerror = () => {
      resolve({
        light: "rgba(30, 30, 60, 0.6)",
        dark: "rgba(10, 10, 30, 0.9)",
      });
    };

    img.src = skinImg;
  });
}
