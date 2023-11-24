import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ModalWindow,
  ModalImg,
} from 'components/Modal/Modal.styled';

export const Modal = ({ closeModal, modalData }) => {
  useEffect =
    (() => {
      window.addEventListener('keydown', handleKeyDown);
    },
    []);
  // const componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  //  const componentWillUnmount() {
  //     window.removeEventListener('keydown', this.handleKeyDown);
  //   }

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
