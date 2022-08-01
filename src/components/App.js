import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {useState} from 'react';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
  
  return (
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
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpened} onClose={closeAllPopups}>
      <label className="form__field">
        <input type="text" className="form__item form__item_content_profile-name" name="name" placeholder="Введите ваше имя" required minLength="2" maxLength="40" />
        <span className="form__error form__error_field_profile-name"></span>
      </label>
      <label className="form__field">
        <input type="text" className="form__item form__item_content_profile-about" name="about" placeholder="Ваш род деятельности?" required minLength="2" maxLength="200" />
        <span className="form__error form__error_field_profile-about"></span>
      </label>
    </PopupWithForm>
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
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <label className="form__field">
        <input type="url" className="form__item form__item_content_avatar-link" name="avatar" placeholder="Ссылка на аватар" required minLength="7" />
        <span className="form__error form__error_field_avatar-link"></span>
      </label>
    </PopupWithForm>
    <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да"/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </div>
  );
}

export default App;
