import React from 'react';
import './Button.css';
import Loader from '../Loader/Loader';

export const Button = ({ loadPlus, show, onDisable }) => {

    return (
      <button disabled={onDisable} type='submit' onClick={loadPlus} className="button">
        {show && <Loader />}
        
        <span className='submitSpan'>Load more</span>
      </button>
    )
  };
  

