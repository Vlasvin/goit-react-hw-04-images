import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageFinder, ErrorMsg } from './App.styled';
import ApiService from 'services/api.js';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [modalData, setModalData] = useState({ img: '', tags: '' });
  const [error, setError] = useState(null);

  const handleSubmit = nameSearch => {
    setNameSearch(nameSearch);
    setPage(1);
  };

  const handleLoadClick = prevState => setPage(page + 1);

  const addModalData = (img, tags) => {
    setShowModal(true);
    setModalData({ img, tags });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (nameSearch) {
      setIsLoader(true);
      setLoadMore(false);
      setError(null);

      const apiService = new ApiService(nameSearch, page);
      apiService
        .fetchImg(page)
        .then(images => {
          if (images.hits.length > 0) {
            setImages(prev =>
              page === 1 ? images.hits : [...prev, ...images.hits]
            );
            setLoadMore(page < Math.ceil(images.totalHits / 12));
          } else {
            return Promise.reject(
              new Error('Oops... there are no images matching your search...')
            );
          }
        })
        .catch(error => {
          setImages([]);
          setError(error);
        })
        .finally(setIsLoader(false));
    }
  }, [nameSearch, page]);

  return (
    <ImageFinder>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
      {!isLoader && (
        <ImageGallery
          loadMore={loadMore}
          showModal={showModal}
          images={images}
          handleLoadClick={handleLoadClick}
          closeModal={closeModal}
          setModalData={addModalData}
          modalData={modalData}
        ></ImageGallery>
      )}
      {isLoader && <Loader></Loader>}
    </ImageFinder>
  );
};
