import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { FiSearch } from 'react-icons/fi';

function Searchbar({ onHandleSubmit, prevQuery }) {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (prevQuery === query) {
      setQuery('');
      return Notiflix.Notify.failure(`Ви ввели попереднє значення в поле"Search", спробуйте інше слово`);
    }
    if (query.trim() === '') {
      return Notiflix.Notify.failure(`Поле "Search" порожнє`);
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
          <FiSearch size={18} stroke="#3f51b5" />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
