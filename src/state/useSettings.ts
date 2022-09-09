import create from "zustand";
import { immer } from "zustand/middleware/immer";

export type SettingsState = {
  colors: {
    [key: string]: {
      value: number;
      color: string;
    };
  };
  generation: {
    Seed: number;
    Height: number;
    Scale: number;
    Detail: number;
    Fuzzyness: number;
  };
};

export type SettingsActions = {
  setColorValue: (key: string, value: number) => void;
  setColor: (key: string, color: string) => void;
  setGeneration: (
    key: keyof SettingsState["generation"],
    value: number
  ) => void;
};

export type Settings = SettingsState & SettingsActions;

const initialState: SettingsState = {
  colors: {
    Water: {
      value: 0.21,
      color: "#00a9ff",
    },
    Shore: {
      value: 0.01,
      color: "#ffd68f",
    },
    Beach: {
      value: 0.04,
      color: "#efb28f",
    },
    Shrub: {
      value: 0.1,
      color: "#9ea667",
    },
    Forest: {
      value: 0.29,
      color: "#586647",
    },
    Stone: {
      value: 0.36,
      color: "#656565",
    },
    Snow: {
      value: 0.6,
      color: "#9aa7ad",
    },
  },
  generation: {
    Seed: Math.random(),
    Height: 1,
    Scale: 0.3,
    Detail: 0.5,
    Fuzzyness: 0.2,
  },
};

export default create<Settings, [["zustand/immer", never]]>(
  immer((set) => ({
    ...initialState,
    setColorValue: (key, value) =>
      set((state) => {
        state.colors[key].value = value;
      }),
    setColor: (key, color) =>
      set((state) => {
        state.colors[key].color = color;
      }),
    setGeneration: (key, value) =>
      set((state) => {
        state.generation[key] = value;
      }),
  }))
);
