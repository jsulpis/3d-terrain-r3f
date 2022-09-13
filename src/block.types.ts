import { Color, Vector3 } from "three";

export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type DataBlock = Coordinates & {
  /**
   * Any data associated with the block
   */
  [key: string]: number;
};

export type DisplayBlock = {
  position: Vector3;
  color: Color;
};

export type Terrain = {
  dataBlocks: DataBlock[];
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};
