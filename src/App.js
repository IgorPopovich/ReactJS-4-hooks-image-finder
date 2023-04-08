import { useState, useEffect } from 'react';
import apiService from './services';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader'
import Notiflix from 'notiflix';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoaderBtn, setShowLoaderBtn] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setShowLoader(true)
      setShowLoaderBtn(true)
      try {
        const request = await apiService(query, page);
        if (request.hits.length === 0) {
          setShowLoaderBtn(false)
          return Notiflix.Notify.failure(`Даних по запиту "${query}" немає`);
        }
        if (page === 1) {
          Notiflix.Notify.success(`Знайдено картинок: ${request.totalHits}`);
        }
        setLoadMore(page < Math.ceil(request.totalHits / 12))
        setImages(prevImages => [...prevImages, ...request.hits]);
      } catch {
        Notiflix.Notify.failure(`Помилка! Спробуйте ще раз...`);
      } finally {
        setShowLoader(false)
        setShowLoaderBtn(false)
      }
    };

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const searchImages = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = e => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight + 200,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <Container>
      <Searchbar prevQuery={query} onHandleSubmit={searchImages} />

      {showLoader && <Loader />}

      {images.length > 0 && 
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      }

      {loadMore && (
        <Button onLoadMore={onLoadMore} show={showLoaderBtn} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
    </Container>
  );
}

export default App;
