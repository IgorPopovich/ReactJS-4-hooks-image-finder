import PropTypes from 'prop-types';
import LoaderButton from '../LoaderButton'
import css from './Button.module.css';

function Button({ onLoadMore, show }) {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      {show && <LoaderButton />}
      <span className={css.submitSpan}>Load more</span>
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
