import { useAtom } from "jotai";
import { skinAtom } from "@/atoms/champAtom";
import { useState, useEffect } from "react";
import { type Skin, defaultSkin, artSkins, portraitSkins } from "./skins";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export default function SkinCarousel() {
  const [selectedSkin, setSkin] = useAtom(skinAtom);

  const [api, setApi] = useState<CarouselApi>();
  const [carouselView, setCarouselView] = useState<string>("art");
  function getSkinArr(): Skin[] {
    if (carouselView == "art") return artSkins;
    return portraitSkins;
  }
  const GenerateCarouselItems = () => {
    const skinArr = getSkinArr();
    return (
      <>
        {skinArr.map((skin: Skin, idx) => (
          <CarouselItem
            key={skin.skinName}
            className={`cursor-pointer basis-1/5 flex justify-center ${
              skin.skinImg === defaultSkin.skinName && "joy-skin-showcase"
            }`}
            onClick={() => {
              api?.scrollTo(idx);
              setSkin(skinArr[idx]);
            }}>
            <img
              src={skin.skinImg}
              alt={skin.skinName + " skin"}
              className={cn(
                "w-full h-18 object-fit border-5 transition-all",
                idx == api?.selectedScrollSnap()
                  ? "border-[#C8AA6E] scale-100 shadow-lg shadow-yellow-400/30" // League gold
                  : "scale-65 border-[#463714] hover:scale-85 hover:border-[#785A28]" // Dark gold
              )}
            />
          </CarouselItem>
        ))}
      </>
    );
  };
  useEffect(() => {
    if (!api) return;
    const skinArr = getSkinArr();
    const middle = Math.floor(skinArr.length / 2);
    api?.scrollTo(middle);

    setSkin(skinArr[middle]);
  }, [carouselView, api]);
  useEffect(() => {
    if (!api) return;

    const handler = () => {
      const currentSlide = api.selectedScrollSnap();
      const skinArr = getSkinArr();
      setSkin(skinArr[currentSlide]);
    };

    handler();
    api.on("select", handler);
    return () => {
      api.off("select", handler);
    };
  }, [api, carouselView]);
  return (
    <div className="w-[39.5em] h-full flex flex-col gap-4 items-center justify-end text-white">
      <div className="flex items-center gap-2 mr-7 ">
        <Label
          htmlFor="mode"
          className={cn(
            "px-3 py-1 bg-black/50 ",
            carouselView == "art" ? "opacity-50" : "font-bold"
          )}>
          Portraits
        </Label>

        <Switch
          id="mode"
          checked={carouselView === "art"}
          onCheckedChange={(c) => setCarouselView(c ? "art" : "portraits")}
          className="
    data-[state=checked]:bg-[#C8AA6E] 
    data-[state=unchecked]:bg-[#3f62a8]

    [&>span]:bg-[#96a7c9]              /* thumb base */
    border border-[#5A4634]
    shadow-[0_0_6px_#C8AA6E66]
    transition-colors duration-300
  "
        />

        <Label
          htmlFor="mode"
          className={cn(
            " px-3 py-1 bg-black/50",
            carouselView == "portraits" ? "opacity-50" : "font-bold"
          )}>
          Art
        </Label>
      </div>
      <div className="px-3 py-1 bg-black/50 ">
        <p className="text-white text-md font-bold">{selectedSkin?.skinName}</p>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          dragFree: false,
        }}
        className="w-full self-center">
        <CarouselContent className="flex-nowrap h-max ">
          <GenerateCarouselItems key={carouselView} />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
