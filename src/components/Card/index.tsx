import React, { FC } from 'react';
import { ICard } from '../../types/ICard';

interface Props {
  card: ICard;
  onClick?: (card: ICard) => void;
}

const Card: FC<Props> = ({ card, onClick }) => {
  const handleOnClick = () => {
    if (onClick) onClick(card);
  };

  return <img src={card.image} alt={card.code} onClick={handleOnClick} />;
};

export default Card;
