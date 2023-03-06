import React, {useState} from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

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
          <header className={css.searchBar}>
             <form className={css.searchForm} onSubmit={handleSubmit}>
              <button disabled={onDisable} type="submit" className={css.searchFormButton}>
                <span className={css.searchFormButtonLabel}>Search</span>
                <img src='https://w7.pngwing.com/pngs/739/993/png-transparent-computer-icons-google-search-search-miscellaneous-desktop-wallpaper-android-thumbnail.png' alt="" />
              </button>
          
              <input className={css.searchFormInput}
                onChange={handleNameChange}
                value={query}
                type="text" name="query" 
                placeholder="Search images and photos"
              />
            </form>
          </header>
    )
}

Searchbar.propTypes = {
  query: PropTypes.string,
};
