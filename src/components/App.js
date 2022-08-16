import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import api from 'utills/api';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import RemoveCardPopup from './RemoveCardPopup';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isRemoveCardPopupOpened, setIsRemoveCardPopupOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardTodelete] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpened(false);
    setIsRemoveCardPopupOpened(false);
    setTimeout(() => setSelectedCard({}), 500); //не убираю картинку пока показывается анимация закрытия попапа
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) => state.map((oldCard) => (oldCard._id === card._id ? updatedCard : oldCard)));
      })
      .catch((err) => console.log(`Невозможно обработать лайк: ${err}`));
  };

  const handleCardDelete = (card) => {
    setIsRemoveCardPopupOpened(true);
    setCardTodelete(card);
  };

  const handleUpdateUser = (userData) => {
    return api.setUserInfo(userData).then((newData) => {
      setCurrentUser(newData);
    });
  };

  const handleUpdateAvatar = (avatarData) => {
    return api.setAvatar(avatarData).then((newData) => {
      setCurrentUser(newData);
    });
  };

  const handleAddPlaceSubmit = (cardData) => {
    return api.addCard(cardData).then((newCard) => setCards((cards) => [newCard, ...cards]));
  };

  const handleConfirmRemove = () => {
    const id = cardToDelete._id;
    return api.deleteCard(id).then(() => setCards((cards) => cards.filter((card) => card._id !== id)));
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(`ошибка при загрузке данных пользователя: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(`ошибка при загрузке одной или нескольких карточек: ${err}`));
  }, []);

  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpened || isImagePopupOpened) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpened, isImagePopupOpened]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="loading-screen loading-screen_disabled"></div>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup isOpen={isImagePopupOpened} card={selectedCard} onClose={closeAllPopups} />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpened}
          onClose={closeAllPopups}
          onConfirmRemove={handleConfirmRemove}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
