import React from 'react';
import XwingModel from '../assets/3d/x_wing.glb';
import { useGLTF } from '@react-three/drei';

const XWing = (props) => {
    const { scene } = useGLTF(XwingModel);

    return (
        <group {...props}>
            <primitive object={scene} />
        </group>
    );
};

export default XWing;
