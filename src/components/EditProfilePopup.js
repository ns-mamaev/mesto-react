import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useContext, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: '', about: '' });
  const [inputsValidity, setInputsValidity] = useState({ name: false, about: false });
  const [validationMessages, setValidationMessages] = useState({ name: '', about: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      // меняю стейт только когда данные пользователя уже пришли с сервера
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (!Object.values(inputsValidity).some((value) => value === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputsValidity]);

  const onChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    setInputsValidity((inputsValidity) => ({ ...inputsValidity, [e.target.name]: e.target.validity.valid }));
    setValidationMessages((validationMessages) => ({
      ...validationMessages,
      [e.target.name]: e.target.validationMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_content_profile-name"
          name="name"
          placeholder="Введите ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name}
          onChange={onChange}
        />
        <span className={`form__error${inputsValidity.name ? '' : ' form__error_visible'}`}>
          {validationMessages.name}
        </span>
      </label>
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_content_profile-about"
          name="about"
          placeholder="Ваш род деятельности?"
          required
          minLength="2"
          maxLength="200"
          value={values.about}
          onChange={onChange}
        />
        <span className={`form__error${inputsValidity.about ? '' : ' form__error_visible'}`}>
          {validationMessages.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
