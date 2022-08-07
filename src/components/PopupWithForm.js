function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children
}) {

  return (<div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`}>
    <div className="popup__container">
      <button aria-label="закрыть" className="popup__close-button" onClick={onClose}></button>
      <form
        className="form form_content_edit-profile"
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        <h3 className="form__title">{title}</h3>
        {children}
        <button type="submit" name="profile-save" className="form__button">{buttonText || 'Сохранить'}</button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;