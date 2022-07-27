import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="page">
    <div className="loading-screen loading-screen_disabled"></div>
    <Header />
    <Main />
    <Footer />
    <div className="popup popup_content_edit-profile">
      <div className="popup__container">
        <button aria-label="close popup" className="popup__close-button"></button>
        <form className="form form_content_edit-profile" name="edit-profile" novalidate>
          <h3 className="form__title">Редактировать профиль</h3>
          <label className="form__field">
            <input type="text" className="form__item form__item_content_profile-name" name="name" placeholder="Введите ваше имя" required minlength="2" maxlength="40" />
            <span className="form__error form__error_field_profile-name"></span>
          </label>
          <label className="form__field">
            <input type="text" className="form__item form__item_content_profile-about" name="about" placeholder="Ваш род деятельности?" required minlength="2" maxlength="200" />
            <span className="form__error form__error_field_profile-about"></span>
          </label>
          <button type="submit" name="profile-save" value="Сохранить" className="form__button">Сохранить</button>
        </form>
      </div>
    </div>
    <div className="popup popup_content_add-card">
      <div className="popup__container">
        <button aria-label="close popup" className="popup__close-button"></button>
        <form className="form form_content_add-card" name="add-card" novalidate>
          <h3 className="form__title">Новое место</h3>
          <label className="form__field">
            <input type="text" className="form__item form__item_content_new-place-name" name="name" placeholder="Название" required minlength="2" maxlength="40" />
            <span className="form__error form__error_field_place-name"></span>
          </label>
          <label className="form__field">
            <input type="url" className="form__item form__item_content_new-place-link" name="link" placeholder="Ссылка на картинку" required minlength="7" />
            <span className="form__error form__error_field_place-link"></span>
          </label>
          <button type="submit" name="place-create" value="Создать" className="form__button">Создать</button>
        </form>
      </div>
    </div>
    <div className="popup popup_content_edit-avatar">
      <div className="popup__container">
        <button aria-label="close popup" className="popup__close-button"></button>
        <form className="form form_content_edit-avatar" name="edit-avatar" novalidate>
          <h3 className="form__title">Обновить аватар</h3>
          <label className="form__field">
            <input type="url" className="form__item form__item_content_avatar-link" name="avatar" placeholder="Ссылка на аватар" required minlength="7" />
            <span className="form__error form__error_field_avatar-link"></span>
          </label>
          <button type="submit" name="avatar-edit" value="Сохранить" className="form__button">Сохранить</button>
        </form>
      </div>
    </div>
    <div className="popup popup_content_zoomed-card-image">
      <div className="popup__img-wrapper">
        <button aria-label="close popup" className="popup__close-button"></button>
        <img className="popup__zoomed-image" src="#" alt="#" />
        <h3 className="popup__zoomed-image-caption"></h3>
      </div>
    </div>
   <div className="popup popup_content_confirmation">
      <div className="popup__container">
        <button aria-label="close popup" className="popup__close-button"></button>
        <form className="form form_content_comfirmation" name="confirm" novalidate>
          <h3 className="form__title">Вы уверены?</h3>
          <button type="submit" name="confirm" value="Да" className="form__button">Да</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
