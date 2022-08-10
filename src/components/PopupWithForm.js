function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
  isValid
}) {

  return (<div className={`popup popup_content_${name}${isOpen ? ' popup_opened' : ''}`}>
    <div className="popup__container">
      <button aria-label="закрыть" className="popup__close-button" onClick={onClose}></button>
      <form
        className="form form_content_edit-profile"
        name={name}
        onSubmit={onSubmit}
      >
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