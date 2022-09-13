import { useCallback, useMemo } from "react";
import { MathUtils, Vector2 } from "three";
import { FBM } from "three-noise";
import { Coordinates } from "../block.types";
import { useSettings } from "../state/useSettings";

export function useFbmNoise() {
  const generation = useSettings((s) => s.generation);

  const fbm = useMemo(
    () =>
      new FBM({
        seed: generation.Seed,
        lacunarity: generation.Detail * 4,
        persistance: generation.Fuzzyness * 2
      }),
    [generation]
  );

  return useCallback(
    ({ x, y }: Coordinates) =>
      Math.pow(
        MathUtils.mapLinear(
          fbm.get2(new Vector2(x, y)),
          -1, //
          1,
          0,
          1
        ),
        2
      ),
    [fbm]
  );
}
