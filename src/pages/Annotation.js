import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Card } from '../components/dragableCard';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';
import { IoArrowBackOutline } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export function Annotation() {
  const [ isDragging, setIsDragging ] = useState(false);
  const [ postIts, setPostIts ] = useState(
    [{
      id: 1,
      text: '\n Bom dia!',
      textAlign: 'left',
      position: [-90, 0, -5 ],
      color: 'yellow',
      textColor: 'black',
      fontSize: 20,
      height: 150,
      width: 200,
    }, 
    {
      id: 2,
      text: '\n sei la',
      textAlign: 'center',
      position: [180, 0, 140 ],
      color: 'red',
      textColor: 'white',
      fontSize: 24,
      height: 140,
      width: 130,
    }]
  );
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const navigate = useNavigate();

  return (
    <Screen>
      <Board>
        <div>
          <div>
            <Back>
              <IoArrowBackOutline 
                size={ 40 }
                color={ '#432e06' }
                onClick={() => navigate('/')}
              />
            </Back>
            
            <Canvas 
              style={{ 
                width: '100vw',
                height: '100vh',
              }}
              shadows 
            >
              <ambientLight intensity={0.2} />
              <directionalLight
                intensity={0.8}
                castShadow
                shadow-mapSize-height={1512}
                shadow-mapSize-width={1512}
                position={[ -20, 100, -10 ]}
              />

              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
              >
                <planeBufferGeometry attach="geometry" args={[1800, 1800]} receiveShadow />
                <shadowMaterial />
              </mesh>

              {
                postIts.map(card => {
                  return (
                    <Card key={ card.id } setIsDragging={setIsDragging} isDragging={ isDragging } floorPlane={floorPlane} card={ card } />
                  );
                })
              }

              <OrthographicCamera makeDefault zoom={1} position={[0, 100, 0]} />
              <OrbitControls enabled={false} />
            </Canvas>
            
            <AddButton>
              <AiFillPlusCircle 
                size={ 40 }
                color={ '#432e06' }
                onClick={() => setPostIts([
                  ...postIts, {
                    id: 'a',
                    text: '\n seu texto aqui!',
                    textAlign: 'center',
                    position: [0, 0.1, 0 ],
                    color: 'purple',
                    textColor: 'black',
                    fontSize: 20,
                    height: 140,
                    width: 130,
                  }]
                )}
              />
            </AddButton>
          </div>
        </div>
      </Board>
    </Screen>
  );
}

const Board = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #e0b7ff;
  z-index: 0;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
    background-color: #EFD0A8;
    border: solid 15px #D6A363;
    padding: 15px;
    border-radius: 15px;
    z-index: 0;
    box-shadow: #432e06 1px 1px 0,
                #432e06 2px 2px 0,
                #432e06 3px 3px 0,
                #432e06 4px 4px 0,
                #432e06 5px 5px 0,
                inset #432e06 1px 1px 1px,
                inset #432e06 2px 2px 2px,
                inset #432e06 3px 3px 3px;
  }
`;

const Screen = styled.div`
  input {
    outline: none;
    background: none;
    border: none;
    
    &::placeholder {
      color: black;
    }
  }
`;

const Back = styled.span`
  position: fixed;
  top: 6%;
  left: 6%;
  z-index: 3;
`;

const AddButton = styled.span`
  position: fixed;
  bottom: 6%;
  right: 6%;
  z-index: 3;
`;
