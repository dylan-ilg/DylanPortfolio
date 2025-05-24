import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from "../Components/Loader.jsx";
import TieFighter from "../models/TieFighter.jsx";
import Space from "../models/Space.jsx";
import XWing from "../models/XWing.jsx";
import Planet from "../models/Planet.jsx";

const Home = () => {
    const adjustForScreenSize = () => {
        let screenScale = null;
        if (window.innerWidth < 768) {
            screenScale = [0.8, 0.8, 0.8];
        } else {
            screenScale = [1, 1, 1];
        }
        return { screenScale };
    };

    const { screenScale } = adjustForScreenSize();

    return (
        <section className="w-full h-screen relative pt-28">
            <Canvas
                className="w-full h-screen bg-transparent"
                camera={{ near: 0.1, far: 1000, position: [0, 0, 20] }}
            >
                <Suspense fallback={<Loader />}>
                    {/* 💡 Lighting */}
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 10]} intensity={2} />
                    <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
                    <pointLight position={[0, 5, 5]} intensity={1} />
                    <hemisphereLight intensity={0.3} groundColor="black" />
                    <XWing
                        position={[0, -50, -200]}           // 👈 Negative Z = in front of camera
                        scale={[0.6, 0.6, 0.6]}         // Resize to fit screen
                        rotation={[0, Math.PI, 0]}      // Flip it to face camera if needed
                    />
                    <Planet
                        position={[0, 0, 0]}             // 🌍 centered
                        scale={[2.5, 2.5, 2.5]}
                        rotation={[0.1, 0.5, 0]}
                    />
                    <TieFighter
                        position={[6, 0, 0]}             // 👾 opposite side
                        scale={screenScale}
                        rotation={[0, -0.4, 0]}
                    />

                    {/* 🌌 Background */}
                    <Space />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;
