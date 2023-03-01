import React, {useState} from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import './App.css';

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
