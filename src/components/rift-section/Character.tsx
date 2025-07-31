import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";

interface CharacterControllerProps {
  onReady?: (
    actions: Record<string, THREE.AnimationAction>,
    ref: React.RefObject<RapierRigidBody>,
    mixer: THREE.AnimationMixer
  ) => void;
  targetPos: THREE.Vector3 | null;
  setTargetPos: (pos: THREE.Vector3 | null) => void;
}

export function CharacterController({
  onReady,
  targetPos,
  setTargetPos,
}: CharacterControllerProps) {
  const charBodyRef = useRef<RapierRigidBody>(null);
  const charMeshRef = useRef<THREE.Group>(null);
  const cameraTargetRef = useRef<THREE.Group>(null);
  const cameraPosRef = useRef<THREE.Group>(null);
  const cameraWorld = useRef(new THREE.Vector3());
  const cameraLook = useRef(new THREE.Vector3());

  const { scene, animations } = useGLTF("/animations/paul_normal.glb");
  const { actions, mixer } = useAnimations(animations, charMeshRef);

  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const movementSpeed = 0.009;
  const rotationThreshold = 0.05;
  const stopThreshold = 0.1;
  const maxStepHeight = 0.1;

  const playAnimation = (name: string) => {
    if (!actions?.[name] || currentAnimation === name) return;
    if (actions[currentAnimation]) actions[currentAnimation].fadeOut(0.25);
    actions[name].reset().fadeIn(0.25).play();
    setCurrentAnimation(name);
  };

  useEffect(() => {
    if (actions && charBodyRef.current && charMeshRef.current) {
      actions.idle?.play();
      mixer.timeScale = 0.6;
      onReady?.(
        actions as Record<string, THREE.AnimationAction>,
        charBodyRef as React.RefObject<RapierRigidBody>,
        mixer
      );
    }
  }, [actions, mixer]);

  useFrame(({ camera }) => {
    if (!cameraPosRef.current || !cameraTargetRef.current) return;

    cameraPosRef.current.getWorldPosition(cameraWorld.current);
    cameraTargetRef.current.getWorldPosition(cameraLook.current);

    const pos = charBodyRef.current!.translation();
    const desiredPosition = new THREE.Vector3(pos.x + 1, pos.y + 4, pos.z + 4);
    camera.position.lerp(desiredPosition, 0.1);
    camera.lookAt(pos.x, pos.y, pos.z);
  });

  useFrame((_, delta) => {
    mixer?.update(delta);

    if (!charBodyRef.current || !targetPos) {
      if (currentAnimation !== "idle") playAnimation("idle");
      return;
    }

    const currentPos = new THREE.Vector3().copy(
      charBodyRef.current.translation()
    );

    if (targetPos.y > currentPos.y + maxStepHeight) {
      playAnimation("idle");
      setTargetPos(null);
      return;
    }

    const distanceToTarget = currentPos.distanceTo(targetPos);
    const direction = new THREE.Vector3().subVectors(targetPos, currentPos);
    direction.y = 0;
    direction.normalize();

    const targetAngle = Math.atan2(direction.x, direction.z);
    const currentEuler = new THREE.Euler().setFromQuaternion(
      charBodyRef.current.rotation() as unknown as THREE.Quaternion
    );
    let angleDiff = targetAngle - currentEuler.y;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    const isRotationComplete = Math.abs(angleDiff) < rotationThreshold;
    const targetQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, targetAngle, 0)
    );
    charBodyRef.current.setRotation(targetQuat, true);

    if (distanceToTarget > stopThreshold) {
      if (!isRotationComplete && actions?.turn && Math.abs(angleDiff) > 0.2) {
        playAnimation("turn");
        actions.turn.setLoop(THREE.LoopOnce, 1);
        actions.turn.clampWhenFinished = true;
      } else {
        playAnimation("walk foward");
        actions["walk foward"]?.setLoop(THREE.LoopRepeat, Infinity);

        const moveVector = direction.clone().multiplyScalar(movementSpeed);
        const nextPos = currentPos.clone().add(moveVector);
        nextPos.y = targetPos.y;

        if (nextPos.distanceTo(targetPos) > distanceToTarget) {
          charBodyRef.current.setNextKinematicTranslation(targetPos.clone());
        } else {
          charBodyRef.current.setNextKinematicTranslation(nextPos);
        }
      }
    } else {
      charBodyRef.current.setNextKinematicTranslation(targetPos.clone());
      playAnimation("idle");
      setTargetPos(null);
    }
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      ref={charBodyRef}
      gravityScale={0}
      position={[-0.5, 0.3, 0]}
      scale={1}
    >
      <group ref={cameraPosRef} position-z={1.5} />
      <group ref={cameraTargetRef} position-y={4} position-z={-4} />
      <group ref={charMeshRef}>
        <primitive object={scene} />
      </group>
      <CapsuleCollider args={[0.1, 0.1]} position={[0, 0, 0]} />
    </RigidBody>
  );
}
