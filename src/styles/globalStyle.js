import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: overlay;
  overflow: hidden;
  background-color: ${props => props.theme.color.blue.brandColor1};
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  border: 0 solid transparent;
  border-radius: 10px;
  background-color: ${props => props.theme.color.grey.brandColor3};
}
::-webkit-scrollbar-track {
  background-color: transparent;
}

img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

textarea {
  border: none;
  padding: 0.5rem;
  resize: none;
  white-space: pre-wrap;
}

html,
body,
div,
ul{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font:inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul,li {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
h1,h2,h3,h4,h5,h6{
  vertical-align: baseline;
  margin: 0;
  padding: 0;
}

path{
  pointer-events: none;
}

* {
  box-sizing: border-box;
  text-decoration-line: none;
  color: inherit;
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  font-family: 'Pretendard';
}

*:focus {
    outline: none !important;
  }

code {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New',
    monospace;
}

#root{
  width: 100vw;
  height: 100vh;
}

html {
  font-size: 15px
}
`;

export default GlobalStyle;
