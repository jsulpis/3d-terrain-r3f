import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import "./App.css";
import Lights from "./components/Lights";
import { Gizmo } from "./components/Gizmo";
import GUI from "./components/GUI";
import Terrain from "./components/Terrain";

export default function App() {
  return (
    <>
      <GUI />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 6, 5], near: 0.1, far: 15 }}
      >
        <Gizmo />
        <Lights />
        <OrbitControls autoRotate autoRotateSpeed={0.2} enablePan={false} />
        {/* <Stats /> */}
        <group rotation-x={-Math.PI / 2}>
          <Terrain />
        </group>
      </Canvas>
    </>
  );
}
