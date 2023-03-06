import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import StartLoader from '../StartLoader/StartLoader';
import api from '../../services/imagesApi';

export const ImageGallery = ({ query, disable }) => {
  const [items, setItems] = useState([])
  const [startShowLoader, setStartShowLoader] = useState(false)
  const [showLoadBtn, setShowLoadBtn] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [page, setPage] = useState(1)
  const [disableLoaderBtn, setDisableLoaderBtn] = useState(false)

  useEffect(() => {
    if (query !== '') {
    setPage(1)
    setItems([])
    setShowLoadBtn(false)
    disable(true)
    setStartShowLoader(true)
      api.fetchImages(query, page)
      .then(data => {
        setItems(data.hits)
          if (data.hits.length < 1) {
            Notiflix.Notify.failure(`Nothing found for your request`);
          }
          if (data.hits.length > 0) {
            Notiflix.Notify.success(`Total images found: ${data.totalHits}`);
          }
        if (data.hits.length > 8) {
          setShowLoadBtn(true)
        }
      })
      setStartShowLoader(false)
      disable(false)
    
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  
  const loadPlus = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (query !== '') {
      setShowLoader(true)
      setDisableLoaderBtn(true)
      api.fetchImages(query, page)
      .then(data => {
        if (data.hits.length < 8) {
          setShowLoadBtn(false)
        }
        setItems([...items, ...data.hits])
        setShowLoader(false)
        setDisableLoaderBtn(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  return (
        <div className={css.main}>
          {startShowLoader && <StartLoader />}
          <ul className={css.imageGallery}>
              {items.length > 0 && items.map(( item, index ) => (
                <ImageGalleryItem key={index} oncl={startShowLoader} item={item} />
              ))}
            </ul> 
            {showLoadBtn && <Button onDisable={disableLoaderBtn} show={showLoader} loadPlus={loadPlus} />}

      </div>
      )
}

ImageGallery.propTypes = {
  items: PropTypes.number,
  startShowLoader: PropTypes.array,
  showLoadBtn: PropTypes.bool,
  showLoader: PropTypes.bool,
  page: PropTypes.bool,
  disableLoaderBtn: PropTypes.string,
};