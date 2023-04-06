import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const typingSpeed = 100;
const erasingSpeed = 70;
const eraseDelay = 4000;
const typingDelay = 1000;

export default function MainTyping({ textList }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    // 텍스트 업데이트 비동기 함수
    const updateText = async () => {
      while (isMounted) {
        const text = textList[textIndex];
        // 텍스트 타이핑
        for (let i = 1; i <= text.length; i++) {
          if (!isMounted) return;
          setDisplayText(text.slice(0, i)); // displayText를 텍스트의 i번째 글자까지 slice하여 변경
          await new Promise(r => setTimeout(r, typingSpeed)); // typingSpeed 간격으로 글자 하나씩 추가
        }
        await new Promise(r => setTimeout(r, eraseDelay)); // eraseDelay 시간만큼 대기
        // 텍스트 제거
        for (let i = text.length; i > 0; i--) {
          if (!isMounted) return;
          setDisplayText(text.slice(0, i - 1)); // displayText 상태를 텍스트의 i-1번째 글자까지 slice하여 변경
          await new Promise(r => setTimeout(r, erasingSpeed)); // 글자 하나씩 제거
        }
        await new Promise(r => setTimeout(r, typingDelay)); // 타이핑 대기
        // textList 배열의 인덱스를 다음 인덱스로 변경 (textList의 길이를 벗어나면 다시 처음부터 시작)
        setTextIndex((textIndex + 1) % textList.length);
      }
    };
    updateText();
    return () => {
      isMounted = false;
    };
  }, [textIndex, textList]);

  return (
    <>
      <TypingTitle>
        {displayText.split('').map((title, i) => (
          <span key={i}>{title}</span>
        ))}
        {/* 커서 요소 */}
        <Cursor>|</Cursor>
      </TypingTitle>
    </>
  );
}

const TypingTitle = styled.span`
  font-size: 4.375rem;
  font-weight: 700;
  margin-bottom: 3.5625rem;
`;

const Cursor = styled.span`
  animation: ${keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `} 1s step-end infinite;
`;
