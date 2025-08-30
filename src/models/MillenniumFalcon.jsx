// src/models/MillenniumFalcon.jsx
import React, { useMemo } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import FalconModel from '../assets/3d/star_wars_millennium_falcon.glb';

/**
 * MillenniumFalcon
 * - Centers the GLTF so its pivot = geometric center (via <Center/>)
 * - Leave sizing to parent via `scale` prop or whatever wraps this component
 */
const MillenniumFalcon = ({ ...props }) => {
  const { scene } = useGLTF(FalconModel);
  // Work on a clone so edits here never mutate the cache
  const clone = useMemo(() => scene.clone(true), [scene]);

  return (
    <group {...props}>
      {/* Center recenters bounds so positioning/rotation is intuitive */}
      <Center>
        <primitive object={clone} />
      </Center>
    </group>
  );
};

useGLTF.preload(FalconModel);
export default MillenniumFalcon;
