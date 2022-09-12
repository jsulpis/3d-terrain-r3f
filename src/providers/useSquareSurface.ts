import { useMemo } from "react";
import { Coordinates } from "../block.types";
import useSettings from "../state/useSettings";

const TERRAIN_MAX_SIZE = 500;

export default function useSquareSurface(): Coordinates[] {
  const resolution = useSettings((s) => s.generation.Resolution);
  const terrainSize = Math.max(TERRAIN_MAX_SIZE * resolution, 20);

  return useMemo(() => {
    const pts = [];

    for (let x = -terrainSize / 2; x < terrainSize / 2; x++) {
      for (let y = -terrainSize / 2; y < terrainSize / 2; y++) {
        pts.push({ x, y, z: 0 });
      }
    }
    return pts;
  }, [resolution]);
}
