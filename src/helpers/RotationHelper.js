import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const TAU = Math.PI * 2;

const normalizeAngle = (angle) =>
  ((angle % TAU) + TAU) % TAU;

const normalizeSigned = (angle) => {
  let a = angle % TAU;
  if (a <= -Math.PI) a += TAU;
  if (a > Math.PI) a -= TAU;
  return a;
};

const shortestDelta = (from, to) => {
  const f = normalizeSigned(from);
  const t = normalizeSigned(to);
  let d = t - f;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

const useRotationHelper = () => {
  const [rotationY, setRotationYState] = useState(0);
  const [isAtHomeView, setIsAtHomeView] = useState(true);
  const rotationRef = useRef();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const hasRotatedFully = useRef(false);
  const [isRotating, setIsRotating] = useState(false);
  const totalRotation = useRef(0);

  const updateRotation = (newY) => {
    const normalizedY = normalizeAngle(newY);
    setRotationYState(newY);
    totalRotation.current += Math.abs(rotationSpeed.current);

    if (!hasRotatedFully.current && totalRotation.current >= TAU) {
      hasRotatedFully.current = true;
    }

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
      const rotationDelta = delta * 0.5 * Math.PI;
      rotationRef.current.rotation.y += rotationDelta;
      rotationSpeed.current = rotationDelta;
      updateRotation(rotationRef.current.rotation.y);
    }

    lastX.current = clientX;
  };

  const onPointerUp = () => setIsRotating(false);

  useEffect(() => {
    // ----------------- WHEEL → ROTATION MAPPING -----------------
    // Default: VERTICAL SCROLL rotates (existing behavior)
    const mapWheelToRotation =
      (e) => -e.deltaY * 0.001;

    /* -----------------------------------------------------------
       ALT: HORIZONTAL SCROLL rotates (trackpad side-to-side or Shift+Wheel)
       To try this, comment out the line above and UNCOMMENT below.
    ----------------------------------------------------------- */
    // const mapWheelToRotation =
    //   (e) => e.deltaX * 0.001;

    const handleWheel = (e) => {
      if (e.target.closest?.(".scroll-area")) {
        return;
      }

      if (!rotationRef.current) return;

      e.preventDefault();
      const delta = mapWheelToRotation(e);

      rotationRef.current.rotation.y += delta;
      rotationSpeed.current = delta;
      updateRotation(rotationRef.current.rotation.y);
    };

    const handleTouchMove = (e) => {
      if (e.target.closest?.(".scroll-area")) {
        return;
      }
      e.preventDefault();
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

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
    hasRotatedFully,
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

export const rotateToAngle = (rotationRef, setRotationY, targetAngle, speed = 0.05) => {
  if (!rotationRef?.current) return;

  const current = rotationRef.current.rotation.y;
  const delta = shortestDelta(current, targetAngle);
  const direction = Math.sign(delta);
  let steps = Math.ceil(Math.abs(delta) / speed);

  rotationRef.current.isAutoRotating = true;

  const interval = setInterval(() => {
    if (!rotationRef.current?.rotation) return;

    rotationRef.current.rotation.y += direction * speed;
    setRotationY(rotationRef.current.rotation.y);

    steps--;
    if (steps <= 0) {
      rotationRef.current.rotation.y = targetAngle;
      setRotationY(targetAngle);
      clearInterval(interval);
      rotationRef.current.isAutoRotating = false;
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
  const normalized = normalizeAngle(rotationY);
  const target = normalizeAngle(targetAngle);
  const lower = (target - buffer + TAU) % TAU;
  const upper = (target + buffer) % TAU;

  return lower < upper
    ? normalized >= lower && normalized <= upper
    : normalized >= lower || normalized <= upper;
};

export default useRotationHelper;