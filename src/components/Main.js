import spinnerImage from '../images/loader.svg';

function Main(props) {
  
  return (
    <main className="content">
      <section className="profile" type="button">
        <button className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img src={spinnerImage} alt="Аватар профиля" className="profile__avatar" />
        </button>  
        <div className="profile__info">
          <h1 className="profile__name">Никита Мамаев</h1>
          <button type="button" className="profile__edit-button" aria-label="edit profile" onClick={props.onEditProfile}></button>
          <p className="profile__about">Путешественник</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="add card" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          <template id="photo-card-template">
            <li className="photo-card">
              <div className="photo-card__caption">
                <h2 className="photo-card__title"></h2>
                <div className="photo-card__likes-wrapper">
                  <button type="button" className="photo-card__like-button" aria-label="like image"></button>
                  <span className="photo-card__likes-counter">0</span>
                </div>  
              </div>
              <img src="#" alt="#" className="photo-card__image" />
              <button type="button" className="photo-card__delete-button" aria-label="delete card"></button>
            </li>
          </template>
        </ul>
      </section>
    </main>
  );
}

export default Main;