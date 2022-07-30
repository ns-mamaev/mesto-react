function PopupWithForm(props) {

  return (<div className={`popup popup_content_${props.name}${props.isOpen? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="close popup" className="popup__close-button"></button>
        <form className="form form_content_edit-profile" name={props.name} noValidate>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button type="submit" name="profile-save" className="form__button">{props.buttonText || 'Сохранить'}</button>
        </form>
      </div>
    </div>
    );
}

export default PopupWithForm;