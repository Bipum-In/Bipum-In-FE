import { css } from 'styled-components';

const blue = {
  brandColor1: '#F9FBFF',
  brandColor2: '#D0E4FF',
  brandColor3: '#A9CEFF',
  brandColor4: '#87BBFF',
  brandColor5: '#5FA4FF',
  brandColor6: '#1479FF',
  brandColor7: '#005EDA',
};

const grey = {
  brandColor1: '#F5F5F5',
  brandColor2: '#E3E3E3',
  brandColor3: '#CFCFCF',
  brandColor4: '#B7B7B7',
  brandColor5: '#9E9E9E',
  brandColor6: '#828282',
  brandColor7: '#5F5F5F',
};

const color = {
  blue,
  grey,
  trans: 'transparent',
  accpet: '#2b9936',
  reject: '#C73939',
  remove: '#746336',
};

const fontWeight = {
  bold: 700,
  semi_bold: 600,
  regular: 400,
};

const screen = {
  dashboardMaxWidth: '2458px',
  dashboardDesktopMaxWidth: '1960px',
  fullWideDesktop: '1630px',
  wide_desktop: '1400px',
  desktop: '1280px',
  tablet_h: '1024px',
  tablet_v: '768px',
  mobile_h: '600px',
  mobile_v: '480px',
  fullWidth: 1630,
  desktopSize: 1280,
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

const AbsoluteTL = css`
  position: absolute;
  top: 0;
  left: 0;
`;

const CursorActive = css`
  pointer-events: auto;
  cursor: pointer;
`;

const Boxshadow = css`
  box-shadow: 0.1888rem 0.1888rem 0.944rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const theme = {
  color,
  screen,
  fontWeight,
  wh100,
  FlexCol,
  FlexRow,
  FlexCenter,
  AbsoluteTL,
  CursorActive,
  Boxshadow,
};

export default theme;
