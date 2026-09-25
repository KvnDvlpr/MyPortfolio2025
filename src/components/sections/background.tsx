import { CardDeck } from "@/components/background/card-deck";
import { DeckScene } from "@/components/background/deck-scene";
import { SketchLayer } from "@/components/sketch/sketch-layer";

export function Background() {
  return (
    <section id="background" className="deck-section section-pad has-sketch overflow-hidden">
      <SketchLayer
        items={[
          { doodle: "filmStrip", className: "top-[2.2rem] left-[44%] w-28 -rotate-6 hidden nav:block" },
          { doodle: "camera", className: "bottom-[0.6rem] right-[5%] w-20 rotate-12 hidden nav:block" },
          { doodle: "piano", className: "bottom-[0.2rem] left-[6%] w-32 -rotate-3" },
        ]}
      />
      <DeckScene />
      <div className="container-page">
        <CardDeck />
      </div>
    </section>
  );
}
