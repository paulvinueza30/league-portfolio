import { useAtom } from "jotai";
import { skinAtom } from "@/atoms/champAtom";
import { useState, useEffect } from "react";
import { type Skin, defaultSkin, skins } from "./skins";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

function Separator() {
  return (
    <div className="bg-[#C8AA6E] border-0.5 border-[#C8AA6E] w-1/4 h-px" />
  );
}

// TODO : fix overflow issues

export default function SkinCarousel() {
  const [selectedSkin, setSkin] = useAtom(skinAtom);

  const [api, setApi] = useState<CarouselApi>();
  const carouselStartIdx = skins.findIndex(
    (skin) => skin.skinImg == defaultSkin.skinImg
  );

  useEffect(() => setSkin(defaultSkin), []);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(carouselStartIdx);

    api.on("select", () => {
      const currentSlide = api.selectedScrollSnap();
      setSkin(skins[currentSlide]);
    });
  }, [api]);
  return (
    <div className="w-[39.5em] h-full flex flex-col gap-4 items-center">
      <div className="w-full flex-grow flex flex-col items-center justify-center">
        {/* <div className="w-[30em] h-[28em] rounded-full  overflow-hidden">
          <img
            className="w-full h-full object-fill"
            src={selectedSkin.skinImg}
            alt={selectedSkin.skinName + " skin"}
            draggable={false}
          />
        </div> */}
      </div>
      <p className="text-white text-md">{selectedSkin?.skinName}</p>
      <div className="flex flex-row justify-between w-7/10 items-center ">
        <Separator />
        <div className="flex gap-2">
          {skins.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                idx == api?.selectedScrollSnap()
                  ? "bg-gradient-to-b from-[#a37308] to-[#fabe3cfd] shadow-md shadow-yellow-900/40 border border-[#C8AA6E]"
                  : "bg-transparent border-2 border-[#C8AA6E]"
              )}
            />
          ))}
        </div>
        <Separator />
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          startIndex: carouselStartIdx,
          dragFree: false,
        }}
        className="w-full self-center"
      >
        <CarouselContent className="flex-nowrap h-max ">
          {skins.map((skin: Skin, idx) => (
            <CarouselItem
              key={skin.skinName}
              className={`cursor-pointer basis-1/5 flex justify-center ${
                skin.skinImg === defaultSkin.skinName && "joy-skin-showcase"
              }`}
              onClick={() => {
                api?.scrollTo(idx);
              }}
            >
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
        </CarouselContent>
      </Carousel>
    </div>
  );
}
