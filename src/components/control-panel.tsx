"use client";

import { useReducer } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Fan, Droplet, Power, PowerOff, DropletOff } from "lucide-react";
import { cn } from "@/lib/utils";

export type CoolerState = {
  power: "on" | "off";
  fanSpeed: "off" | "low" | "high";
  waterPump: "on" | "off";
  fanMode: "auto" | "manual";
  pumpMode: "auto" | "manual";
};

export type CoolerAction =
  | { type: "SET_STATE"; payload: Partial<CoolerState> }
  | { type: "POWER_OFF" }
  | { type: "FAN_SPEED_LOW" }
  | { type: "FAN_SPEED_HIGH" }
  | { type: "WATER_PUMP_ON" }
  | { type: "WATER_PUMP_OFF" }
  | { type: "SET_FAN_MODE"; mode: "auto" | "manual" }
  | { type: "SET_PUMP_MODE"; mode: "auto" | "manual" };

const initialState: CoolerState = {
  power: "off",
  fanSpeed: "off",
  waterPump: "off",
  fanMode: "manual",
  pumpMode: "manual",
};

function coolerReducer(state: CoolerState, action: CoolerAction): CoolerState {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };

    case "POWER_OFF":
      return { ...state, power: "off", fanSpeed: "off", fanMode: "manual" };

    case "FAN_SPEED_LOW":
      return { ...state, power: "on", fanSpeed: "low", fanMode: "manual" };

    case "FAN_SPEED_HIGH":
      return { ...state, power: "on", fanSpeed: "high", fanMode: "manual" };

    case "WATER_PUMP_ON":
      return { ...state, waterPump: "on", pumpMode: "manual" };

    case "WATER_PUMP_OFF":
      return { ...state, waterPump: "off", pumpMode: "manual" };

    case "SET_FAN_MODE":
      return { ...state, fanMode: action.mode };

    case "SET_PUMP_MODE":
      return { ...state, pumpMode: action.mode };

    default:
      return state;
  }
}

export function ControlPanel() {
  const [state, dispatch] = useReducer(coolerReducer, initialState);
  const { power, fanSpeed, waterPump, fanMode, pumpMode } = state;

  const PowerIcon = power === "on" ? Power : PowerOff;
  const PumpIcon = waterPump === "on" ? Droplet : DropletOff;

  const getFanSpeedLabel = () => {
    switch (fanSpeed) {
      case "low":
        return "کند";
      case "high":
        return "تند";
      default:
        return "ایستاده";
    }
  };

  const handleFanAuto = () => dispatch({ type: "SET_FAN_MODE", mode: "auto" });
  const handlePumpAuto = () =>
    dispatch({ type: "SET_PUMP_MODE", mode: "auto" });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {/* Status Display */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center gap-3">
            <PowerIcon
              className={cn(
                "h-12 w-12",
                power === "on" ? "text-green-600" : "text-red-600"
              )}
            />
            <Badge variant="secondary">
              وضعیت: {power === "on" ? "روشن" : "خاموش"}
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Fan
              className={cn("h-12 w-12", {
                "text-cyan-500 animate-[spin_3s_linear_infinite]":
                  fanSpeed === "low",
                "text-cyan-500 animate-spin": fanSpeed === "high",
                "text-gray-400": fanSpeed === "off",
              })}
            />
            <Badge variant="secondary">سرعت فن: {getFanSpeedLabel()}</Badge>
            <Badge
              variant={fanMode === "auto" ? "default" : "secondary"}
              className="text-xs"
            >
              {fanMode === "auto" ? "Auto" : "دستی"}
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-3">
            <PumpIcon
              className={cn(
                "h-12 w-12",
                waterPump === "on" ? "text-blue-600" : "text-gray-400"
              )}
            />
            <Badge variant="secondary">
              پمپ آب: {waterPump === "on" ? "روشن" : "خاموش"}
            </Badge>
            <Badge
              variant={pumpMode === "auto" ? "default" : "secondary"}
              className="text-xs"
            >
              {pumpMode === "auto" ? "َAuto" : "دستی"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Fan Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium">کنترل فن</label>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              variant={fanMode === "auto" ? "default" : "outline"}
              onClick={handleFanAuto}
            >
              Auto
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "FAN_SPEED_HIGH" })}
            >
              تند
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "FAN_SPEED_LOW" })}
            >
              کند
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "POWER_OFF" })}
            >
              خاموش
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Pump Controls */}
        <div className="space-y-3">
          <label className="text-sm font-medium">کنترل پمپ آب</label>
          <div className="flex justify-center gap-6">
            <Button
              variant={pumpMode === "auto" ? "default" : "outline"}
              onClick={handlePumpAuto}
            >
              Auto
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "WATER_PUMP_ON" })}
            >
              روشن
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch({ type: "WATER_PUMP_OFF" })}
            >
              خاموش
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
