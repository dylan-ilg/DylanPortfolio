import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const useRotationHelper = () => {
    const [isRotating, setIsRotating] = useState(false);
    const rotationRef = useRef();
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);

    const onPointerDown = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        lastX.current = clientX;
        setIsRotating(true);
    };

    const onPointerMove = (e) => {
        if (!isRotating) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = (clientX - lastX.current) / window.innerWidth; // 🧠 Use window width

        if (rotationRef.current) {
            rotationRef.current.rotation.y += delta * 0.5 * Math.PI;
        }

        lastX.current = clientX;
        rotationSpeed.current = delta * 0.5 * Math.PI;
    };

    const onPointerUp = () => {
        setIsRotating(false);
    };

    return {
        rotationRef,
        isRotating,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        rotationSpeed,
    };
};

export const RotationBehavior = ({ rotationRef, rotationSpeed }) => {
    const dampingFactor = 0.95;

    useFrame(() => {
        if (rotationRef.current && Math.abs(rotationSpeed.current) > 0.0001) {
            rotationRef.current.rotation.y += rotationSpeed.current;
            rotationSpeed.current *= dampingFactor;
        }
    });

    return null;
};
export const rotateToAngle = (rotationRef, targetY, speed = 0.05) => {
    const currentY = rotationRef.current?.rotation?.y || 0;

    const delta = targetY - currentY;
    const direction = Math.sign(delta);

    let steps = Math.ceil(Math.abs(delta) / speed);

    const interval = setInterval(() => {
        if (!rotationRef.current?.rotation) return;

        rotationRef.current.rotation.y += direction * speed;
        steps--;

        if (steps <= 0) {
            rotationRef.current.rotation.y = targetY; // snap to exact
            clearInterval(interval);
        }
    }, 16);
};
export const NAV_ROTATIONS = {
    home: 0.5,
    about: -.7,
    projects: -3,
    contact: -5
};
export default useRotationHelper;
