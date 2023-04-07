import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ChannelTalkImg } from 'styles/commonIcon/channel.svg';

export default function ChannelTalkBtn({ badgeCount }) {
  return (
    <>
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
    </>
  );
}

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
