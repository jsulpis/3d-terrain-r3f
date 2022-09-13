import { useEffect, useRef } from "react";
import { Object3D, InstancedMesh, Color } from "three";
import useProceduralTerrain from "../generators/useProceduralTerrain";
import useDisplay from "../processors/useDisplay";
import useScale from "../processors/useScale";
import { TerrainStats } from "./TerrainStats";

const emptyObject = new Object3D();

export default function Terrain() {
  const ref = useRef<InstancedMesh>(null);

  const { dataBlocks, xmin, xmax, ymin, ymax } = useProceduralTerrain();
  const scale = useScale(xmin, xmax, ymin, ymax);
  const transformBlockForDisplay = useDisplay(scale);

  emptyObject.scale.set(scale, scale, scale);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;

    dataBlocks.forEach((dataBlock, i) => {
      const { position, color } = transformBlockForDisplay(dataBlock);

      emptyObject.position.copy(position);
      emptyObject.updateMatrix();

      mesh.setMatrixAt?.(i, emptyObject.matrix);
      mesh.setColorAt?.(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true;
  }, [dataBlocks, transformBlockForDisplay]);

  return (
    <>
      <instancedMesh castShadow receiveShadow ref={ref} args={[, , dataBlocks.length]}>
        <boxGeometry />
        <meshPhongMaterial />
      </instancedMesh>
      <TerrainStats blockCount={dataBlocks.length} />
    </>
  );
}
