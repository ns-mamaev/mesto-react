import useFormWithValidation from 'utills/hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, isErrors, errorMessages, isFormNotValid, onChange } = useFormWithValidation(['name', 'link']);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormNotValid={isFormNotValid}
    >
      <label className="form__field">
        <input
          type="text"
          className={`form__item form__item_content_profile-name ${isErrors?.about ? 'form__item_type_error' : ''} `}
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
          onChange={onChange}
          value={values?.name}
        />
        <span className={`form__error ${isErrors?.name ? 'form__error_visible' : ''}`}>{errorMessages?.name}</span>
      </label>
      <label className="form__field">
        <input
          type="url"
          className={`form__item form__item_content_profile-name ${isErrors?.about ? 'form__item_type_error' : ''} `}
          name="link"
          placeholder="Ссылка на картинку"
          required
          minLength="7"
          onChange={onChange}
          value={values?.link}
        />
        <span className={`form__error ${isErrors?.link ? 'form__error_visible' : ''}`}>{errorMessages?.link}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;