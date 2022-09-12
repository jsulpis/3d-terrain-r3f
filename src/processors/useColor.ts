import { Color, MathUtils } from "three";
import useSettings from "../state/useSettings";

export default function useColor() {
  const colors = useSettings((s) => s.colors);

  return (height: number) => {
    const color = (() => {
      if (height <= colors.Water.value) {
        return new Color(colors.Water.color);
      } else if (height <= colors.Water.value + colors.Shore.value) {
        return new Color(colors.Shore.color);
      } else if (height <= colors.Water.value + colors.Beach.value) {
        return new Color(colors.Beach.color);
      } else if (height <= colors.Water.value + colors.Shrub.value) {
        return new Color(colors.Shrub.color);
      } else if (height <= colors.Water.value + colors.Forest.value) {
        return new Color(colors.Forest.color);
      } else if (height <= colors.Water.value + colors.Stone.value) {
        return new Color(colors.Stone.color);
      } else {
        return new Color(colors.Snow.color);
      }
    })();

    const hsl = color.getHSL({ h: 0, s: 1, l: 1 });

    color.setHSL(
      hsl.h,
      hsl.s * 1.7,
      hsl.l *
        (height <= colors.Water.value
          ? MathUtils.mapLinear(
              Math.pow(1 - (colors.Water.value - height) * 1.3, 6),
              0,
              1,
              0,
              1.4
            )
          : 1)
    );

    return color.getHexString();
  };
}
