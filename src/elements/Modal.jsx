import React, { useEffect } from 'react';
import styled from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import ModalPortal from './ModalPortal';

export default function Modal({ isOpen, onClose, children }) {
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

export function CustomModal({
  isOpen,
  children,
  onClose,
  submit,
  disabled,
  text,
  width,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalMsgContainer width={width ? width : '313px'}>
        {children}
        <CloseContainer>
          <Button onClick={onClose} mainBtn="border" type="button">
            취소
          </Button>
          <Button
            onClick={submit}
            mainBtn="fill"
            type="button"
            disabled={disabled}
          >
            {text}
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

const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5625rem;
  align-items: center;
  gap: 1rem;

  button {
    width: 5rem;
    height: 2.5rem;
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
