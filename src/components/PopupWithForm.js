function PopupWithForm({ name, title, isOpen, onClose, onSubmit, buttonText, children, isValid }) {
  const handleClick = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      onClose();
    }
  };

  return (
    <div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`} onClick={handleClick}>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button"></button>
        <form className="form form_content_edit-profile" name={name} onSubmit={onSubmit}>
          <h3 className="form__title">{title}</h3>
          {children}
          <button
            type="submit"
            name="profile-save"
            className={`form__button${!isValid ? ' form__button_disabled' : ''}`}
            disabled={!isValid}
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
