import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";

interface CharacterControllerProps {
  onReady?: (
    actions: Record<string, THREE.AnimationAction>,
    charBodyRef: React.RefObject<RapierRigidBody>,
    mixer: THREE.AnimationMixer
  ) => void;
  targetPos: THREE.Vector3 | null;
  setTargetPos: (pos: THREE.Vector3 | null) => void;
}

const MOVEMENT_SPEED = 0.009;
const ROTATION_THRESHOLD = 0.05;
const STOP_THRESHOLD = 0.1;
const MAX_STEP_HEIGHT = 0.1;
const CAPSULE_RADIUS = 0.1;
const CAPSULE_HEIGHT = 0.1;
const ANIMATION_FADE_DURATION = 0.25;
const MIXER_TIME_SCALE = 0.6;
const CAMERA_LERP_FACTOR = 0.1;
const CAMERA_OFFSET_X = 1;
const CAMERA_OFFSET_Y = 4;
const CAMERA_OFFSET_Z = 4;
const CAMERA_LOOK_AT_OFFSET_Y = 4;
const CAMERA_LOOK_AT_OFFSET_Z = -4;
const RIGID_BODY_POSITION_X = -0.5;
const RIGID_BODY_POSITION_Y = 0.3;
const RIGID_BODY_POSITION_Z = 0;
const RIGID_BODY_SCALE = 1;

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

  const playAnimation = (name: string) => {
    if (!actions?.[name] || currentAnimation === name) return;
    if (actions[currentAnimation]) actions[currentAnimation].fadeOut(ANIMATION_FADE_DURATION);
    actions[name].reset().fadeIn(ANIMATION_FADE_DURATION).play();
    setCurrentAnimation(name);
  };

  useEffect(() => {
    if (actions && charBodyRef.current && charMeshRef.current) {
      actions.idle?.play();
      mixer.timeScale = MIXER_TIME_SCALE;
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
    const desiredPosition = new THREE.Vector3(pos.x + CAMERA_OFFSET_X, pos.y + CAMERA_OFFSET_Y, pos.z + CAMERA_OFFSET_Z);
    camera.position.lerp(desiredPosition, CAMERA_LERP_FACTOR);
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

    if (targetPos.y > currentPos.y + MAX_STEP_HEIGHT) {
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

    const isRotationComplete = Math.abs(angleDiff) < ROTATION_THRESHOLD;
    const targetQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, targetAngle, 0)
    );
    charBodyRef.current.setRotation(targetQuat, true);

    if (distanceToTarget > STOP_THRESHOLD) {
      if (!isRotationComplete && actions?.turn && Math.abs(angleDiff) > 0.2) {
        playAnimation("turn");
        actions.turn.setLoop(THREE.LoopOnce, 1);
        actions.turn.clampWhenFinished = true;
      } else {
        playAnimation("walk foward");
        actions["walk foward"]?.setLoop(THREE.LoopRepeat, Infinity);

        const moveVector = direction.clone().multiplyScalar(MOVEMENT_SPEED);
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
      position={[RIGID_BODY_POSITION_X, RIGID_BODY_POSITION_Y, RIGID_BODY_POSITION_Z]}
      scale={RIGID_BODY_SCALE}
    >
      <group ref={cameraPosRef} position-z={CAMERA_OFFSET_Z} />
      <group ref={cameraTargetRef} position-y={CAMERA_LOOK_AT_OFFSET_Y} position-z={CAMERA_LOOK_AT_OFFSET_Z} />
      <group ref={charMeshRef}>
        <primitive object={scene} />
      </group>
      <CapsuleCollider args={[CAPSULE_RADIUS, CAPSULE_HEIGHT]} position={[0, 0, 0]} />
    </RigidBody>
  );
}
