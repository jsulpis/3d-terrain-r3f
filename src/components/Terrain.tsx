import { useEffect, useRef } from "react";
import { useData } from "../hooks/useData";
import { Object3D, InstancedMesh } from "three";

const emptyObject = new Object3D();

export default function Terrain({}) {
  const points = useData();
  const ref = useRef<InstancedMesh>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;

    points.forEach(({ position, scale, color }, i) => {
      emptyObject.position.copy(position);
      emptyObject.scale.set(scale, scale, scale);
      emptyObject.updateMatrix();

      mesh.setMatrixAt?.(i, emptyObject.matrix);
      mesh.setColorAt?.(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true;
  }, [points]);

  return (
    <group>
      <instancedMesh
        castShadow
        receiveShadow
        ref={ref}
        args={[, , points.length]}
      >
        <boxGeometry />
        <meshPhongMaterial />
      </instancedMesh>
    </group>
  );
}
