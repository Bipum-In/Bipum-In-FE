import React from 'react';
import styled from 'styled-components';

export default function RendingDots({ pageIndex, totalPages, setPageIndex }) {
  return (
    <DotsContainer>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Dot
          key={index}
          active={pageIndex === index}
          onClick={() => setPageIndex(index)}
        />
      ))}
    </DotsContainer>
  );
}
const DotsContainer = styled.div`
  position: fixed;
  right: 5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.color.blue.brandColor6 : theme.color.blue.brandColor3};
  transition: background-color 0.3s ease, transform 0.3s ease;
  transform: ${({ active }) => (active ? 'scale(1.5)' : 'scale(0.6)')};
  ${props => props.theme.CursorActive};
`;
