import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, buttonName, handleClickClose, onSubmit, children}) {


    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
          document.removeEventListener("keydown", handleEscapeClose);
        };
      }, [isOpen, onClose]);

    return(
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"} `} onClick={handleClickClose} >
           <form className="popup__form" onSubmit={onSubmit} name={name} noValidate>
              <button type="button" className="popup__button-close" onClick={onClose} aria-label="Закрыть попап"></button>
              <h3 className="popup__heading">{title}</h3>
              {children}
              <button type="submit" className="popup__button" onClick={onClose} aria-label={buttonName}>
              {buttonName}
              </button>
            </form>
        </section>
    )
}
export default PopupWithForm