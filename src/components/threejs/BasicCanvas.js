import React from 'react';
import { Physics } from '@react-three/cannon';
import { CameraShake, KeyboardControls, OrbitControls, Center, PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export function BasicCanvas({ children, lockScene }) {
  const shakeVelocity = 0.04;
  const config = {
    maxYaw: shakeVelocity,
    maxPitch: shakeVelocity,
    maxRoll: shakeVelocity,
    yawFrequency: shakeVelocity,
    pitchFrequency: shakeVelocity,
    rollFrequency: shakeVelocity,
    intensity: 1,
    decay: false,
  };

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas 
        orthographic
        camera={{ zoom: 6, fov: 25, position: [ 0, 40, 100 ] }}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          background: '#e0b7ff',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          snap={ !lockScene }
        >
          <ambientLight intensity={ 0.2 } />
          <directionalLight color='white' intensity={0.7} position={[10, 100, 50]}/>
          
          <CameraShake { ...config }/>
          
          <Center>
            <Physics >
              { children }
            </Physics>
          </Center>
        </PresentationControls>
      </Canvas> 
    </KeyboardControls>
  );
}
