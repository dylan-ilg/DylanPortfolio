import React, { useEffect } from "react";
import { useSceneRotation } from "../helpers/SceneRotation";
import { rotateToAngle, NAV_ROTATIONS } from "../helpers/RotationHelper";

function Navbar() {
    const { rotationRef } = useSceneRotation();

    useEffect(() => {
        console.log("🧠 Navbar rendered");
    }, []);

    const handleNavClick = (targetKey) => {
        console.log(`[NAVBAR] Clicked: ${targetKey}`);

        const target = NAV_ROTATIONS[targetKey];
        console.log(`[NAVBAR] Target rotation angle: ${target}`);

        if (rotationRef?.current) {
            console.log("[NAVBAR] rotationRef is valid. Rotating planet...");
            rotateToAngle(rotationRef, target);
        } else {
            console.warn("[NAVBAR] rotationRef is missing!");
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 header flex justify-between items-center px-8 sm:px-16 py-4 max-w-5xl mx-auto">
            <button
                onClick={() => handleNavClick("home")}
                className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
            >
                <p className="blue-gradient_text">Home</p>
            </button>

            <nav className="flex gap-4 sm:gap-7 text-lg font-medium">
                {[
                    { label: "About", key: "about" },
                    { label: "Projects", key: "projects" },
                    { label: "Contact", key: "contact" }
                ].map(({ label, key }) => (
                    <button
                        key={key}
                        onClick={() => handleNavClick(key)}
                        className="bg-white px-4 py-2 rounded-lg shadow-md text-black hover:text-blue-500 transition-colors"
                    >
                        {label}
                    </button>
                ))}
            </nav>
        </header>
    );
}

export default Navbar;
