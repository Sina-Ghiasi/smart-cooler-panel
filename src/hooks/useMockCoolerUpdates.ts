import { CoolerAction } from "@/components/control-panel";
import { useEffect } from "react";

export function useMockCoolerUpdates(
  dispatch: React.Dispatch<CoolerAction>,
  fanMode: "auto" | "manual",
  pumpMode: "auto" | "manual"
) {
  useEffect(() => {
    if (fanMode === "manual" && pumpMode === "manual") {
      return;
    }

    const performUpdate = () => {
      if (fanMode === "auto") {
        const newSpeed = Math.random() > 0.5 ? "high" : "low";
        dispatch({
          type: "SET_STATE",
          payload: {
            power: "on",
            fanSpeed: newSpeed as "low" | "high",
          },
        });
      }

      if (pumpMode === "auto") {
        const newPumpState = Math.random() > 0.5 ? "on" : "off";
        dispatch({
          type: "SET_STATE",
          payload: {
            waterPump: newPumpState as "on" | "off",
          },
        });
      }
    };

    setTimeout(performUpdate, 80);

    const interval = setInterval(performUpdate, 15000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [dispatch, fanMode, pumpMode]);
}
