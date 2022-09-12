import { useMemo } from "react";
import { Vector3 } from "three";
import useSettings from "../state/useSettings";

const TERRAIN_MAX_SIZE = 500;

export default function useSquareSurface(): Vector3[] {
  const resolution = useSettings((s) => s.generation.Resolution);
  const terrainSize = Math.max(TERRAIN_MAX_SIZE * resolution, 20);

  return useMemo(() => {
    const pts = [];

    for (let x = -terrainSize / 2; x < terrainSize / 2; x++) {
      for (let y = -terrainSize / 2; y < terrainSize / 2; y++) {
        pts.push(new Vector3(x, y, 0));
      }
    }
    return pts;
  }, [resolution]);
}
