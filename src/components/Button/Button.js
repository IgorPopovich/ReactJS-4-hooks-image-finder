import React from 'react';
import css from './Button.module.css';
import Loader from '../Loader/Loader';

export const Button = ({ loadPlus, show, onDisable }) => {

    return (
      <button disabled={onDisable} type='submit' onClick={loadPlus} className={css.button}>
        {show && <Loader />}
        
        <span className={css.submitSpan}>Load more</span>
      </button>
    )
  };
  

