import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const alley = useGLTF("./japan_alley/scene.gltf");
  const meshRef = useRef();
  const pointLightRef = useRef();

  useFrame(({ clock }) => {
    // Calculate rotation angle based on time
    const angle = Math.sin(clock.elapsedTime * 0.1) * Math.PI; // Adjust the magnitude of swing

    // Apply rotation to the mesh
    if (meshRef.current) {
      meshRef.current.rotation.y = angle;
    }

    // Apply flicker effect to the point light
    if (pointLightRef.current) {
      const flicker = Math.random() * 0.1 + 0.5; // Random flicker effect between 0.75 and 1.25
      pointLightRef.current.intensity = 10 * flicker;
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={5} groundColor="green" />

      <pointLight
        ref={pointLightRef}
        decay={3}
        position={[-0.3, -0.6, -1.7]}
        intensity={5}
        color="white"
      />
      <primitive
        object={alley.scene}
        scale={1.5}
        position={[0, 0, 0.5]}
        rotation={[-0.05, -Math.PI, 0.2]} // Rotate 180 degrees around Y-axis to face front
      />
    </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false} // Disable zoom
          maxDistance={10} // Maximum distance the camera can be from the target
          minDistance={5} // Minimum distance the camera can be from the target
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minAzimuthAngle={Math.PI / 2} // Limit rotation to the left
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
