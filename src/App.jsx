import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ChannelTalkImg } from 'styles/commonIcon/channel.svg';
export default function App() {
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    window.ChannelIO('boot', {
      pluginKey: '8fc6776f-2edc-4507-ab21-80f5b79decae',
      hideDefaultLauncher: true,
    });

    window.ChannelIO('onBadgeChanged', count => {
      console.log('Badge count changed:', count);
      setBadgeCount(count);
    });
    return () => {
      window.ChannelIO('shutdown');
    };
  }, []);

  return (
    <Wrapper>
      <ChannelTalk
        className="ct-btn"
        onClick={() => window.ChannelIO('showMessenger')}
      >
        <ChannelTalkImg />
        {badgeCount > 0 && (
          <Badge>
            <Badgetitle>
              <span>{badgeCount}</span>
            </Badgetitle>
          </Badge>
        )}
      </ChannelTalk>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const ChannelTalk = styled.div`
  position: relative;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: scale(1.1);
    svg {
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.269));
    }
  }
  svg {
    width: 50px;
    height: 50px;
    transition: all 0.3s;
    filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Badgetitle = styled.div`
  display: flex;
  position: relative;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: rgb(234, 77, 88);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  justify-content: center;
  span {
    font-size: 12px;
    padding: 0;
    margin: 0;
    line-height: 1.8;
  }
`;
