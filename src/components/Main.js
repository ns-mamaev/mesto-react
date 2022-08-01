import { useState, useEffect } from 'react';
import api from '../utills/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
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
      .then((cards) => {
        setCards(cards)
      })  
      .catch((err) => console.log(`ошибка при загрузке одной или нескольких карточек: ${err}`));
  }, []);

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
          {cards.map(card => <Card card={card} key={card._id} onCardClick={props.onCardClick}/>)}
        </ul>
      </section>
    </main>
  );
}

export default Main;