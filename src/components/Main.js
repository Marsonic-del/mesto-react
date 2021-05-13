import React, { useState, useEffect } from 'react';
import api from '../utils/Api';


function Main({onEditProfile, onAddPlace, onEditAvatar}) {
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
      <div className="profile__avatar-container" style={{ backgroundImage: `url(${userAvatar})` }}>
        <img className="profile__avatar"  alt={userName}/>
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" ariaLabel="Кнопка редактирования"></button>
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
  </main>
  );
}
  
export default Main;