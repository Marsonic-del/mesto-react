import React from 'react';
import trash from '../images/Trash.svg'

function Card({ name, link, likes, onCardClick }) {
  function handleClick() {
    onCardClick(name, link);
  } 
    return (
        <li className="elements-list__item" >
            <article className="element">
              <img className="element__trash"  alt="Корзина" src={trash}/>
              <img className="element__picture" onClick={handleClick} src={link}  alt={name}  />
              <div className="element__description">
                <h2 className="element__name">{name}</h2>
                <div className="element__likes">
                  <button className="element__button-like" type="button" aria-label="Кнопка нравится"></button>
                  <p className="element__likes-number">{likes.length}</p>
                </div>
              </div>
            </article>
          </li>
    )
}

export default Card;