import React from 'react';

function ImagePopup ({ name, onClose, isOpen, card }) {
    return (
      <section className={`popup popup_type_${name} ${isOpen}`} onClick={onClose}>
        <div className="popup__container">
          <img className="popup__picture"  alt={card.name} src={card.link} />
          <p className="popup__caption">{card.name}</p>
          <button type="button" className="popup__button-close" aria-label="Закрыть попап" onClick={onClose}></button>
        </div>
      </section>
    )
}

export default ImagePopup;