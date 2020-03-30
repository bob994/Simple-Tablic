import { ICard } from '../types/ICard';
import { mapCardValueToNumber } from '../utils/mapCardValueToNumber';
import { aiTurn } from '../utils/aiTurn';
import { mapNumberToCardValue } from '../utils/mapNumberToCardValue';

interface AiTurnReturnType {
  card: ICard;
  combination: ICard[];
}

export const playTurn = (hand: ICard[], table: ICard[]): AiTurnReturnType => {
  const handCards = mapAndSortDescCards(hand);

  let maxCard = 0;
  let maxCombination: number[] = [];

  handCards.forEach(handCard => {
    const tableCards = mapAndSortDescCards(table).filter(
      card => card <= handCard
    );

    const combination = aiTurn(tableCards, handCard);

    if (combination.length > maxCombination.length) {
      maxCard = handCard;
      maxCombination = combination;
    }
  });

  return {
    card: mapNumberToCardValue(maxCard),
    combination: maxCombination.map(c => mapNumberToCardValue(c)),
  };
};

const mapAndSortDescCards = (cards: ICard[]): number[] =>
  cards
    .map(card => mapCardValueToNumber(card.value, false))
    .sort((a, b) => b - a);
