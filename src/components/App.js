import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  console.log(Math.random())

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, [])

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar)
      .then(data => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }

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

            
            
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} handleClickClose={handleClickClose} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} handleClickClose={handleClickClose} />
            

            <PopupWithForm isOpen={isRemovePopupOpen} onClose={closeAllPopups}  handleClickClose={handleClickClose} name="remove" title="Вы уверены?" buttonName="Да" >   
            </PopupWithForm>

            <ImagePopup onClose={closeAllPopups} name="image" isOpen={isImagePopupOpen}  handleClickClose={handleClickClose} card={selectedCard} />
          </CurrentUserContext.Provider>
        </div>        
    </div>
  );
}

export default App;
