import { CurrentUserContext } from 'contexts/CurrentUserContext';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { cardShape } from 'utills/constants';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const btnLikeClassName = `photo-card__like-button${isLiked ? ' photo-card__like-button_liked' : ''}`;

  return (
    <li className="photo-card">
      <div className="photo-card__caption">
        <h2 className="photo-card__title">{card.name}</h2>
        <div className="photo-card__likes-wrapper">
          <button
            type="button"
            className={btnLikeClassName}
            aria-label="like button"
            onClick={() => onCardLike(card)}
          />
          <span className="photo-card__likes-counter">{card.likes.length}</span>
        </div>
      </div>
      <img src={card.link} alt={card.name} className="photo-card__image" onClick={() => onCardClick(card)} />
      {isOwn && (
        <button
          type="button"
          className="photo-card__delete-button"
          aria-label="delete card"
          onClick={() => onCardDelete(card)}
        />
      )}
    </li>
  );
}

Card.propTypes = {
  card: cardShape,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Card;
