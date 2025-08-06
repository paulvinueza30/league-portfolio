import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./japan_setting/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={3.5} groundColor="red" />
      <spotLight
        position={[50, 50, 1]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={5}
      />
      <pointLight intensity={0.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -1.5, -1] : [0, -2.5, -1.5]}
        rotation={[0, 0.9, 0]} // Rotate 180 degrees around Y-axis to face front
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{
        position: [6, 13, 5],
        rotation: [0, 0, 0], // Ensure the camera is not rotated
        fov: 50,
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={0}
          minPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={isMobile ? Math.PI / 7 : -Math.PI / 3} // Limit rotation to the left
          maxAzimuthAngle={isMobile ? Math.PI / 2.5 : Math.PI / 2.2} // Limit rotation to the right
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
