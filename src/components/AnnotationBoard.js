import { animated, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import React, { useState } from 'react';
import { Select } from '@react-three/postprocessing';
import { useNavigate } from 'react-router-dom';

export function AnnotationBoard() {
  const [ hovered, setHovered ] = useState(0);
  const { spring } = useSpring({
    spring: hovered,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const mesh = useGLTF('models/room/annotationBoard.gltf');
  const scale = spring.to([0, 1], [1, 1.1]);
  const navigate = useNavigate();

  return (
    <Select enabled={ hovered }>
      <animated.mesh
        scale-y = { scale }
        scale-x = { scale }
        scale-z = { scale }
        rotation-y = { -Math.PI / 2}
        position = {[ -7, -20, -28 ]}a
        onPointerOver = { () => setHovered(1) }
        onPointerOut = { () => setHovered(0) }
        onClick = { () => navigate('/annotation') }
        edgeStrength={ 50 }
        edgeThickness={ 1 }
        castShadow
      > 
        <primitive object={ mesh.scene } position={[ -22, 10, 17 ]} />
      </animated.mesh >
    </Select>
  );
}
