import { greyRole } from "@/assets/role";
import { champPortrait } from "@/assets/self-pics";

export default function ChampSelector() {
  return (
    <div className="w-[39.5em] h-full flex flex-col gap-1 justify-between">
      <div className="flex-1">
        <img src={greyRole} alt="software engineer role" className="w-6 h-6" />
        <div className="bg-[#363825] w-full h-0.5" />

        <div className="w-1/5 h-1/5 flex flex-col justify-items-center gap-2 mt-2">
          <button>
            <img src={champPortrait} alt="Champion portrait of me" />
          </button>
          <span className="text-center text-lg text-[#939088] ">ポール</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="relative w-xs h-12"
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            borderBottomLeftRadius: "60% 100%",
            borderBottomRightRadius: "60% 100%",
            backgroundColor: "#5bc0de", // border color
            padding: "2px", // thickness of the fake border
          }}
        >
          <button
            className="w-full h-full text-white font-bold uppercase tracking-wider flex items-center justify-center relative group"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
              borderBottomLeftRadius: "60% 100%",
              borderBottomRightRadius: "60% 100%",
              backgroundColor: "#0c0d0e",
            }}
          >
            <span className="relative z-10 text-sm group-hover:text-[#5bc0de] transition-colors drop-shadow-sm">
              Lock In
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5bc0de] to-transparent opacity-5 group-hover:opacity-20 transition-opacity blur-lg pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
}
