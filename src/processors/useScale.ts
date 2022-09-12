import { useMemo } from "react";
import { Coordinates } from "../block.types";

const MAP_SIZE = 8;

/**
 * Find the scale to apply to the input coordinates so that they are contained
 * in a fixed volume.
 *
 * @param points list of 3D coordinates
 * @returns the scale to apply to the coordinates
 */
export function useScale(points: Coordinates[]): number {
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
