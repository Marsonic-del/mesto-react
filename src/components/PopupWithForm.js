import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children}) {
    return(
        <section className={`popup popup_type_${name} ${isOpen}`}>
           <form className="popup__form" name={name} noValidate>
              <button type="button" className="popup__button-close" onClick={onClose} aria-label="Закрыть попап"></button>
              <h3 className="popup__heading">{title}</h3>
              {children}
              <button type="submit" className="popup__button" arialabel="Сохранить">
              Сохранить
              </button>
            </form>
        </section>
    )
}
export default PopupWithForm