import { useMemo } from "react";
import useSettings from "../state/useSettings";
import useColor from "./useColor";
import useFBM from "./useFBM";
import { useNormalizer } from "./useNormalizer";
import useRectangleMap from "./useRectangleMap";

export const useData = () => {
  const points = useRectangleMap();
  const { scale, normalizedPoints } = useNormalizer(points);

  const waterLevel = useSettings((s) => s.colors.Water.value);
  const generationScale = useSettings((s) => s.generation.Scale);
  const generationHeight = useSettings((s) => s.generation.Height);

  const noise = useFBM();
  const color = useColor();

  return useMemo(
    () =>
      normalizedPoints.map((point, i) => {
        const p = point.clone().multiplyScalar(generationScale);
        let height = noise(p) * generationHeight;
        const c = color(height);

        if (height < waterLevel) height = waterLevel;

        point.z = height * 4;

        return { position: point, scale, color: c };
      }),
    [
      normalizedPoints,
      generationScale,
      generationHeight,
      color,
      waterLevel,
      scale,
    ]
  );
};
