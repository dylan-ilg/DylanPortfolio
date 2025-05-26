import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Normalize rotationY to [0, 2π]
const normalizeAngle = (angle) => ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);

const useRotationHelper = () => {
  const [rotationY, setRotationYState] = useState(0);
  const [isAtHomeView, setIsAtHomeView] = useState(true);
  const rotationRef = useRef();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const [isRotating, setIsRotating] = useState(false);

  const updateRotation = (newY) => {
    const normalizedY = normalizeAngle(newY);
    setRotationYState(newY);

    // Define home range: around normalized 0.5 (roughly 0.4 - 0.6)
    const inHomeRange = normalizedY >= 5.93 || normalizedY <= 0.7;
    setIsAtHomeView(inHomeRange);
  };

  const onPointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
    setIsRotating(true);
  };

  const onPointerMove = (e) => {
    if (!isRotating) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - lastX.current) / window.innerWidth;

    if (rotationRef.current) {
      rotationRef.current.rotation.y += delta * 0.5 * Math.PI;
      updateRotation(rotationRef.current.rotation.y);
    }

    lastX.current = clientX;
    rotationSpeed.current = delta * 0.5 * Math.PI;
  };

  const onPointerUp = () => setIsRotating(false);

  return {
    rotationRef,
    rotationY,
    setRotationY: updateRotation,
    isAtHomeView,
    isRotating,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    rotationSpeed,
  };
};

export const RotationBehavior = ({ rotationRef, rotationSpeed, setRotationY }) => {
  const dampingFactor = 0.95;

  useFrame(() => {
    if (rotationRef.current && Math.abs(rotationSpeed.current) > 0.0001) {
      rotationRef.current.rotation.y += rotationSpeed.current;
      rotationSpeed.current *= dampingFactor;
      setRotationY(rotationRef.current.rotation.y);
    }
  });

  return null;
};

export const rotateToAngle = (rotationRef, setRotationY, targetY, speed = 0.05) => {
  const currentY = rotationRef.current?.rotation?.y || 0;
  const delta = targetY - currentY;
  const direction = Math.sign(delta);
  let steps = Math.ceil(Math.abs(delta) / speed);

  const interval = setInterval(() => {
    if (!rotationRef.current?.rotation) return;

    rotationRef.current.rotation.y += direction * speed;
    setRotationY(rotationRef.current.rotation.y);

    steps--;
    if (steps <= 0) {
      rotationRef.current.rotation.y = targetY;
      setRotationY(targetY);
      clearInterval(interval);
    }
  }, 16);
};

export const NAV_ROTATIONS = {
  home: 0.5,
  about: -0.7,
  projects: -3,
  contact: -5,
};
export const isInViewRange = (rotationY, targetAngle, buffer = 0.5) => {
  const normalized = ((rotationY % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
  const target = ((targetAngle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);

  const lower = (target - buffer + 2 * Math.PI) % (2 * Math.PI);
  const upper = (target + buffer) % (2 * Math.PI);

  return lower < upper
    ? normalized >= lower && normalized <= upper
    : normalized >= lower || normalized <= upper;
};
export default useRotationHelper;
