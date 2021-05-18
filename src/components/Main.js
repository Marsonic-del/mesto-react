import React, { useState, useEffect} from 'react';
import api from '../utils/api';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

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
       {cards.map((card) => { return (<Card key={card._id} {...card} onCardClick={onCardClick} />)})}
      </ul>
    </section>
  </main>
  );
}
  
export default Main;