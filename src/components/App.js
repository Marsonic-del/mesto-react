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
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isRemovePopupOpen, setRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => console.log(err));
  }, [])

  // Функция для добавления/удаления лайков
  // Используется при клике на кнопку лайк карточки
  function handleCardLike({likes, _id}) { // Аргументы функции: лайки и id карточки.
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(_id, isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === _id ? newCard : c));
        console.log(cards)
    });
}
  // Функция для удаления карточки
  // Используется при клике на кнопку удаления карточки
  // Удалять можна только карточки добавленные пользователем 
  function handleCardDelete(idCard) {
    api.removeCard(idCard).then(() => { setCards((cards) => cards.filter(item => {return item._id !== idCard}) )})
  }

  function handleAddPlaceSubmit(newPlace) {
    api.addCard(newPlace)
      .then((newCard) => setCards([...cards, newCard]))
  }
  

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
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />      
            <Footer/>

            

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} handleClickClose={handleClickClose} onAddPlace={handleAddPlaceSubmit} />
            
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
