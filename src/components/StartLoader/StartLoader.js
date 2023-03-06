import css from './StartLoader.module.css';

const StartLoader = () => {
    return (
        <div id="StartLoaderContainer">
            <p className='loadingTitle'>Loading...</p>
            <div id="StartLoader">
            </div>
        </div>
  );
};

export default StartLoader;