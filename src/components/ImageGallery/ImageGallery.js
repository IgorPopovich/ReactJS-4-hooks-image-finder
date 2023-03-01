import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import './ImageGallery.css';
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
        Notiflix.Notify.success(`Всего найдено картинок: ${data.totalHits}`);
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
        <div className='main'>
          {startShowLoader && <StartLoader />}
          <ul className="imageGallery">
              {items.length > 0 && items.map(( item, index ) => (
                <ImageGalleryItem key={index} oncl={startShowLoader} item={item} />
              ))}
            </ul> 
            {showLoadBtn && <Button onDisable={disableLoaderBtn} show={showLoader} loadPlus={loadPlus} />}

      </div>
      )
}


