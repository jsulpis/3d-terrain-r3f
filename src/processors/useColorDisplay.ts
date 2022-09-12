import { DataBlockProcessor } from "../block.types";
import useColor from "./useColor";

export default function useColorDisplay(scale: number): DataBlockProcessor {
  const getColor = useColor();

  return ({ x, y, z, height }) => ({
    x: x * scale,
    y: y * scale,
    z: z * scale,
    color: `#${getColor(height * scale)}`
  });
}
