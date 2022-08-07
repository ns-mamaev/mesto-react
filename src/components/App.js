import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import api from 'utills/api';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(newData => {
        setCurrentUser(newData);
      })
      .catch(err => `Невозможно обновить данные пользователя: ${err}`)
      .finally(() => closeAllPopups());
  }

  useEffect(() => {
    api.getUserInfo()
      .then(user => {
        setCurrentUser(user)
      })
      .catch(err => console.log(`ошибка при загрузке данных пользователя: ${err}`))
  }, [])

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
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="form__field">
            <input type="text" className="form__item form__item_content_new-place-name" name="name" placeholder="Название" required minLength="2" maxLength="40" />
            <span className="form__error form__error_field_place-name"></span>
          </label>
          <label className="form__field">
            <input type="url" className="form__item form__item_content_new-place-link" name="link" placeholder="Ссылка на картинку" required minLength="7" />
            <span className="form__error form__error_field_place-link"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
