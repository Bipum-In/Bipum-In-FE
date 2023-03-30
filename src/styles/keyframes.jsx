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

export const KEYFRAME = {
  floating,
  starAnimation,
};
