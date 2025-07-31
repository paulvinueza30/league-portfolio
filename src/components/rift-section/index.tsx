import { Canvas } from "@react-three/fiber";
import { useGLTF, Grid, Stats } from "@react-three/drei";
import { Suspense, useState } from "react";
import * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { CharacterController } from "./Character";
import { type ThreeEvent } from "@react-three/fiber";
import { Square } from "lucide-react";

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
    return (
      <mesh position={[position.x, position.y, position.z]}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial color="lime" />
      </mesh>
    );
  }

  // TODO: MAKE THIS LEAGUE LOAD IN HEHE
  function Loading() {
    return (
      <mesh position={[0.5, 0, -15]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="purple" />
      </mesh>
    );
  }
  return (
    <div className="w-full h-full bg-gray-800">
      <Canvas camera={{ position: [0, 0, 0], fov: 20, near: 0.1, far: 1000 }}>
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
