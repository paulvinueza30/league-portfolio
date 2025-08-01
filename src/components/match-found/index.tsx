export default function MatchFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-white bg-opacity-50">
      <div className="w-160 h-160 bg-transparent border-2 border-red-300 rounded-full justify-center flex items-center">
        <div className="bg-blue-300 w-140 h-140 rounded-full justify-center flex flex-col items-center">
          <div className="bg-green-300 w-130 h-130 rounded-full flex flex-col  justify-around">
            <div className="flex flex-col justify-center items-center flex-1">
              <img
                className="w-1/4 h-[25%]"
                src="/league-p.png"
                alt="custom league inspired logo"
              />
              <h2 className="text-2xl uppercase">Portfolio Found</h2>
              <p className="text-xs">Paul's Rift - Portfolio Review - 1v1 </p>
            </div>
            <AcceptButton />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 border-2 border-[#4D4C42] w-[8em] text-center">
          <button className="">Decline</button>
        </div>
      </div>
    </div>
  );
}

function AcceptButton() {
  const enabled = true;
  return (
    <div className="flex justify-center">
      <div
        className={`joy-lock-in-button relative w-xs h-12 transition-transform duration-150 ${
          enabled && "hover:scale-105 active:scale-85"
        }`}
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 95% 100%, 5% 100%)",
          borderBottomLeftRadius: "60% 100%",
          borderBottomRightRadius: "60% 100%",
          backgroundColor: enabled ? "#5bc0de" : "#666666",
          padding: "10px",
        }}
      >
        <button
          className={`w-full h-full text-white font-bold uppercase tracking-wider flex items-center justify-center relative group ${
            !enabled && "cursor-not-allowed"
          }`}
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)",
            borderBottomLeftRadius: "60% 90%",
            borderBottomRightRadius: "60% 100%",
            backgroundColor: "#0c0d0e",
          }}
          onClick={() => {}}
          disabled={!enabled}
        >
          <span
            className={`relative z-10 text-lg transition-colors drop-shadow-sm uppercase ${
              enabled ? "group-hover:text-[#5bc0de]" : "text-gray-500"
            }`}
          >
            Accept
          </span>

          {enabled && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5bc0de] to-transparent opacity-5 group-hover:opacity-20 transition-opacity blur-lg pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}
