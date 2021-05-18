import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, [])

  function handleCardClick (name, link) {
    setSelectedCard({name, link})
    setImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);  
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true); 
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__button-close')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
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
          <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick} />      
            <Footer/>

            <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="add-card" title="Новое место" buttonName="Сохранить" >
              <input id="place-input" type="text" placeholder="Название" className="popup__input popup__input_type_name" name="name" required minLength="2" maxLength="30"/>
              <span className="popup__error place-input-error"></span>
              <input id="url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error url-input-error"></span>
            </PopupWithForm>

            <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="edit-profile" title="Редактировать&nbsp;профиль" buttonName="Сохранить" >
              <input id="name-input" type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" required minLength="2"  maxLength="40"/>
              <span className="popup__error name-input-error"></span>
              <input id="about-input" type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" required minLength="2" maxLength="200"/>
              <span className="popup__error about-input-error"></span>
            </PopupWithForm>
            
            <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="avatar" title="Обновить аватар" buttonName="Сохранить" >
              <input id="avatar-url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error avatar-url-input-error url-input-error url-input-error-avatar"></span>
            </PopupWithForm>

            <PopupWithForm isOpen={isRemovePopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="remove" title="Вы уверены?" buttonName="Да" >   
            </PopupWithForm>

            <ImagePopup onClose={closeAllPopups} name="image" isOpen={isImagePopupOpen}  handleClickClose={handleClickClose} card={selectedCard} />
          </CurrentUserContext.Provider>
        </div>        
    </div>
  );
}

export default App;
