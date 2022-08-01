function Card({ card, onCardClick }) {
    return (
        <li className="photo-card">
          <div className="photo-card__caption">
            <h2 className="photo-card__title">{card.name}</h2>
            <div className="photo-card__likes-wrapper">
              <button type="button" className="photo-card__like-button" aria-label="like image"></button>
              <span className="photo-card__likes-counter">{card.likes.length}</span>
            </div>  
          </div>
          <img src={card.link} alt={card.name} className="photo-card__image" onClick={() => onCardClick(card)}/>
          <button type="button" className="photo-card__delete-button" aria-label="delete card"></button>
        </li>
    )
}

export default Card;