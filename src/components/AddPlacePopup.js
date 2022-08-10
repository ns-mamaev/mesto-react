import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({ name: '', link: '' });

  const onChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_content_new-place-name"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
          onChange={onChange}
          value={values.name}
        />
        <span className="form__error form__error_field_place-name"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          className="form__item form__item_content_new-place-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          minLength="7"
          onChange={onChange}
          value={values.link}
        />
        <span className="form__error form__error_field_place-link"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
