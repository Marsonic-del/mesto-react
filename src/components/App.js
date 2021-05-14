import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setRemovePopupOpen] = useState(false);
  const [popupOpen, setIsPopupOpen] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    function closePopupsByEscape(e) {
      if(e.key === "Escape") {
        closeAllPopups()
      }
    }
    document.addEventListener("keydown", closePopupsByEscape)

    return () => {
      document.removeEventListener("keydown", closePopupsByEscape)
    }
  }, [])

  function handleCardClick (name, link) {
    setSelectedCard({name, link})
    setImagePopupOpen(true);
    setIsPopupOpen
    ('popup_opened');
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setIsPopupOpen
    ('popup_opened');
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setIsPopupOpen('popup_opened');
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    setIsPopupOpen('popup_opened');
  }

  function handleTrashButtonClick() {
    setRemovePopupOpen(true);
    setIsPopupOpen('popup_opened');
  }

  function closeAllPopups() {
    setIsPopupOpen('');
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setRemovePopupOpen(false);
    setSelectedCard({});
  }
  return (
    <div className="App">
      
        <div className="page">
          <Header/>
          <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onTrashClick={handleTrashButtonClick}
                cards={cards} />      
          <Footer/>

          {isAddPlacePopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="add-card" title="Новое место" buttonName="Сохранить" >
              <input id="place-input" type="text" placeholder="Название" className="popup__input popup__input_type_name" name="name" required minLength="2" maxLength="30"/>
              <span className="popup__error place-input-error"></span>
              <input id="url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error url-input-error"></span>
            </PopupWithForm>}

          {isEditProfilePopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="edit-profile" title="Редактировать&nbsp;профиль" buttonName="Сохранить" >
              <input id="name-input" type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" required minLength="2"  maxLength="40"/>
              <span className="popup__error name-input-error"></span>
              <input id="about-input" type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" required minLength="2" maxLength="200"/>
              <span className="popup__error about-input-error"></span>
            </PopupWithForm>}
            
          {isEditAvatarPopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="avatar" title="Обновить аватар" buttonName="Сохранить" >
              <input id="avatar-url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error avatar-url-input-error url-input-error url-input-error-avatar"></span>
            </PopupWithForm>}

          {isRemovePopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="remove" title="Вы уверены?" buttonName="Да" >   
            </PopupWithForm>}

          {isImagePopupOpen && <ImagePopup onClose={closeAllPopups} name="image" isOpen={popupOpen} card={selectedCard} />}
        </div>        
    </div>
  );
}

export default App;
