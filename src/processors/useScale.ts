import { useMemo } from "react";

const MAP_SIZE = 8;

/**
 * Find the scale to apply to a terrain of given boundaries
 * so that it is contained in a fixed volume.
 */
export function useScale(xmin: number, xmax: number, ymin: number, ymax: number) {
  return useMemo(() => {
    const sideX = xmax - xmin;
    const sideY = ymax - ymin;
    const largestSide = Math.max(sideX, sideY);

    return MAP_SIZE / largestSide;
  }, [xmin, xmax, ymin, ymax]);
}
