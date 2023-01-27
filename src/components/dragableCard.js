import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/three';
import { a } from '@react-spring/web';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { IoIosArrowUp } from 'react-icons/io';
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from 'react-icons/gr';
import { BlockPicker } from 'react-color';
import styled from 'styled-components';

export function Card({ setIsDragging, isDragging, floorPlane, card }) {
  // muitas variaveis de estado mudar isso
  const [ pos, setPos ] = useState(card.position);
  const [ focused, setFocused ] = useState({ input: false, card: false, menu: false });
  const [ textAlign, setTextAlign ] = useState(card.textAlign);
  const [ selectingColor, setSelectingColor ] = useState(false);
  const [ color, setColor ] = useState(card.color);
  const [ selectingColorText, setSelectingColorText ] = useState(false);
  const [ colorText, setColorText ] = useState(card.textColor);
  const [ fontSize, setFontSize ] = useState(card.fontSize);
  const [ text, setText ] = useState(card.text);
  const divElement = useRef();

  const props = useSpring({
    opacity: focused['menu'] ? '1' : '0',
    height: focused['menu'] ? '120px' : '0',
  });

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    config: { friction: 10 }
  }));

  if (isDragging && focused['menu']) setFocused(focused => ({ ...focused, ['menu']: false }));
  if (isDragging && selectingColorText) setSelectingColorText(false);
  if (isDragging && selectingColor) setSelectingColor(false);

  const bind = useDrag(
    ({ active, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        position: pos,
        scale: active ? 1.2 : 1,
      });
    },
    { delay: true }
  );

  useEffect(() => {
    if ((focused['card'] || focused['input']) && !focused['menu']) setFocused(focused => ({ ...focused, ['menu']: true }));
  }, [focused]);

  useEffect(() => {
    setSelectingColor(false);
  }, [color]);

  useEffect(() => {
    setSelectingColorText(false);
  }, [colorText]);

  useEffect(() => {
    setFontSize(fontSize);
  }, [fontSize]);

  useEffect(() => {
    setText(text);
  }, [text]);

  useEffect(() => {
    setText(text);
  }, [text]);

  useEffect(() => {
    if (divElement.current) {
      divElement.current.width = card.width;
      divElement.current.height = card.height;
    }
  }, []);

  return (
    <animated.mesh 
      {...spring} 
      {...bind()} 
      castShadow 
      receiveShadow
      onPointerOver = { () => setFocused(focused => ({ ...focused, ['card']: true })) }
      onPointerOut = { () => setFocused(focused => ({ ...focused, ['card']: false })) }
    > 
      <boxGeometry
        ref={dragObjectRef}
        args={[ divElement.current ? Number(divElement.current.style.width.split('px')[0]) + 40 :  Number(card.width) + 40, 1,  divElement.current ? Number(divElement.current.style.height.split('px')[0]) + 40 : Number(card.height) + 40]}
      />
      <meshPhongMaterial color={ color }/>
      <Html
        ref={dragObjectRef}
      >
        <textarea
          ref={ divElement }
          style={{
            position: 'fixed',
            top: divElement.current ? -Number(divElement.current.style.height.split('px')[0] / 2) + 'px' :  -(Number(card.height)) / 2,
            left: divElement.current ? -Number(divElement.current.style.width.split('px')[0] / 2) + 'px' :  -(Number(card.width)) / 2,
            background: 'none',
            overflowY: 'hidden',
            overflowX: 'hidden',
            border: 'none',
            width: divElement.current ? Number(divElement.current.style.width.split('px')[0]) + 'px' :  card.width + 'px',
            height: divElement.current ? Number(divElement.current.style.height.split('px')[0]) + 'px' :  card.height + 'px',
            textAlign: textAlign,
            color: colorText,
            fontSize: fontSize+'px',
          }}
          value={ text }
          onPointerOver={ () => setFocused(focused => ({ ...focused, ['input']: true })) }
          onPointerOut={ () => setFocused(focused => ({ ...focused, ['input']: false })) }
          onClick={ e => e.stopPropagation }
          onChange={ e => setText(e.target.value) }
        />
        <PostItMenu 
          as={ a.div }
          style={{ 
            ...props, 
            top: divElement.current ? -Number(divElement.current.style.height.split('px')[0] / 2 + 20) + 'px' :  card.height,
            left: divElement.current ? Number(divElement.current.style.width.split('px')[0] / 2 + 20) + 'px' :  card.width,
          }}
        >
          <IoIosArrowUp
            size={ 30 } 
            color={ '#432e06' }
            onClick={ () => setFocused(focused => ({ ...focused, ['menu']: false })) }
          />
          {textAlign === 'center' ?
            <GrTextAlignCenter 
              size={ 30 } 
              color={ '#432e06' } 
              onClick={ () => setTextAlign('left') }
            />
            : textAlign === 'left' ?
              <GrTextAlignLeft 
                size={ 30 } 
                color={ '#432e06' } 
                onClick={ () => setTextAlign('right') }
              />
              : <GrTextAlignRight 
                size={ 30 } 
                color={ '#432e06' } 
                onClick={ () => setTextAlign('center') }
              />
          }
          <input 
            style={{
              width: '30px',
              height: '25px',
              background: 'none',
              border: 'none',
              color: 'black',
              textAlign: 'center',
            }}
            value={ fontSize }
            onChange={ (e) => setFontSize(e.target.value) }
          />
          <a.div 
            style={{
              background: color,
              width: '30px',
              height: '25px',
            }}
            onClick={ () => setSelectingColor(true) }
          />
          <a.div 
            style={{
              background: colorText,
              width: '30px',
              height: '25px',
            }}
            onClick={ () => setSelectingColorText(true) }
          />
        </PostItMenu>
        
        {selectingColor ? 
          <div 
            style={{
              position: 'fixed',
              top: '50px',
              right: '-208px',
            }}
          >
            <BlockPicker 
              color={ color }
              onChange={ (e) => setColor(e.hex) }
            /> 
          </div>
          : ''
        }
        {selectingColorText ? 
          <div 
            style={{
              position: 'fixed',
              top: '80px',
              right: '-208px',
            }}
          >
            <BlockPicker 
              color={ colorText }
              onChange={ (e) => setColorText(e.hex) }
            /> 
          </div>
          : ''
        }
      </Html>
    </animated.mesh>
  );
}

const PostItMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  padding: 5px;
  border: solid 2px #432e06;
  border-radius: 8px;
  margin-left: 5px;
  overflow: hidden;

  & div {
    margin-top: 4px;
  }
`;
