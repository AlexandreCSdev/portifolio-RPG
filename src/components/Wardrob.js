import { animated, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import React, { useState } from 'react';

export function Wardrob() {
  const [ hovered, setHovered ] = useState(0);
  const { spring } = useSpring({
    spring: hovered,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const mesh = useGLTF('models/room/wardrob.gltf');

  return (
    <animated.mesh
      scale = { 1.3 }
      rotation-y = { -Math.PI / 2}
      position = {[ -24, -18, -21 ]} // -96
      castShadow
    > 
      <primitive object={ mesh.scene } position={[ -5, -5, -50 ]} />
    </animated.mesh >
  );
}
