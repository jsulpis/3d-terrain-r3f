import { useMemo } from "react";
import { Coordinates } from "../block.types";

/**
 * Find the boundaries of a terrain made of blocks of the given coordinates
 */
export default function useDimensions(points: Coordinates[]) {
  return useMemo(() => {
    let xmin = Infinity,
      xmax = -Infinity,
      ymin = Infinity,
      ymax = -Infinity;
    const numberOfPoints = points.length;

    for (let i = 0; i < numberOfPoints; i++) {
      const p = points[i];
      if (p.x < xmin) xmin = p.x;
      else if (p.x > xmax) xmax = p.x;
      if (p.y < ymin) ymin = p.y;
      else if (p.y > ymax) ymax = p.y;
    }

    return { xmin, xmax, ymin, ymax };
  }, [points]);
}
