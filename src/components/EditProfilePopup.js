import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useContext } from 'react';
import useFormWithValidation from 'utills/hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, isErrors, errorMessages, isFormNotValid, onChange } = useFormWithValidation([
    'name',
    'about',
  ]);

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      // меняю стейт только когда данные пользователя уже пришли с сервера
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormNotValid={isFormNotValid}
    >
      <label className="form__field">
        <input
          type="text"
          className={`form__item form__item_content_profile-name ${isErrors?.name ? 'form__item_type_error' : ''} `}
          name="name"
          placeholder="Введите ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={values?.name}
          onChange={onChange}
        />
        <span className={`form__error ${isErrors?.name ? 'form__error_visible' : ''}`}>{errorMessages?.name}</span>
      </label>
      <label className="form__field">
        <input
          type="text"
          className={`form__item form__item_content_profile-name ${isErrors?.about ? 'form__item_type_error' : ''} `}
          name="about"
          placeholder="Ваш род деятельности?"
          required
          minLength="2"
          maxLength="200"
          value={values?.about}
          onChange={onChange}
        />
        <span className={`form__error ${isErrors?.about ? 'form__error_visible' : ''}`}>{errorMessages?.about}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;