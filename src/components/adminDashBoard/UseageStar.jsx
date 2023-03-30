import React from 'react';
import styled from 'styled-components';
import { KEYFRAME } from '../../styles/keyframes';
const starsData = [
  { size: 2, positionLeft: 40, animationDuration: '8s' },
  { size: 4, positionLeft: 100, animationDuration: '16s' },
  {
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: -100,
    animationDuration: '3s',
  },
  {
    size: 4,
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: -60,
    animationDuration: '6s',
  },
  { positionLeft: 100, animationDuration: '7s' },
  { size: 4, positionLeft: -20, animationDuration: '12s' },
  { size: 6, positionLeft: 50, animationDuration: '4s' },
  {
    size: 4,
    opacity: 0.2,
    bgColor: '#FFF',
    positionLeft: 30,
    animationDuration: '6s',
  },
  {
    size: 8,
    positionLeft: -66,
    bgColor: '#FFF',
    opacity: 0.5,
    animationDuration: '3.2s',
  },
  {
    size: 6,
    positionLeft: -80,
    bgColor: '#FFF',
    opacity: 0.5,
    animationDuration: '3.6s',
  },
  {
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: -100,
    animationDuration: '3s',
  },
  {
    size: 4,
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: -60,
    animationDuration: '6s',
  },
];

function UseageStar() {
  return (
    <>
      {starsData.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </>
  );
}

export default UseageStar;

const Star = styled.div`
  position: absolute;
  width: 0.625rem;
  height: 0.625rem;
  top: 0;
  left: 0;
  background: white;
  border-radius: 50%;
  animation: ${KEYFRAME.starAnimation}
    ${({ animationDuration }) => animationDuration || '4s'} linear both infinite;
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
  ${({ bgColor }) => bgColor && `background: ${bgColor};`}
  ${({ positionLeft }) => positionLeft && `left: ${positionLeft}px;`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
`;
