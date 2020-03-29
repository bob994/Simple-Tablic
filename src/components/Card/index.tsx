import React, { FC } from 'react';
import classnames from 'classnames';
import { ICard } from '../../types/ICard';

interface Props {
  card: ICard;
  isSelected?: boolean;
  onClick?: (card: ICard) => void;
}

const Card: FC<Props> = ({ card, onClick, isSelected = false }) => {
  const className = classnames({
    'is-selected': isSelected,
  });

  const handleOnClick = () => {
    if (onClick) onClick(card);
  };

  return (
    <img
      className={className}
      src={card.image}
      alt={card.code}
      onClick={handleOnClick}
    />
  );
};

export default Card;
