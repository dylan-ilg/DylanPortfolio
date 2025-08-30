import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Loader from '../Components/Loader.jsx';
import TieFighter from '../models/TieFighter.jsx';
import Space from '../models/Space.jsx';
import XWing from '../models/XWing.jsx';
import Planet from '../models/Planet.jsx';
import MillenniumFalcon from '../models/MillenniumFalcon.jsx';
import HeroBanner from '../Components/HeroBanner.jsx';
import { useSceneRotation } from '../helpers/SceneRotation';
import { RotationBehavior } from '../helpers/RotationHelper';
import { About, Contact, Projects, TechStack } from './index.js';
/* ----------------------------- helpers ---------------------------------- */

// Copies target's world pose each frame, then applies a local-space offset.
// By default, it does NOT inherit target scale, so model size stays sane.
const FollowAnchor = ({ targetRef, localOffset = [0, 0, 0], inheritScale = false, children }) => {
  const ref = useRef();
  const offset = useMemo(() => new THREE.Vector3(...localOffset), [localOffset]);

  useFrame(() => {
    const t = targetRef.current;
    const g = ref.current;
    if (!t || !g) return;

    t.updateMatrixWorld(true);

    // Copy world position & rotation
    t.getWorldPosition(g.position);
    t.getWorldQuaternion(g.quaternion);

    // Scale handling
    if (inheritScale) {
      t.getWorldScale(g.scale);
    } else {
      g.scale.set(1, 1, 1);
    }

    // Apply local offset in the target's local orientation
    const o = offset.clone().applyQuaternion(g.quaternion);
    g.position.add(o);
  });

  return <group ref={ref}>{children}</group>;
};

// One-shot helper to estimate "radius" of the target (largest half-extent in world space)
const useWorldRadius = (objRef) => {
  const [r, setR] = useState(0);
  useEffect(() => {
    const o = objRef.current;
    if (!o) return;
    o.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(o);
    const size = box.getSize(new THREE.Vector3());
    setR(Math.max(size.x, size.y, size.z) / 2);
  }, [objRef]);
  return r;
};

// Keeps a group's Y rotation synced to a source (your existing orbit behavior)
const OrbitSync = ({ sourceRef, targetRef }) => {
  useFrame(() => {
    if (sourceRef.current?.rotation && targetRef.current) {
      targetRef.current.rotation.y = sourceRef.current.rotation.y;
    }
  });
  return null;
};

/* ------------------------------- page ----------------------------------- */

const Home = () => {
  const {
    rotationRef,
    isRotating,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    rotationSpeed,
    setRotationY
  } = useSceneRotation();

  const tieTargetRef = useRef(new THREE.Object3D());
  const tieOrbitRef = useRef();
  const xwingOrbitRef = useRef();
  const spaceOrbitRef = useRef();

  // Planet radius in world space (so we can sit the Falcon just off its surface)
  const planetRadius = useWorldRadius(rotationRef);

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* === CANVAS === */}
      <section className="w-full h-screen relative">
        <Canvas
          className={`absolute inset-0 z-0 bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{ near: 0.1, far: 1000, position: [0, 0, 12] }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Suspense fallback={<Loader />}>
            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={5} castShadow />
            <pointLight position={[0, 5, 5]} intensity={1} />
            <hemisphereLight intensity={0.3} groundColor="black" />
            <pointLight position={[0, 0, 11]} intensity={20} distance={50} color="#ffffff" />

            {/* Spotlight target for TIE */}
            <primitive object={tieTargetRef.current} position={[-4, -1, 5.5]} />
            <spotLight
              position={[0, 0, 10]}
              intensity={6}
              angle={0.4}
              penumbra={1}
              distance={25}
              color="#ffffff"
              castShadow
              target={tieTargetRef.current}
            />

            {/* X-Wing */}
            <group ref={xwingOrbitRef}>
              <XWing position={[3, -1, 4]} scale={[0.02, 0.02, 0.02]} rotation={[0.9, -4.4, 0]} />
            </group>

            {/* PLANET (rotate this with your rotationRef) */}
            <Planet
              position={[0, -7, -2]}
              scale={[4.5, 4.5, 4.5]}
              rotation={[0.1, 0.5, 0]}
              ref={rotationRef}
            />

            {/* FALCON — relative to planet */}
            <FollowAnchor
              targetRef={rotationRef}
              // Put Falcon just off the surface, to the planet's +X and a touch forward:
              localOffset={[
                (planetRadius || 2) + 1.25,   // +X out from center by radius + gap
                6.3,                           // slight Y lift
                -5                            // small Z offset towards camera
              ]}
              inheritScale={false}
            >
              <MillenniumFalcon
                // Size the ship via scale — thanks to <Center/>, this scales from its center.
                scale={[0.9, 0.9, 0.9]}
                rotation={[0.12, -2.5, -1.8]} // orient relative to the anchor
              />
            </FollowAnchor>

            {/* TIE Fighter */}
            <group ref={tieOrbitRef}>
              <TieFighter position={[-3, -2, 3.5]} scale={[0.4, 0.4, 0.4]} rotation={[0, -2.8, -0.5]} />
            </group>

            {/* Spacebox */}
            <group ref={spaceOrbitRef}>
              <Space position={[0, 0, -100]} scale={[80, 80, 80]} />
            </group>

            {/* Inertia/spin behavior */}
            <RotationBehavior
              rotationRef={rotationRef}
              rotationSpeed={rotationSpeed}
              setRotationY={setRotationY}
            />

            {/* Sync other orbits (Falcon follows the planet via FollowAnchor; no sync needed) */}
            <OrbitSync sourceRef={rotationRef} targetRef={xwingOrbitRef} />
            <OrbitSync sourceRef={rotationRef} targetRef={tieOrbitRef} />
            <OrbitSync sourceRef={rotationRef} targetRef={spaceOrbitRef} />
          </Suspense>
        </Canvas>
      </section>

      {/* === CONTENT === */}
      <HeroBanner />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  );
};

export default Home;
