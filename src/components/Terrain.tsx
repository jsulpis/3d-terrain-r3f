import { useEffect, useRef } from "react";
import { Object3D, InstancedMesh, Color } from "three";
import useProceduralTerrain from "../generators/useProceduralTerrain";
import useDisplay from "../processors/useDisplay";
import useScale from "../processors/useScale";

const emptyObject = new Object3D();

export default function Terrain() {
  const ref = useRef<InstancedMesh>(null);

  const { dataBlocks, xmin, xmax, ymin, ymax } = useProceduralTerrain();
  const scale = useScale(xmin, xmax, ymin, ymax);

  const processBlock = useDisplay(scale);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;

    dataBlocks.forEach((dataBlock, i) => {
      const { x, y, z, color } = processBlock(dataBlock);
      emptyObject.position.set(x, y, z);
      emptyObject.scale.set(scale, scale, scale);
      emptyObject.updateMatrix();

      mesh.setMatrixAt?.(i, emptyObject.matrix);
      mesh.setColorAt?.(i, new Color(color));
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true;
  }, [dataBlocks, processBlock]);

  return (
    <group>
      <instancedMesh castShadow receiveShadow ref={ref} args={[, , dataBlocks.length]}>
        <boxGeometry />
        <meshPhongMaterial />
      </instancedMesh>
    </group>
  );
}
