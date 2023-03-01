import React, {useState} from 'react';
import Notiflix from 'notiflix';
import './Searchbar.css';

export const Searchbar = ({ onSubmit, onDisable }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = (event) => setQuery(event.currentTarget.value)

  const handleSubmit = (event) => {
        event.preventDefault()
    
        if (query.trim() === '') {
          Notiflix.Notify.failure('Введите слово в поле "Search"');
          return
        }
        onSubmit(query)
        setQuery('')
      }

  return (
          <header className="searchbar">
             <form className="searchForm" onSubmit={handleSubmit}>
              <button disabled={onDisable} type="submit" className="searchForm-button">
                <span className="searchForm-button-label">Search</span>
                <img src='https://w7.pngwing.com/pngs/739/993/png-transparent-computer-icons-google-search-search-miscellaneous-desktop-wallpaper-android-thumbnail.png' alt="" />
              </button>
          
              <input className="searchForm-input"
                onChange={handleNameChange}
                value={query}
                type="text" name="query" 
                placeholder="Search images and photos"
              />
            </form>
          </header>
    )
}
