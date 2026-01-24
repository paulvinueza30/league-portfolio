import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Grid, Stats, Html } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { CharacterController } from "./Character";
import { type ThreeEvent } from "@react-three/fiber";

interface MapProps {
  onRightClick: (pos: THREE.Vector3) => void;
}

function Map({ onRightClick }: MapProps) {
  const { scene } = useGLTF("/animations/rift_section.glb");

  function handleClick(event: ThreeEvent<MouseEvent>) {
    if (event.button === 2) {
      event.stopPropagation();
      event.nativeEvent.preventDefault();

      const clickPosition = event.point.clone();
      onRightClick(clickPosition);
    }
  }

  return (
    <group>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} onContextMenu={handleClick} />
      </RigidBody>
    </group>
  );
}

export default function Scene() {
  const CAMERA_POSITION: [number, number, number] = [0, 0, 0];
  const CAMERA_FOV = 20;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR = 1000;
  const [, setCharacterActions] = useState<Record<
    string,
    THREE.AnimationAction
  > | null>(null);
  const [charRef, setCharRef] = useState<React.RefObject<any> | null>(null);
  const [, setCharacterMixer] = useState<THREE.AnimationMixer | null>(null);
  const [clickMarkers, setClickMarkers] = useState<
    { id: number; position: THREE.Vector3 }[]
  >([]);
  const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);

  function handleCharacterReady(
    actions: Record<string, THREE.AnimationAction>,
    ref: React.RefObject<any>,
    mixer: THREE.AnimationMixer
  ) {
    setCharacterActions(actions);
    setCharRef(ref);
    setCharacterMixer(mixer);
  }

  function handleRightClick(clickPosition: THREE.Vector3) {
    if (charRef?.current) {
      const currentCharacterPos = new THREE.Vector3().copy(
        charRef.current.translation()
      );
      if (clickPosition.distanceTo(currentCharacterPos) < 0.2 && targetPos)
        return;
    }

    setTargetPos(clickPosition.clone());
    const newMarker = { id: Date.now(), position: clickPosition.clone() };
    setClickMarkers((prev) => [...prev, newMarker]);
    setTimeout(() => {
      setClickMarkers((prev) => prev.filter((m) => m.id !== newMarker.id));
    }, 1500);
  }

  function ClickMarker({ position }: { position: THREE.Vector3 }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta
    })
    return (
      <mesh position={[position.x, position.y + 0.2, position.z]} ref={ref}>
        <coneGeometry args={[0.02, 0.1, 4]} />
        <meshBasicMaterial color="lime" />
      </mesh>
    );
  }

  // TODO: MAKE THIS LEAGUE LOAD IN HEHE
  function Loading() {
    return (
      <Html center>
        <h1 className="text-white text-4xl">Loading...</h1>
      </Html>
    );
  }
  return (
    <div className="w-full h-full bg-gray-800">
      <Canvas camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV, near: CAMERA_NEAR, far: CAMERA_FAR }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[1, 2, -0.3]} intensity={5} />
          <Grid args={[10, 10]} />
          <Stats />
          <Physics>
            <Map onRightClick={handleRightClick} />
            <CharacterController
              onReady={handleCharacterReady}
              targetPos={targetPos}
              setTargetPos={setTargetPos}
            />
          </Physics>
          {clickMarkers.map((m) => (
            <ClickMarker key={m.id} position={m.position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
