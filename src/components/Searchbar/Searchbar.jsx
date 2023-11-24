import React, { useState } from 'react';
import {
  SearchBar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [nameSearch, setNameSearch] = useState('');
  // state = {
  //   nameSearch: '',
  // };

  const handleChange = e => setNameSearch(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    if (nameSearch.trim() === '') {
      return;
    }
    onSubmit(nameSearch);
    reset();
  };

  const reset = () => {
    setNameSearch('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FaSearch />
          <SearchFormBtnLabel></SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={nameSearch}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
};
