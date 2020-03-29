import React, { FC } from 'react';
import classnames from 'classnames';

import { ICard } from '../../types/ICard';
import Card from '../../components/Card';

interface Props {
  cards: ICard[];
  isAi?: boolean;
  onClick?: (card: ICard) => void;
}

const Hand: FC<Props> = ({ cards, onClick, isAi = false }) => {
  const className = classnames([
    'player',
    {
      'is-ai': isAi,
    },
    {
      'is-human': !isAi,
    },
  ]);

  return (
    <section className={className}>
      {cards.map(card => (
        <Card card={card} onClick={onClick} key={card.code} />
      ))}
    </section>
  );
};

export default Hand;
