import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import api from '../utills/api';
import Card from './Card';

function Main(props) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch((err) => console.log(`ошибка при загрузке одной или нескольких карточек: ${err}`));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(oldCard => oldCard._id === card._id ? newCard : oldCard))
      })
      .catch(err => `Невозможно обработать лайк: ${err}`);
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(oldCard => oldCard._id !== card._id))
      })
      .catch(err => `Невозможно удалить карточку: ${err}`);

  }

  return (
    <main className="content">
      <section className="profile" type="button">
        <button className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" aria-label="edit profile" onClick={props.onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="add card" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;