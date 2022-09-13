import { DataBlock, DisplayBlock } from "../block.types";
import useSettings from "../state/useSettings";
import useNaturalColor from "./useColor";
import useHeightMap from "./useHeightMap";

export default function useDisplay(scale: number) {
  const getNaturalColor = useNaturalColor();
  const getHeightMapColor = useHeightMap();

  const display = useSettings((s) => s.display);
  const getColor = display === "color" ? getNaturalColor : getHeightMapColor;

  return ({ x, y, z, height }: DataBlock): DisplayBlock => ({
    x: x * scale,
    y: y * scale,
    z: z * scale,
    color: getColor(height * scale)
  });
}
