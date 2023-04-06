import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  useEffect(() => {
    window.ChannelIO('boot', {
      pluginKey: '8fc6776f-2edc-4507-ab21-80f5b79decae',
      customLauncherSelector: '.custom-button-1, #custom-button-2',
    });
  }, []);
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;
