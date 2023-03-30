import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { ReactComponent as LeftBtn } from '../../styles/commonIcon/leftBtn.svg';
import { ReactComponent as RightBtn } from '../../styles/commonIcon/rightBtn.svg';
import { ReactComponent as DeleteImg } from '../../styles/commonIcon/deleteImg.svg';

import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function ImageCarousel({ imageUrlList, onDeleteImage }) {
  const [imgPage, setImgPage] = useState(0);

  const handleImgNext = () =>
    setImgPage(state =>
      Math.abs(state) === imageUrlList.length - 1 ? 0 : state - 1
    );

  const handleImgPrevious = () =>
    setImgPage(state =>
      Math.abs(state) === 0 ? 1 - imageUrlList.length : state + 1
    );

  const handleDotClick = index => setImgPage(-index);

  const deleteSetImgPage = () =>
    setImgPage(state => (Math.abs(state) ? state + 1 : state));

  return (
    <ImgContainer>
      <DeleteImgContainer
        onClick={() => {
          onDeleteImage(imgPage);
          deleteSetImgPage();
        }}
      >
        <DeleteImg />
      </DeleteImgContainer>
      {Array.isArray(imageUrlList) ? (
        <>
          {imageUrlList.map(url => (
            <Imgs key={uuidv4()} imgPage={imgPage}>
              <Img src={url} />
            </Imgs>
          ))}
          <ArrowContainer>
            <Arrow onClick={handleImgPrevious}>
              <LeftBtn />
            </Arrow>
            <Arrow onClick={handleImgNext}>
              <RightBtn />
            </Arrow>
          </ArrowContainer>
          <Dots pageNum={imgPage * -1 + 1}>
            {imageUrlList.map((_, index) => (
              <Dot key={uuidv4()} onClick={() => handleDotClick(index)} />
            ))}
          </Dots>
        </>
      ) : (
        <Img src={imageUrlList} />
      )}
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  display: flex;
  width: 23.75rem;
  height: 17.8125rem;
  margin: 0 auto;
  overflow: hidden;
  transition: all 300ms ease-in-out;
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Arrow = styled.div`
  color: black;
  font-size: 2rem;
  :hover {
    color: grey;
  }

  svg {
    width: 2rem;
  }
`;

const DeleteImgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-1rem, 1rem);
  cursor: pointer;
  z-index: 10000;
`;

const Imgs = styled.div`
  transform: translateX(calc(23.75rem * ${props => props.imgPage}));
  transition: all 300ms ease;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Dots = styled.ul`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;

  li:nth-child(${props => props.pageNum}) {
    background-color: ${props => props.theme.color.blue.brandColor7};
  }
`;

const Dot = styled.li`
  width: 10px;
  height: 10px;
  margin: 0 0.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.color.blue.brandColor3};
  :hover {
    transform: scale(1.3);
  }
`;
