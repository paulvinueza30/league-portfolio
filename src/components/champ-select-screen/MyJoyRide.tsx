import { useAtom } from "jotai";
import { joyrideAtom } from "@/atoms/joyrideAtom";
import Joyride from "react-joyride";

const steps = [
  {
    target: ".joy-rune-dropdown",
    content: "Pick a portfolio section to explore different areas of me.",
  },
  {
    target: ".joy-rune-page-opener",
    content: "Click to view details for the selected section.",
  },
  {
    target: ".joy-summ-spells",
    content: "Quick navigation links to key pages.",
  },
  {
    target: ".joy-skills-showcase",
    content: "My technical skills and what I work with.",
  },
  {
    target: ".joy-resume-button",
    content: "Download my resume.",
  },
  {
    target: ".joy-message-button",
    content: "Get in touch with me.",
  },
  {
    target: ".joy-champ-portrait",
    content: "Click my portrait for more info.",
  },
  {
    target: ".joy-lock-in-button",
    content: "Confirm your selection.",
  },
  {
    target: ".joy-skin-showcase",
    content: "Photos and artwork gallery.",
  },
];

export default function MyJoyRide() {
  const [runTour, setRunTour] = useAtom(joyrideAtom);

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={(data) => {
        if (["finished", "skipped"].includes(data.status)) {
          setRunTour(false);
        }
      }}
      styles={{
        options: {
          arrowColor: "#0a1428",
          backgroundColor: "#0a1428",
          overlayColor: "rgba(1, 10, 19, 0.85)",
          primaryColor: "#c8aa6e",
          textColor: "#f0e6d2",
          width: 380,
          zIndex: 10000,
        },
        tooltipContainer: {
          backgroundColor: "#0a1428",
          border: "2px solid #463714",
          borderRadius: "10px",
          boxShadow: `
    0 0 20px rgba(200, 170, 110, 0.3),
    inset 0 1px 0 rgba(200, 170, 110, 0.15), // Gold inner glow
    0 8px 32px rgba(0, 0, 0, 0.8)
  `,
          color: "#f0e6d2",
          padding: "18px",
        },
        tooltipTitle: {
          color: "#c8aa6e",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "10px",
          textShadow: "0 0 8px rgba(200, 170, 110, 0.5)",
          borderBottom: "1px solid #463714",
          paddingBottom: "8px",
        },
        tooltipContent: {
          color: "#f0e6d2",
          lineHeight: "1.6",
          fontSize: "14px",
        },
        tooltipFooter: {
          marginTop: "16px",
          borderTop: "1px solid #463714",
          paddingTop: "12px",
        },
        buttonNext: {
          backgroundImage:
            "linear-gradient(180deg, #c8aa6e 0%, #c8954a 50%, #a0782c 100%)",
          border: "2px solid #463714",
          borderRadius: "6px",
          color: "#0a1428",
          fontSize: "13px",
          fontWeight: "bold",
          padding: "8px 16px",
          textTransform: "uppercase",
          boxShadow: `
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.6)
          `,
          transition: "all 0.2s ease",
        },
        buttonBack: {
          backgroundColor: "transparent",
          border: "2px solid #463714",
          borderRadius: "6px",
          color: "#c8aa6e",
          fontSize: "13px",
          fontWeight: "bold",
          padding: "8px 16px",
          textTransform: "uppercase",
          marginRight: "8px",
        },
        buttonSkip: {
          backgroundColor: "transparent",
          border: "1px solid #555c63",
          borderRadius: "4px",
          color: "#888",
          fontSize: "11px",
          padding: "6px 12px",
          textTransform: "uppercase",
        },
        beacon: {
          backgroundColor: "#c8aa6e",
          border: "3px solid #f0e6d2",
          boxShadow: "0 0 20px rgba(200, 170, 110, 0.8)",
        },
        beaconInner: {
          backgroundColor: "#c8aa6e",
        },
        spotlight: {
          borderRadius: "6px",
          boxShadow: `
            0 0 0 9999px rgba(1, 10, 19, 0.85),
            0 0 30px rgba(200, 170, 110, 0.4)
          `,
        },
        overlay: {
          backgroundColor: "rgba(1, 10, 19, 0.85)",
        },
      }}
      floaterProps={{
        styles: {
          floater: {
            filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.8))",
          },
        },
      }}
    />
  );
}
