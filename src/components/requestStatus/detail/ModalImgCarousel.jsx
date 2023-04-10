import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as NextIcon } from 'styles/commonIcon/rightBtn.svg';
import { ReactComponent as PrevIcon } from 'styles/commonIcon/leftBtn.svg';
import { ReactComponent as DeleteIcon } from 'styles/commonIcon/deleteImg.svg';
import emptyImg from 'styles/commonIcon/emptyImg.svg';

import { ImgDetailModal } from 'elements/ImgModal';

export default function ModalImgCarousel({ editMode, image, onDelete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleClick = index => {
    setSelectedImage(index);
    setShowModal(true);
  };
  const rightRem = 1;
  const slideCount = 3;
  const slideWidth = 8.25 + rightRem;
  const sliderRef = useRef();

  useEffect(() => {
    if (image.length <= slideCount) {
      setCurrentSlide(0);
    }
  }, [image]);

  const nextSlide = () => {
    if (currentSlide < image.length - slideCount) {
      setCurrentSlide(currentSlide + slideCount);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - slideCount);
    } else {
      const remainder = image.length % slideCount;
      setCurrentSlide(
        remainder === 0 ? image.length - slideCount : image.length - remainder
      );
    }
  };

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= image.length - slideCount;

  return (
    <>
      <ImageWrapper ref={sliderRef} slideX={currentSlide * slideWidth}>
        {image.length > 0 ? (
          image.map((img, index) => (
            <ImgContainer key={uuidv4()} rem={rightRem}>
              <ImgArr
                src={img}
                alt="equipmentImg"
                onClick={() => handleClick(index)}
              />
              {editMode && (
                <DeleteImgContainer onClick={() => onDelete(index)}>
                  <DeleteIcon />
                </DeleteImgContainer>
              )}
              {selectedImage !== null && (
                <ImgDetailModal
                  src={image[selectedImage]}
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              )}
            </ImgContainer>
          ))
        ) : (
          <EmptyImgContainer>
            <img src={emptyImg} alt="이미지가 존재하지 않습니다" />
          </EmptyImgContainer>
        )}
      </ImageWrapper>

      {image.length > slideCount && (
        <>
          <ButtonPrev onClick={prevSlide} disabled={isPrevDisabled}>
            <PrevIcon />
          </ButtonPrev>
          <ButtonNext onClick={nextSlide} disabled={isNextDisabled}>
            <NextIcon />
          </ButtonNext>
        </>
      )}
    </>
  );
}

const EmptyImgContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background-color: ${props => props.theme.color.grey.brandColor1};
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 0.375rem;
  margin-top: -1rem;
  img {
    width: 80%;
    height: 80%;
  }
`;

const ImageWrapper = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
  padding-top: 1rem;
  position: relative;
  transition: all 0.3s ease-in-out;
  transform: ${props => `translateX(-${props.slideX}rem)`};
`;

const ImgContainer = styled.div`
  position: relative;
  margin-left: ${props => props.rem}rem;
  border: 1px solid ${props => props.theme.color.grey.brandColor1};
  border-radius: 1rem;
  max-width: 8.25rem;
  max-height: 8.25rem;
  min-width: 8.25rem;
  min-height: 8.25rem;
`;

const ImgArr = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.375rem;
  object-fit: cover;
`;

const DeleteImgContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.125rem;
  height: 1.125rem;
`;

const CarouselBtnStyle = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'pointer')};
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => (props.disabled ? '.5' : '1')};
  svg {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
  }
`;

const ButtonPrev = styled(CarouselBtnStyle)`
  right: 1.8rem;
`;

const ButtonNext = styled(CarouselBtnStyle)`
  right: 0;
`;
