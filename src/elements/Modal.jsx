import React, { useEffect } from 'react';
import styled from 'styled-components';
//npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      y: '0%',
      scale: 1,
      transition: {
        y: { type: 'spring', stiffness: 400, damping: 20 },
        opacity: { duration: 0.2 },
      },
    },
    hidden: {
      opacity: 0,
      y: '-50%',
      transition: {
        y: { duration: 0.2 },
        opacity: { duration: 0.2 },
      },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
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
      <ModalMsgContainer width={'500px'}>{children}</ModalMsgContainer>
      <CloseContainer>
        <CloseButtonContainer>
          <Button onClick={submit} submit type="button" disabled={disabled}>
            {text}
          </Button>
          <Button onClick={onClose} cancel type="button">
            취소
          </Button>
        </CloseButtonContainer>
      </CloseContainer>
    </Modal>
  );
}

//useAge
// const [someModal, toggleModal] = useModalState(false);
// toggleModal(true);
// const handleModalClose = () => {
//   toggleModal(false);
// };

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
  /* backdrop-filter: blur(2px); */
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  border-radius: 1rem;
  /* filter: drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 20px); */
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  border-top: 0.0625rem solid rgb(247, 247, 247);
  min-height: 3.5rem;
  padding: ${props => props.padding};
  margin-top: 0;
  align-items: center;
`;

const ModalMsgContainer = styled.div`
  font-size: 1rem;
  padding: 2.5rem 1.875rem;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  line-height: 1.3125rem;
  font-weight: bold;
  min-width: ${props => props.width};
  color: #333333;
`;

const CloseButtonContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
