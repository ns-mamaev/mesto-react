import { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // не использую валидацию, т.к. по заданию нужен неуправляемый компонент с рефом
  const avatarRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsloadingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
      .finally(() => {
        setIsLoading(false);
      })
      .then(onClose)
      .catch((err) => {
        setIsloadingError(true);
        setTimeout(() => {
          setIsloadingError(false);
        }, 2000);
        console.log(`Невозможно обновить данные пользователя: ${err}`);
      });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultButtonText="Сохранить"
      isLoading={isLoading}
      isLoadingError={isLoadingError}
    >
      <label className="form__field">
        <input
          type="url"
          className="form__item form__item_content_avatar-link"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          minLength="7"
          ref={avatarRef}
        />
        <span className="form__error form__error_field_avatar-link"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
