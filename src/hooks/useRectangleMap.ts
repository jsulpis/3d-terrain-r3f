import { useMemo } from "react";
import { Vector3 } from "three";

export default function useRectangleMap(width = 150, depth = 150) {
  return useMemo(() => {
    const pts = [];

    for (let x = -width / 2; x < width / 2; x++) {
      for (let y = -depth / 2; y < depth / 2; y++) {
        pts.push(new Vector3(x, y, 0));
      }
    }
    return pts;
  }, [width, depth]);
}
