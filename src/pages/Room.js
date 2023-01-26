import React, { useEffect, useState } from 'react';
import { BasicCanvas } from '../components/threejs/BasicCanvas';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, Selection, Outline } from '@react-three/postprocessing';
import { Wardrob } from '../components/Wardrob';
import { Player } from '../components/Player';
import { AnnotationBoard } from '../components/AnnotationBoard';
import { Menu } from '../components/Menu';

// import { Cloud, Sky } from "@react-three/drei";

function Floor() {
  let tile = [];
  let geometrys = [];

  let mesh = useLoader(
    GLTFLoader,
    'models/blocks/floor1.gltf'
  );

  geometrys.push(mesh.scene);

  mesh = useLoader(
    GLTFLoader,
    'models/blocks/floor3.gltf'
  );
    
  geometrys.push(mesh.scene);

  mesh = useLoader(
    GLTFLoader,
    'models/blocks/floor4.gltf'
  );
    
  geometrys.push(mesh.scene);

  mesh = useLoader(
    GLTFLoader,
    'models/blocks/floor2.gltf'
  );
    
  geometrys.push(mesh.scene);

  const Matrix = 
    [
      [0, 0, 0, 1, 1, 1, 2, 2, 2, 3],
      [0, 0, 0, 1, 1, 1, 2, 2, 2, 3],
      [1, 1, 2, 2, 2, 3, 3, 3, 0, 0],
      [1, 1, 2, 2, 2, 3, 3, 3, 0, 0],
      [2, 3, 3, 3, 0, 0, 0, 1, 1, 1],
      [2, 3, 3, 3, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 2, 2, 2, 3],
      [0, 0, 0, 1, 1, 1, 2, 2, 2, 3],
      [1, 1, 2, 2, 2, 3, 3, 3, 0, 0],
      [1, 1, 2, 2, 2, 3, 3, 3, 0, 0],
    ];

  Matrix.map((colum, i) => {
    tile.push([]);
    colum.map((block, j) => {
      tile[i].push(
        <mesh 
          position={[ 50 - (j * 10), -35, 40 - (i * 10)]} 
          rotation={[ 0, Math.PI/2, Math.PI/2 ]} 
          key= {'elemento'+block+i+j}
        >
          <primitive object={ geometrys[block].clone() } />
        </mesh>
      );
    });
  });

  return tile;
}

export function Room() {
  const [ lockScene, setLockScene ] = useState(false);

  useEffect(() => {
    setLockScene(lockScene);
  }, [lockScene]);

  return (
    <>
      <Menu setLockScene={ setLockScene } />
      <BasicCanvas lockScene={ lockScene } >
        <Selection >
          <EffectComposer autoClear={ false }>
            <Outline blur xRay visibleEdgeColor="white" edgeStrength={2000} width={1000} />
          </EffectComposer>
          <AnnotationBoard />
        </Selection>
        
        <Player />
        <Wardrob />
        <Floor />
      </BasicCanvas>
    </>
  );
}
