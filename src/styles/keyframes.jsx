import { keyframes } from 'styled-components';

const floating = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const starAnimation = keyframes`
  0% { opacity: 0; transform: translate(200px, 0); }
  25% { opacity: 0.6; transform: translate(150px, 50px); }
  75% { opacity: 0.6; transform: translate(50px, 150px); }
  100% { opacity: 0; transform: translate(0, 200px); }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInRotate = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: rotate(180deg);
  }
`;

export const Keyframe = {
  floating,
  starAnimation,
  fadeIn,
  fadeInRotate,
};
