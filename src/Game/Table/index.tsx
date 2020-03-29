import React, { FC } from 'react';
import { ICard } from '../../types/ICard';
import Card from '../../components/Card';

interface Props {
  cards: ICard[];
}

const Table: FC<Props> = ({ cards }) => {
  return (
    <section className="table">
      {cards.map(card => (
        <Card key={card.code} card={card} />
      ))}
    </section>
  );
};

export default Table;
