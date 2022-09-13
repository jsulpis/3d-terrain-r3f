export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type HexaColor = `#${number | string}`;

export type DataBlock = Coordinates & {
  /**
   * Any data associated with the block
   */
  [key: string]: number;
};

export type DisplayBlock = Coordinates & {
  /**
   * The color in which the block should be displayed
   */
  color: HexaColor;
};

export type Terrain = {
  dataBlocks: DataBlock[];
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};
