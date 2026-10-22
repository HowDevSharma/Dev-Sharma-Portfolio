import type { Metadata } from "next";
import { playground } from "@/content/site";
import { Ruler } from "@/components/layout/Ruler";
import { PlaygroundCanvas } from "@/components/playground/PlaygroundCanvas";

export const metadata: Metadata = {
  title: "Playground",
  description: "A pinboard of photos, doodles and small things. Drag them around.",
};

export default function PlaygroundPage() {
  return (
    <>
      <h1 className="sr-only">Playground</h1>
      <Ruler />
      <PlaygroundCanvas items={playground.items} hint={playground.hint} />
    </>
  );
}
