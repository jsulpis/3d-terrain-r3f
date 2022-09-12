import { useMemo } from "react";
import { DataBlockProvider } from "../block.types";
import { useScale } from "../processors/useScale";
import useSettings from "../state/useSettings";
import useFbmNoise from "./useFbmNoise";
import useSquareSurface from "./useSquareSurface";

const useProceduralDataBlocks: DataBlockProvider = () => {
  const surface = useSquareSurface();
  const scale = useScale(surface);

  const waterLevel = useSettings((s) => s.colors.Water.value);
  const generationScale = useSettings((s) => s.generation.Scale);
  const generationHeight = useSettings((s) => s.generation.Height);

  const noise = useFbmNoise();

  return useMemo(
    () =>
      surface.map((point) => {
        const realHeight =
          noise({
            x: point.x * scale * generationScale,
            y: point.y * scale * generationScale,
            z: point.z * scale * generationScale
          }) * generationHeight;
        let visibleHeight = realHeight;

        if (visibleHeight < waterLevel) visibleHeight = waterLevel;

        point.z = (visibleHeight / scale) * 3;

        return { ...point, height: realHeight / scale };
      }),
    [surface, generationScale, generationHeight, waterLevel, noise]
  );
};

export default useProceduralDataBlocks;
