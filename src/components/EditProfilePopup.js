import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, handleClickClose}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const handleNameChange = (e) => {setName(e.target.value)}
    const handleDescriptionChange = (e) => {setDescription(e.target.value)}
    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
  });
    }
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}  handleClickClose={handleClickClose} name="edit-profile" title="Редактировать&nbsp;профиль" buttonName="Сохранить" >
              <input id="name-input" value={name} onChange={handleNameChange} type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" required minLength="2"  maxLength="40"/>
              <span className="popup__error name-input-error"></span>
              <input id="about-input"  value={description} onChange={handleDescriptionChange} type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" required minLength="2" maxLength="200"/>
              <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup