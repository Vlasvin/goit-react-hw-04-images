import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ModalWindow,
  ModalImg,
} from 'components/Modal/Modal.styled';

export const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImg src={modalData.img} alt={modalData.tags} />
      </ModalWindow>
    </ModalOverlay>
  );
};
