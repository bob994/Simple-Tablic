import { ICard } from '../types/ICard';
import { mapCardValueToNumber } from '../utils/mapCardValueToNumber';
import { getBestCombination } from '../utils/getBestCombination';

interface AiTurnReturnType {
  card: ICard;
  combination: ICard[];
}

export const playTurn = (hand: ICard[], table: ICard[]): AiTurnReturnType => {
  const handCards = sortDescCards(hand, false);

  let maxCard: ICard | null = null;
  let maxCombination: ICard[] = [];

  handCards.forEach(handCard => {
    const filteredTable = table.filter(
      table =>
        mapCardValueToNumber(table.value, false) <=
        mapCardValueToNumber(handCard.value, false)
    );

    const tableCardsDesc = sortDescCards(filteredTable, false);

    const combinationDesc = getBestCombination(tableCardsDesc, handCard);

    if (combinationDesc.length > maxCombination.length) {
      maxCard = handCard;
      maxCombination = combinationDesc;
    }

    const tableCardsAsc = sortAscCards(filteredTable);

    const combinationAsc = getBestCombination(tableCardsAsc, handCard);

    if (combinationAsc.length > maxCombination.length) {
      maxCard = handCard;
      maxCombination = combinationAsc;
    }
  });

  if (!maxCard) maxCard = handCards[0];

  return {
    card: maxCard,
    combination: maxCombination,
  };
};

const sortDescCards = (cards: ICard[], aceIsOne = true): ICard[] =>
  cards.sort(
    (a, b) =>
      mapCardValueToNumber(b.value, aceIsOne) -
      mapCardValueToNumber(a.value, aceIsOne)
  );

const sortAscCards = (cards: ICard[], aceIsOne = true): ICard[] =>
  cards.sort(
    (a, b) =>
      mapCardValueToNumber(a.value, aceIsOne) -
      mapCardValueToNumber(b.value, aceIsOne)
  );
