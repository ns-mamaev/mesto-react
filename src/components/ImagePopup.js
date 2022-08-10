function ImagePopup({ card, onClose }) {
  const handleClick = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
      //реализация закрытия по клику на оверлей либо по клику на крестик
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_content_zoomed-card-image${card.link ? ' popup_opened' : ''}`}
      onMouseDown={handleClick}
    >
      <div className="popup__img-wrapper">
        <button aria-label="close popup" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__zoomed-image" src={card.link} alt={card.name} />
        <h3 className="popup__zoomed-image-caption">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
