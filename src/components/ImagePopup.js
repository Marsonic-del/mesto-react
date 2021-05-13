import React from 'react';

function ImagePopup ({ name, title, link, onClose, isOpen }) {
    return (
      <section className={`popup popup_type_${name} ${isOpen}`}>
        <div className="popup__container">
          <img className="popup__picture"  alt={title} src={link} />
          <p className="popup__caption">{title}</p>
          <button type="button" className="popup__button-close" aria-label="Закрыть попап" onClick={onClose}></button>
        </div>
      </section>
    )
}

export default ImagePopup;