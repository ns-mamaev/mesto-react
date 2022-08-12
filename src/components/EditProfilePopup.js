import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useContext } from 'react';
import useFormWithValidation from 'utills/hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, isErrors, errorMessages, isFormNotValid, setValues, onChange } = useFormWithValidation();

  // const [values, setValues] = useState({ name: '', about: '' });
  // const [isErrors, setIsErrors] = useState({ name: false, about: false });
  // const [errorMessages, setErrorMessages] = useState({ name: '', about: '' });
  // const [isFormNotValid, setIsFormNotValid] = useState(false);

  // React.useEffect(() => {
  //   setIsFormNotValid(isErrors.name || isErrors.about);
  // }, [isErrors.name, isErrors.about]);

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      // меняю стейт только когда данные пользователя уже пришли с сервера
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser]);

  // const onChange = (e) => {
  //   setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  //   setIsErrors((isErrors) => ({ ...isErrors, [e.target.name]: !e.target.validity.valid }));
  //   if (!e.target.validity.valid) {
  //     setErrorMessages({ ...errorMessages, [e.target.name]: e.target.validationMessage });
  //   } else {
  //     setErrorMessages({ ...errorMessages, [e.target.name]: '' });
  //   }
  // };

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
      onSubmit={handleSubmit}
      buttonText={buttonText}
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
      <button
        type="submit"
        name="profile-save"
        className={`form__button ${isFormNotValid ? 'form__button_disabled' : ''}`}
        disabled={isFormNotValid}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
// const isNotValid = useCallback(() => isErrors.name || isErrors.about, [isErrors.name, isErrors.about]);

// const isNotValid = () => (isErrors.name || isErrors.about);
