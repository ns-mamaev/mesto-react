import { useState, useEffect } from 'react';
import api from '../utills/api';

function Main(props) {
  const [userName, setUserName] = useState(undefined);
  const [userDescription, setUserDescription] = useState(undefined);
  const [userAvatar, setUserAvatar] = useState(undefined);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(({ name, about, avatar }) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch((err) => console.log(`ошибка при загрузке профиля: ${err}`))
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(
          cardsData.map(({ name, link, likes, _id }) => {
            return (
              <li className="photo-card" key={_id}>
                <div className="photo-card__caption">
                  <h2 className="photo-card__title">{name}</h2>
                  <div className="photo-card__likes-wrapper">
                    <button type="button" className="photo-card__like-button" aria-label="like image"></button>
                    <span className="photo-card__likes-counter">{likes.length}</span>
                  </div>  
                </div>
                <img src={link} alt={name} className="photo-card__image" />
                <button type="button" className="photo-card__delete-button" aria-label="delete card"></button>
              </li>)
          })
        );
      })
      .catch((err) => console.log(`ошибка при загрузке одной или нескольких карточек: ${err}`));
  }, [])

  return (
    <main className="content">
      <section className="profile" type="button">
        <button className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
        </button>  
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" className="profile__edit-button" aria-label="edit profile" onClick={props.onEditProfile}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="add card" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards}
        </ul>
      </section>
    </main>
  );
}

export default Main;