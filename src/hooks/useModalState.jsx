import { useState, useCallback } from 'react';

export const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  const setErrorAndToggle = error => {
    setErrorMessage(error);
    toggle();
  };

  return [isOpen, toggle, errorMessage, setErrorAndToggle];
};
