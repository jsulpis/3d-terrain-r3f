import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import "./App.css";
import Lights from "./scene/Lights";
import { Gizmo } from "./scene/Gizmo";

export default function App() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 6, 5], near: 0.1, far: 15 }}
      >
        <Gizmo />
        <Lights />
        <OrbitControls autoRotate autoRotateSpeed={0.2} enablePan={false} />
        {/* <Stats /> */}
      </Canvas>
    </>
  );
}
