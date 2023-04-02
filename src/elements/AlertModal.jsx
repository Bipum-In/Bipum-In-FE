import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Alert } from 'styles/commonIcon/alert.svg';

export default function AlertModal({
  isOpen,
  onClose,
  progressBarDuration,
  children,
}) {
  const backdropVariants = {
    visible: { opacity: 1 },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        y: { type: 'spring', stiffness: 500, damping: 20 },
        opacity: { duration: 0.2 },
      },
    },
    hidden: {
      opacity: 0,
      y: '-50%',
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ModalContainer
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
          >
            {children}
            {isOpen && (
              <ProgressBar progressBarDuration={progressBarDuration} />
            )}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export const ErrorModal = React.memo(
  ({ isOpen, toggle, message, progressBarDuration }) => {
    return (
      <>
        <AlertModal
          isOpen={isOpen}
          onClose={toggle}
          progressBarDuration={progressBarDuration}
        >
          <ModalMsgWrapper>
            <AlertIcon>
              <Alert />
            </AlertIcon>
            <MsgContainer>
              <p>{message}</p>
            </MsgContainer>
          </ModalMsgWrapper>
        </AlertModal>
      </>
    );
  }
);
const shrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: white;
  animation: ${shrink} ${props => props.progressBarDuration}ms linear forwards;
  pointer-events: none;
  border-radius: 1rem;
`;

const Backdrop = styled(motion.div)`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 99999;
  /* right: 1rem;
  top: 1rem; */
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalContainer = styled(motion.div)`
  background-color: tomato;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  width: 340px;
`;

const ModalMsgWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 1rem 1rem 2.5rem;
  color: #5f5f5f;
  min-height: 64px;
`;

const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 0px;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: white;
  box-shadow: 0.1888rem 0.1888rem 0.944rem rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
`;

const MsgContainer = styled.div`
  p {
    color: white;
    margin: 0.3125rem 0 0 0;
    letter-spacing: -0.0313rem;
    white-space: pre-line;
    font-weight: bold;
    font-size: 1rem;
  }
`;
