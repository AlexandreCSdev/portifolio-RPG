import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { useGLTF, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';

export function Player() {
  const [ position, setPosition ] = useState({ x: 0, y: 10, z: 0 });
  const [, get] = useKeyboardControls();
  const SPEED = 2;
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  const [boxRef, boxApi] = useBox(() => ({
    type: 'Dynamic',
    position: [ 0, -20, 0 ], 
  }));
  
  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();

    if (forward || backward || left || right) {
      frontVector.set (0, 0, backward - right - forward + left); // (0, 0, backward - right - forward + left) | ( 0, 0, backward - forward )
      sideVector.set( forward + left - right - backward, 0, 0 ); // (forward + left - right - backward, 0, 0) | ( left - right, 0, 0 )
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation); 
      setPosition({ x: position.x + direction.x, y: -20, z: position.z + direction.z });
      boxApi.position.set(position.x, -20, position.z); 
    }
  });
  
  return (
    <animated.mesh 
      ref={boxRef}
    > 
      <boxGeometry args={[10, 10, 10]} />
      <animated.meshPhongMaterial color= '#6246ea' />
    </animated.mesh >
  );
}
