import React, { useState, useEffect} from 'react';
import api from '../utils/api';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  //Подписка на контекст, через который получаем данные пользователя
  // (методом api.getUserInfo() в компоненте App)
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  

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

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => console.log(err));
  }, [])
  
  return (
  <main className="main">
    <section className="profile">
      <div className="profile__avatar-container" >
        <img className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}  alt={currentUser.name}/>
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" aria-label="Кнопка редактирования"></button>
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__heading">{currentUser.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования"></button>
        </div>
        <p className="profile__heading-description">{currentUser.about}</p>
      </div>
      <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавить"></button>
    </section>
    <section className="elements">
      <ul className="elements-list">
       {cards.map((card) => { return (<Card key={card._id} {...card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />)})}
      </ul>
    </section>
  </main>
  );
}
  
export default Main;