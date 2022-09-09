import { useMemo } from "react";
import { Vector3 } from "three";
import { useScale } from "./useScale";

export function useNormalizer(points: Vector3[]) {
  const scale = useScale(points);
  const normalizedPoints = useMemo(
    () => points.map((p) => p.multiplyScalar(scale)),
    [points, scale]
  );

  return { scale, normalizedPoints };
}
