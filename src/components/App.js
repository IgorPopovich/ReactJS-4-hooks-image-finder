import React, {useState} from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import PropTypes from 'prop-types';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const handleFormSubmit = (name) => {
    setQuery(name)
  }
  

    return (
      <div className='main'>
        <Searchbar onDisable={disableBtn} onSubmit={handleFormSubmit} />
        <ImageGallery disable={setDisableBtn} query={query} />
    </div>
    )
  
}

App.propTypes = {
  query: PropTypes.string,
  disableBtn: PropTypes.bool,
};