import { useMemo } from "react";
import { Vector3 } from "three";

const MAP_SIZE = 8;

/**
 * Find the scale to apply to the input vectors so that they are contained
 * in a fixed volume.
 *
 * @param points list of 3D vectors
 * @returns the scale to apply to the vectors
 */
export function useScale(points: Vector3[]) {
  return useMemo(() => {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    const numberOfPoints = points.length;

    for (let i = 0; i < numberOfPoints; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      else if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      else if (p.y > maxY) maxY = p.y;
    }

    const sideX = maxX - minX;
    const sideY = maxY - minY;
    const largestSide = Math.max(sideX, sideY);

    return MAP_SIZE / largestSide;
  }, [points]);
}
