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

export type DisplayBlock = Coordinates & {
  /**
   * The color in which the block should be displayed
   */
  color: string;
};

export type Terrain = {
  dataBlocks: DataBlock[];
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};

export type DataBlockProcessor = (dataBlock: DataBlock) => DisplayBlock;
