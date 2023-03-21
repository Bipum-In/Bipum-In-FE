import { useState } from 'react';

export const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => setIsOpen(prev => !prev);
  return [isOpen, toggle];
};
