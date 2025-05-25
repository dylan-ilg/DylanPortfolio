import { createContext, useContext } from "react";

export const SceneRotation = createContext(null);

export const useSceneRotation = () => useContext(SceneRotation);
