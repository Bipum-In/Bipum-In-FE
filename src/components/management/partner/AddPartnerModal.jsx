import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as XClose } from 'styles/commonIcon/close.svg';
import Button from 'elements/Button';
import ModalPortal from 'elements/ModalPortal';
import RequestBox from './RequestBox';

export default function PnModal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = event => {
        if (event.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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

export function PatnerModal({ isOpen, onClose, handleModalClose }) {
  return (
    <PnModal isOpen={isOpen} onClose={onClose}>
      <TitleContainer>
        <Type>협엽 업체 등록</Type>

        <Close>
          <Button onClick={onClose}>
            <XClose />
          </Button>
        </Close>
      </TitleContainer>
      <ModalMsgContainer width={'313px'}>
        <RequestBox handleModalClose={handleModalClose} />
      </ModalMsgContainer>
    </PnModal>
  );
}

const TitleContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.875rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor7};
  padding: 0 3.9375rem;
  border-radius: 1rem 1rem 0 0;
`;

const Type = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
`;

const Close = styled.div`
  button {
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;

const Backdrop = styled(motion.div)`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto;
  border-radius: 1rem;
  > div {
    overflow: hidden;
  }
`;

const ModalMsgContainer = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 1rem;
  padding: 3.125rem 4.0625rem 2.1875rem 4.0625rem;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  min-width: ${props => props.width};
`;
