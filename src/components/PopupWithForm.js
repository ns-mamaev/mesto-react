function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
  const handleClick = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      onClose();
    }
  };

  return (
    <div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`} onMouseDown={handleClick}>
      <div className="popup__container">
        <button aria-label="закрыть" className="popup__close-button"></button>
        <form className="form form_content_edit-profile" name={name} onSubmit={onSubmit}>
          <h3 className="form__title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
