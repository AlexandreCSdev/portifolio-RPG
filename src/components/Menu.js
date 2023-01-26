import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { BsFillLockFill, BsThreeDots, BsFillUnlockFill } from 'react-icons/bs';
import { HiOutlineLogin } from 'react-icons/hi';

export function Menu({ setLockScene }) {
  const [ hovered, setHovered ] = useState(false);
  const [ locked, setLocked ] = useState(false);
  const menuProps = useSpring({
    width: hovered ? '120px' : '60px',
  });
  const mainItemProps = useSpring({
    opacity: !hovered ? '1' : '0',
  });
  const itemProps = useSpring({
    opacity: hovered ? '1' : '0',
  });

  return (
    <MenuBox 
      as={ animated.div } 
      style={ menuProps } 
      onPointerOver = { () => setHovered(true) }
      onPointerOut = { () => setHovered(false) }
    >
      <MainItemBox
        as={ animated.div } 
        style={ mainItemProps } 
      >
        <BsThreeDots size={ 40 } />
      </MainItemBox>

      <ItemBox
        as={ animated.div } 
        style={ itemProps } 
      >
        <HiOutlineLogin size={ 40 } />
      </ItemBox>
      <ItemBox
        onClick={ () => setLocked(!locked)}
        as={ animated.div } 
        style={ itemProps } 
      >
        {
          locked ? (
            setLockScene(true),
            <BsFillUnlockFill size={ 40 } />
          ) : (
            setLockScene(false),
            <BsFillLockFill size={ 40 } />
          )
        }
      </ItemBox>
    </MenuBox>
  );
}

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10px;
  left: 10px;
  height: 60px;
  border-radius: 10px;
  border: solid 3px #fff;
  color: #fff;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 10px;
`;

const MainItemBox = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 10px;
`;
