import { Gem } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-3">
      <Gem className="w-10 h-10 text-primaryPink animate-pulse" />
      <p className="text-mutedText text-sm font-medium tracking-wide">Loading sparkle...</p>
    </div>
  );
}