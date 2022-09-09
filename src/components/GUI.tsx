import { button, Leva, useControls } from "leva";
import useSettings, { Settings } from "../state/useSettings";

export default function GUI() {
  const colors = useSettings((s) => s.colors);
  const generation = useSettings((s) => s.generation);
  const setColorValue = useSettings((s) => s.setColorValue);
  const setColor = useSettings((s) => s.setColor);
  const setGeneration = useSettings((s) => s.setGeneration);

  useControls("Color", () => {
    const res = {} as any;
    Object.keys(colors).forEach((color) => {
      res[color] = {
        value: colors[color].value,
        min: 0,
        max: 1,
        onChange: (v: number) => setColorValue(color, v),
      };

      res[color + " Color"] = {
        value: colors[color].color,
        onChange: (v: string) => setColor(color, v),
      };
    });

    return res;
  });

  const [_, set] = useControls("Generation", () => {
    const res = {} as any;
    (Object.keys(generation) as Array<keyof Settings["generation"]>).forEach(
      (param) => {
        res[param] = {
          value: generation[param],
          min: 0,
          max: 1,
          onChange: (v: number) => setGeneration(param, v),
        };
      }
    );

    return res;
  });

  useControls({
    Regenerate: button(() => set({ Seed: Math.random() })),
  });

  return <Leva collapsed />;
}
