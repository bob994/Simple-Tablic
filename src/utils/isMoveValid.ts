import { ICard } from '../types/ICard';
import { mapCardValueToNumber } from './mapCardValueToNumber';

const isCardEqualToSum = (
  playedCard: string,
  selectedCards: string[]
): boolean => {
  const cardValueAceIsOne = mapCardValueToNumber(playedCard, true);
  const cardValueAceIsEleven = mapCardValueToNumber(playedCard, false);

  const selectedAceAsOne = selectedCards.map(selected =>
    mapCardValueToNumber(selected, true)
  );
  const sumAceAsOne = selectedAceAsOne.reduce(
    (prev, curr) => (prev += curr),
    0
  );

  if (
    sumAceAsOne % cardValueAceIsOne === 0 ||
    sumAceAsOne % cardValueAceIsEleven === 0
  )
    return true;

  const selectedAceIsEleven = selectedCards.map(selected =>
    mapCardValueToNumber(selected, false)
  );

  const sumAceAsEleven = selectedAceIsEleven.reduce(
    (prev, curr) => (prev += curr),
    0
  );

  if (
    sumAceAsEleven % cardValueAceIsOne === 0 ||
    sumAceAsEleven % cardValueAceIsEleven === 0
  )
    return true;

  return false;
};

export const isMoveValid = (
  playedCard: ICard,
  selectedCards: ICard[]
): boolean => {
  if (selectedCards.length === 0) return true;

  const selected = selectedCards.map(s => s.value);
  const played = playedCard.value;

  if (isCardEqualToSum(played, selected)) return true;

  if (selected.some(selected => selected !== played)) {
    const filtered = selected.filter(selected => selected !== played);

    if (isCardEqualToSum(played, filtered)) return true;

    return false;
  }

  return true;
};
