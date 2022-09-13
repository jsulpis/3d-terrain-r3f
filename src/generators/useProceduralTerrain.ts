import { useMemo } from "react";
import { Terrain } from "../block.types";
import useDimensions from "../processors/useDimensions";
import useScale from "../processors/useScale";
import useSettings from "../state/useSettings";
import useFbmNoise from "./useFbmNoise";
import useSquareSurface from "./useSquareSurface";

export default function useProceduralTerrain(): Terrain {
  const surface = useSquareSurface();
  const { xmin, xmax, ymin, ymax } = useDimensions(surface);
  const scale = useScale(xmin, xmax, ymin, ymax);

  const waterLevel = useSettings((s) => s.colors.Water.value);
  const generationScale = useSettings((s) => s.generation.Scale);
  const generationHeight = useSettings((s) => s.generation.Height);
  const display = useSettings((s) => s.display);

  const getNoiseValue = useFbmNoise();

  const dataBlocks = useMemo(
    () =>
      surface.map((point) => {
        const scaledVector = point.clone().multiplyScalar(scale * generationScale);
        const realHeight = getNoiseValue(scaledVector) * generationHeight;
        const visibleHeight =
          display === "color" ? Math.max(realHeight, waterLevel) : realHeight;

        point.z = (visibleHeight / scale) * 3;

        return { x: point.x, y: point.y, z: point.z, height: realHeight / scale };
      }),
    [surface, generationScale, generationHeight, waterLevel, getNoiseValue, display]
  );

  return { dataBlocks, xmin, xmax, ymin, ymax };
}
