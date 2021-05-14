import React, { useState, useEffect} from 'react';
import api from '../utils/Api';
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onTrashClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
      setUserName (userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    })
    .catch((err) => console.log(err));
  }, [userName, userDescription, userAvatar])
  
  return (
  <main className="main">
    <section className="profile">
      <div className="profile__avatar-container" >
        <img className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}  alt={userName}/>
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" aria-label="Кнопка редактирования"></button>
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__heading">{userName}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования"></button>
        </div>
        <p className="profile__heading-description">{userDescription}</p>
      </div>
      <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавить"></button>
    </section>
    <section className="elements">
      <ul className="elements-list">
       {cards.map((card) => { return (<Card key={card._id} name={card.name} link={card.link} likes={card.likes} onCardClick={onCardClick} onRemoveClick={onTrashClick}  />)})}
      </ul>
    </section>
  </main>
  );
}
  
export default Main;