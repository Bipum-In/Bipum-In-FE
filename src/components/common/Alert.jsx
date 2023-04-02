import { useEffect } from 'react';
import { ErrorModal } from 'elements/AlertModal';
import { useModalState } from 'hooks/useModalState';

export default function Alert({ message, duration }) {
  const [isErrorModalOpen, toggleErrorModal] = useModalState(true);

  useEffect(() => {
    if (isErrorModalOpen) {
      const progressBarTimer = setTimeout(() => {
        toggleErrorModal(false);
      }, duration);

      return () => {
        clearTimeout(progressBarTimer);
      };
    }
  }, [duration, isErrorModalOpen, toggleErrorModal]);

  return (
    <ErrorModal
      isOpen={isErrorModalOpen}
      toggle={() => toggleErrorModal(false)}
      message={message}
      progressBarDuration={duration}
    />
  );
}
