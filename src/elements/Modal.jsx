import React, { useEffect } from 'react';
import styled from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import ModalPortal from './ModalPortal';

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.1, ease: 'easeInOut' },
    },
    hidden: { opacity: 0, scale: 0.9 },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <ModalContainer
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
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

export function CustomModal({
  isOpen,
  children,
  onClose,
  submit,
  disabled,
  text,
}) {
  return (
    <Modal isOpen={isOpen}>
      <ModalMsgContainer width={'313px'}>
        {children}
        <CloseContainer>
          <Button
            onClick={submit}
            mainBtn="fill"
            type="button"
            disabled={disabled}
          >
            {text}
          </Button>
          <Button onClick={onClose} mainBtn="border" type="button">
            취소
          </Button>
        </CloseContainer>
      </ModalMsgContainer>
    </Modal>
  );
}

const Backdrop = styled(motion.div)`
  ${props => props.theme.FlexRow};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
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

const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  align-items: center;
  gap: 1rem;

  button {
    width: 80px;
    height: 40px;
  }
`;

const ModalMsgContainer = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 1rem;
  padding: 3.125rem 4.0625rem;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  min-width: ${props => props.width};
`;
