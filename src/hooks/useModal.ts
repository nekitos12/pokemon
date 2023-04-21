import { useCallback, useState } from 'react';

const useModalWindow = (): {
  isOpen: boolean;
  setIsOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  toggleIsOpen: () => void;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return {
    isOpen,
    toggleIsOpen,
    setIsOpen,
  };
};

export default useModalWindow;