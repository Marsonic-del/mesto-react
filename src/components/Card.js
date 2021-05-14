import React from 'react';
import trash from '../images/Trash.svg'

function Card(props) {
  function handleClick() {
    props.onCardClick(props.name, props.link);
  } 
    return (
        <li className="elements-list__item" >
            <article className="element">
              <img className="element__trash" onClick={props.onRemoveClick}  alt="Корзина" src={trash}/>
              <img className="element__picture" onClick={handleClick} src={props.link}  alt={props.name}  />
              <div className="element__description">
                <h2 className="element__name">{props.name}</h2>
                <div className="element__likes">
                  <button className="element__button-like" type="button" aria-label="Кнопка нравится"></button>
                  <p className="element__likes-number">{props.likes.length}</p>
                </div>
              </div>
            </article>
          </li>
    )
}

export default Card;