import React from 'react';
import styled from 'styled-components';
import { KEYFRAME } from '../../styles/keyframes';

export default function UseageStar() {
  return (
    <>
      {starsData.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </>
  );
}

const Star = styled.div`
  position: absolute;
  width: ${({ size }) => (size ? `${size}px` : '0.625rem')};
  height: ${({ size }) => (size ? `${size}px` : '0.625rem')};
  top: 0;
  left: ${({ positionLeft }) =>
    positionLeft !== undefined ? `${positionLeft}px` : '0'};
  background: ${({ bgColor }) => (bgColor ? bgColor : 'white')};
  border-radius: 50%;
  animation: ${KEYFRAME.starAnimation}
    ${({ animationDuration }) =>
      animationDuration ? `${animationDuration}s` : '3s'}
    linear both infinite;
  ${({ opacity }) => opacity !== undefined && `opacity: ${opacity};`}
`;

const SPEED_FACTOR = 0.5;
const STAR_GAP = 150;

const starsData = [
  { size: 2, positionLeft: 0, animationDuration: 6 },
  { size: 4, positionLeft: STAR_GAP, animationDuration: 12 },
  {
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: STAR_GAP * -1,
    animationDuration: 2,
  },
  {
    size: 4,
    bgColor: 'rgba(255, 255, 255, 0.4)',
    positionLeft: STAR_GAP * -0.6,
    animationDuration: 4,
  },
  { positionLeft: STAR_GAP, animationDuration: 5 },
  { size: 4, positionLeft: STAR_GAP * -0.2, animationDuration: 9 },
  { size: 6, positionLeft: STAR_GAP * 0.5, animationDuration: 3 },
  {
    size: 4,
    opacity: 0.2,
    bgColor: '#FFF',
    positionLeft: STAR_GAP * 0.3,
    animationDuration: 4,
  },
  {
    size: 8,
    positionLeft: STAR_GAP * -0.66,
    bgColor: '#FFF',
    opacity: 0.5,
    animationDuration: 2.4,
  },
  {
    size: 6,
    positionLeft: STAR_GAP * -0.8,
    bgColor: '#FFF',
    opacity: 0.5,
    animationDuration: 2.7,
  },
].map(star => ({
  ...star,
  animationDuration: star.animationDuration
    ? star.animationDuration * SPEED_FACTOR
    : undefined,
}));
