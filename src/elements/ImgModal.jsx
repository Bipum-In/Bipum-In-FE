import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as CloseIcon } from 'styles/commonIcon/close.svg';
import { ReactComponent as DeleteImg } from 'styles/commonIcon/deleteImg.svg';
import ModalPortal from './ModalPortal';

export default function ImgModal({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContainer
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.1, ease: 'easeInOut' },
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              {children}
            </ModalContainer>
          </Backdrop>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

export function ImgDetailModal({ src, isOpen, onClose }) {
  return (
    <ImgModal isOpen={isOpen} onClose={onClose}>
      <Img src={src} alt="" />
      <CloseContainer onClick={onClose}>
        <DeleteImg />
      </CloseContainer>
    </ImgModal>
  );
}

const Backdrop = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  backdrop-filter: blur(5px);
`;

const CloseContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -2.5rem;
  right: -0.1rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 37.5rem;
  min-height: 31.25rem;
  border-radius: 1rem;
`;
const Img = styled.img`
  width: 100%;
  height: 37.5rem;
  object-fit: contain;
`;
