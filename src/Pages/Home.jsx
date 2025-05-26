import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Loader from '../Components/Loader.jsx';
import TieFighter from '../models/TieFighter.jsx';
import Space from '../models/Space.jsx';
import XWing from '../models/XWing.jsx';
import Planet from '../models/Planet.jsx';
import HeroBanner from '../Components/HeroBanner.jsx';
import { useSceneRotation } from '../helpers/SceneRotation';
import { RotationBehavior } from '../helpers/RotationHelper';
import { About, Contact, Projects } from "./index.js";

const OrbitSync = ({ sourceRef, targetRef }) => {
  useFrame(() => {
    if (sourceRef.current?.rotation && targetRef.current) {
      targetRef.current.rotation.y = sourceRef.current.rotation.y;
    }
  });
  return null;
};

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

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`absolute inset-0 z-0 bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
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

          {/* Spotlight target */}
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
            <XWing
              position={[3, -1, 4]}
              scale={[0.02, 0.02, 0.02]}
              rotation={[0.9, -4.4, 0]}
            />
          </group>

          {/* Planet */}
          <Planet
            position={[0, -7, -2]}
            scale={[4.5, 4.5, 4.5]}
            rotation={[0.1, 0.5, 0]}
            ref={rotationRef}
          />

          {/* TIE Fighter */}
          <group ref={tieOrbitRef}>
            <TieFighter
              position={[-3, -2, 3.5]}
              scale={[0.4, 0.4, 0.4]}
              rotation={[0, -2.8, -0.5]}
            />
          </group>

          <Space />

          <RotationBehavior
            rotationRef={rotationRef}
            rotationSpeed={rotationSpeed}
            setRotationY={setRotationY}
          />

          {/* Keep orbits synced with planet */}
          <OrbitSync sourceRef={rotationRef} targetRef={xwingOrbitRef} />
          <OrbitSync sourceRef={rotationRef} targetRef={tieOrbitRef} />
        </Suspense>
      </Canvas>

      <HeroBanner />
      <About />
      <Projects />
      <Contact />
    </section>
  );
};

export default Home;
