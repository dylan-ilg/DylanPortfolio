// src/helpers/RotationHelper.js
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const normalizeAngle = (angle) =>
  ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);

const useRotationHelper = () => {
  const [rotationY, setRotationYState] = useState(0);
  const [isAtHomeView, setIsAtHomeView] = useState(true);
  const rotationRef = useRef();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const hasRotatedFully = useRef(false);
  const footerUnlocked = useRef(false);
  const [isRotating, setIsRotating] = useState(false);
  const totalRotation = useRef(0);

  const updateRotation = (newY) => {
    const normalizedY = normalizeAngle(newY);
    setRotationYState(newY);
    totalRotation.current += Math.abs(rotationSpeed.current);

    console.log(`[ROTATE] NormalizedY: ${normalizedY.toFixed(2)} | Accumulated: ${totalRotation.current.toFixed(2)}`);

    if (!hasRotatedFully.current && totalRotation.current >= 2 * Math.PI) {
      hasRotatedFully.current = true;
      console.log("🌀 [ROTATION] Full rotation complete ✅");
    }

    const inHomeRange = normalizedY >= 5.93 || normalizedY <= 0.7;
    setIsAtHomeView(inHomeRange);
  };

  const onPointerDown = (e) => {
    if (!footerUnlocked.current) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
      setIsRotating(true);
    }
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
    const handleWheel = (e) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const goingDown = e.deltaY > 0;

      console.log('[SCROLL] Wheel event detected', { scrollY: scrollTop });

      if (!hasRotatedFully.current) {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        rotationRef.current.rotation.y += delta;
        rotationSpeed.current = delta;
        updateRotation(rotationRef.current.rotation.y);
        return;
      }

      if (hasRotatedFully.current && goingDown && !footerUnlocked.current) {
        console.log('[UNLOCK] Rotation complete. Unlocking scroll and scrolling to footer.');
        rotationSpeed.current = 0;
        setIsRotating(false);
        footerUnlocked.current = true;
        document.body.style.overflowY = 'auto';

        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    };

    const handleTouchMove = (e) => {
      if (!hasRotatedFully.current || (footerUnlocked.current && window.scrollY < window.innerHeight)) {
        e.preventDefault();
        console.log('[SCROLL] Touch move blocked ⛔');
      }
    };

    const handleScrollReset = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (footerUnlocked.current && scrollTop <= 50) {
        console.log('🔁 [RESET] Scrolled to top. Re-enabling rotation.');
        footerUnlocked.current = false;
        hasRotatedFully.current = false;
        totalRotation.current = 0;
        rotationSpeed.current = 0;
        document.body.style.overflowY = 'hidden';
      }
    };

    console.log('[INIT] Scroll locked on load (overflowY = hidden)');
    document.body.style.overflowY = 'hidden';

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScrollReset);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScrollReset);
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

export const rotateToAngle = (rotationRef, setRotationY, targetY, speed = 0.05) => {
  const currentY = rotationRef.current?.rotation?.y || 0;
  const delta = targetY - currentY;
  const direction = Math.sign(delta);
  let steps = Math.ceil(Math.abs(delta) / speed);

  rotationRef.current.isAutoRotating = true;

  const interval = setInterval(() => {
    if (!rotationRef.current?.rotation) return;

    rotationRef.current.rotation.y += direction * speed;
    setRotationY(rotationRef.current.rotation.y);

    steps--;
    if (steps <= 0) {
      rotationRef.current.rotation.y = targetY;
      setRotationY(targetY);
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
  const lower = (target - buffer + 2 * Math.PI) % (2 * Math.PI);
  const upper = (target + buffer) % (2 * Math.PI);

  return lower < upper
    ? normalized >= lower && normalized <= upper
    : normalized >= lower || normalized <= upper;
};

export default useRotationHelper;
