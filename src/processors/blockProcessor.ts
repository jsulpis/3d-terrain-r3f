import { DataBlock, DataBlockProcessor } from "../block.types";
import useColor from "./useColor";
import { useScale } from "./useScale";

const createDataBlockProcessor = (dataBlocks: DataBlock[]): DataBlockProcessor => {
  const scale = useScale(dataBlocks);
  const color = useColor();

  return ({ x, y, z, height }: DataBlock) => ({
    x: x * scale,
    y: y * scale,
    z: z * scale,
    color: `#${color(height * scale)}`
  });
};

export default createDataBlockProcessor;
