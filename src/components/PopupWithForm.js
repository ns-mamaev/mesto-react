import { useState } from 'react';

function PopupWithForm({ name, defaultButtonText, title, isOpen, onClose, onSubmit, children, isFormNotValid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsloadingError] = useState(false);

  const handleClick = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onSubmit()
      .finally(() => {
        setIsLoading(false);
      })
      .then(onClose)
      .catch((err) => {
        setIsloadingError(true);
        setTimeout(() => {
          setIsloadingError(false);
        }, 1000);
        console.log(`Ошибка запроса к серверу: ${err}`);
      });
  };

  const buttonText = isLoading ? 'Выполнение...' : isLoadingError ? 'Упс, ошибка :(' : defaultButtonText;
  const isButtonDisabled = isLoading || isFormNotValid;
  const buttonClass = `form__button ${isButtonDisabled ? 'form__button_disabled' : ''}`;

  return (
    <div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`} onMouseDown={handleClick}>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button"></button>
        <form className="form form_content_edit-profile" name={name} onSubmit={handleSubmit}>
          <h3 className="form__title">{title}</h3>
          {children}
          <button type="submit" name="profile-save" className={buttonClass} disabled={isButtonDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
