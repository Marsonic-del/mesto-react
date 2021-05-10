import React from 'react';
import Cousteau from '../images/J.E.Cousteau.jpg'


function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  
  return (
  <main className="main">
    <section className="profile">
      <div className="profile__avatar-container">
        <img className="profile__avatar" src={Cousteau} alt="Жак-Ив Кусто"/>
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" aria-label="Кнопка редактирования"></button>
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__heading">Жак-Ив Кусто</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования"></button>
        </div>
        <p className="profile__heading-description">Исследователь океана</p>
      </div>
      <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавить"></button>
    </section>
    <section className="elements">
      <ul className="elements-list">

     </ul>
    </section>
  </main>
  );
}
  
export default Main;