import React from 'react';
import { Form } from 'react-bootstrap';

const Search = ({ onSearch, searchValue }) => {
  const onChangeSearch = e => onSearch(e.target.value);
  return (
    <>
      <Form.Control
        placeholder="Search Player"
        onChange={onChangeSearch}
        value={searchValue}
      />
    </>
  )
};

export default Search;
