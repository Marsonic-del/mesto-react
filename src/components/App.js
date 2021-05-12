import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import api from '../utils/Api';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [popupOpen, setIsPopupOpen] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => console.log(err));
  }, [])

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
  function closeAllPopups() {
    setIsPopupOpen('');
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }
  return (
    <div className="App">
      
        <div className="page">
          <Header/>
          <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}/>
          <div className="elements">
            <ul className="elements-list">
              {cards.map((card) => { return (<Card key={card._id} name={card.name} link={card.link} likes={card.likes} />)})}
            </ul>
          </div>      
          <Footer/>

          {isAddPlacePopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="add-card" title="Новое место">
              <input id="place-input" type="text" placeholder="Название" className="popup__input popup__input_type_name" name="name" required minlength="2" maxlength="30"/>
              <span className="popup__error place-input-error"></span>
              <input id="url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error url-input-error"></span>
            </PopupWithForm>}

          {isEditProfilePopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="edit-profile" title="Редактировать&nbsp;профиль">
              <input id="name-input" type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" required minlength="2"  maxlength="40"/>
              <span className="popup__error name-input-error"></span>
              <input id="about-input" type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" required minlength="2" maxlength="200"/>
              <span className="popup__error about-input-error"></span>
            </PopupWithForm>}
            
          {isEditAvatarPopupOpen && <PopupWithForm isOpen={popupOpen} onClose={closeAllPopups} name="avatar" title="Обновить аватар">
              <input id="avatar-url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" required/>
              <span className="popup__error avatar-url-input-error url-input-error url-input-error-avatar"></span>
            </PopupWithForm>}
          
          
        </div>
        
        <template className="element-template">
          
        </template>
      
    </div>
  );
}

export default App;
