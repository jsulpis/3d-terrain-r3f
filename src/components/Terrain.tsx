import { useEffect, useRef } from "react";
import { Object3D, InstancedMesh, Color } from "three";
import useProceduralDataBlocks from "../providers/useProceduralDataBlocks";
import { useScale } from "../processors/useScale";
import createDataBlockProcessor from "../processors/blockProcessor";

const emptyObject = new Object3D();

export default function Terrain() {
  const dataBlocks = useProceduralDataBlocks();
  const scale = useScale(dataBlocks);
  const processBlock = createDataBlockProcessor(dataBlocks);

  const ref = useRef<InstancedMesh>(null);

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
  }, [dataBlocks]);

  return (
    <group>
      <instancedMesh castShadow receiveShadow ref={ref} args={[, , dataBlocks.length]}>
        <boxGeometry />
        <meshPhongMaterial />
      </instancedMesh>
    </group>
  );
}
