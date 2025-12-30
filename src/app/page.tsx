import { ControlPanel } from "@/components/control-panel";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-8 px-2">
        <ControlPanel />
      </main>
    </div>
  );
}
