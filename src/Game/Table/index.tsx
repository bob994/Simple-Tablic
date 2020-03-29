import React, { FC } from 'react';
import { ICard } from '../../types/ICard';
import Card from '../../components/Card';

interface Props {
  cards: ICard[];
  selectedCards: ICard[];
  onClick: (card: ICard) => void;
}

const isCardSelected = (selectedCards: ICard[], card: ICard): boolean =>
  Boolean(selectedCards.find(selected => selected.code === card.code));

const Table: FC<Props> = ({ cards, selectedCards, onClick }) => {
  return (
    <section className="table">
      {cards.map(card => (
        <Card
          key={card.code}
          card={card}
          onClick={onClick}
          isSelected={isCardSelected(selectedCards, card)}
        />
      ))}
    </section>
  );
};

export default Table;
