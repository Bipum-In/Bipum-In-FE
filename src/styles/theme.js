import { css } from 'styled-components';

const color = {
  white: '#ffffff',
  sky_white: '#f8f9fa',
  light_white: '#eeeeee',
  dark_white: '#bdbdbd',
  apple_white: '#e8e8e8',
  red: '#dc1a13',
  pink: '#fe918d',
  dark_pink: '#ff6863',
  ligth_pink: '#fab1a0',
  dark_grey: '#4d4d4d',
  grey: '#616161',
  light_grey: '#7c7979',
  dark_blue: '#497da0',
  blue: '#73aace',
  messenger: '#d1d3da',
  light_messenger: '#ebebee',
  shark_blue: '#413d53',
  shark_light_blue: '#56516a',
  deep_blue: '#262431',
  yellow: '#fff7d1',
  orange: '#feb546',
  carrot_orange: '#ff7e36',
  light_orange: '#fbf7f2',
  black: '#000000',
  ligth_black: '#262626',
  melon: '#e5f3e6',
  dark_mint: '#25c79a',
  mint: '#54efc3',
  purple: '#6f48eb',
  light_purple: '#ede8fd',
  dark_purple: '#4c4956',
  trans: 'transparent',
};

const fontSize = {
  xxxlarge: '6rem',
  xxlarge: '5rem',
  xlarge: '4rem',
  large: '3rem',
  large_medium: '2.5rem',
  medium: '1.75rem',
  large_regular: '1.5rem',
  regular: '1.125rem',
  small: '1rem',
  micro: '0.875rem',
};

const fontWeight = {
  bold: 700,
  semi_bold: 600,
  regular: 400,
};

const borderRadius = {
  round: '100%',
  half_round: '50%',
  large: '3rem',
  medium: '1.5rem',
  small: '0.5rem',
};

const screen = {
  fullWideDesktop: '1600px',
  wide_desktop: '1400px',
  desktop: '1200px',
  tablet_h: '1024px',
  tablet_v: '768px',
  mobile_h: '600px',
  mobile_v: '480px',
};

const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

const FlexCenter = css`
  justify-content: center;
  align-items: center;
`;

const wh100 = css`
  width: 100%;
  height: 100%;
`;

const theme = {
  color,
  screen,
  fontWeight,
  fontSize,
  borderRadius,
  wh100,
  FlexCol,
  FlexRow,
  FlexCenter,
};

export default theme;
