import { useMemo } from "react";
import { MathUtils, Vector2, Vector3 } from "three";
import { FBM } from "three-noise";
import useSettings from "../state/useSettings";

export default function useFBM() {
  const generation = useSettings((s) => s.generation);

  const fbm = useMemo(
    () =>
      new FBM({
        seed: generation.Seed,
        lacunarity: generation.Detail * 4,
        persistance: generation.Fuzzyness * 2,
        // redistribution: generation.Contrast * 2,
      }),
    [generation]
  );

  return (vec3: Vector3) =>
    Math.pow(
      MathUtils.mapLinear(
        fbm.get2(new Vector2(vec3.x, vec3.y)),
        -1, //
        1,
        0,
        1
      ),
      2
    );
}
