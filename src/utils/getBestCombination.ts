import { ICard } from '../types/ICard';
import { mapCardValueToNumber } from './mapCardValueToNumber';

/* eslint-disable no-loop-func */
export const getBestCombination = (cards: ICard[], target: ICard): ICard[] => {
  let cardsClone = [...cards];
  let result: ICard[] = [];
  let tmp: ICard[] = [];

  for (var i = 0; i < cardsClone.length; i++) {
    const c = cardsClone[i];

    if (isCombinationEqualToTarget(tmp, c, target)) {
      tmp.push(c);
      result = [...result, ...tmp];

      tmp.forEach(t => {
        const ci = cardsClone.findIndex(r => r === t);

        cardsClone.splice(ci, 1);
      });

      tmp = [];
      i = -1;
      continue;
    }

    if (isCombinationLessThanTarget(tmp, c, target)) {
      tmp.push(c);
      continue;
    }

    if (isCombinationGreaterThanTarget(tmp, c, target)) {
      continue;
    }
  }

  return result;
};

const isCombinationLessThanTarget = (
  combination: ICard[],
  nextCard: ICard,
  target: ICard
): boolean => {
  const sumAceIsOne = getSum(combination);
  const sumAceIsEleven = getSum(combination, false);
  const nextCardIsOne = mapCardValueToNumber(nextCard.value);
  const nextCardIsEleven = mapCardValueToNumber(nextCard.value, false);
  const targetIsOne = mapCardValueToNumber(target.value);
  const targetIsEleven = mapCardValueToNumber(target.value, false);

  if (sumAceIsOne + nextCardIsOne < targetIsOne) return true;
  if (sumAceIsOne + nextCardIsEleven < targetIsOne) return true;
  if (sumAceIsOne + nextCardIsOne < targetIsEleven) return true;
  if (sumAceIsOne + nextCardIsEleven < targetIsEleven) return true;

  if (sumAceIsEleven + nextCardIsOne < targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsEleven < targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsOne < targetIsEleven) return true;
  if (sumAceIsEleven + nextCardIsEleven < targetIsEleven) return true;

  return false;
};

const isCombinationGreaterThanTarget = (
  combination: ICard[],
  nextCard: ICard,
  target: ICard
): boolean => {
  const sumAceIsOne = getSum(combination);
  const sumAceIsEleven = getSum(combination, false);
  const nextCardIsOne = mapCardValueToNumber(nextCard.value);
  const nextCardIsEleven = mapCardValueToNumber(nextCard.value, false);
  const targetIsOne = mapCardValueToNumber(target.value);
  const targetIsEleven = mapCardValueToNumber(target.value, false);

  if (sumAceIsOne + nextCardIsOne > targetIsOne) return true;
  if (sumAceIsOne + nextCardIsEleven > targetIsOne) return true;
  if (sumAceIsOne + nextCardIsOne > targetIsEleven) return true;
  if (sumAceIsOne + nextCardIsEleven > targetIsEleven) return true;

  if (sumAceIsEleven + nextCardIsOne > targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsEleven > targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsOne > targetIsEleven) return true;
  if (sumAceIsEleven + nextCardIsEleven > targetIsEleven) return true;

  return false;
};

const isCombinationEqualToTarget = (
  combination: ICard[],
  nextCard: ICard,
  target: ICard
): boolean => {
  const sumAceIsOne = getSum(combination);
  const sumAceIsEleven = getSum(combination, false);
  const nextCardIsOne = mapCardValueToNumber(nextCard.value);
  const nextCardIsEleven = mapCardValueToNumber(nextCard.value, false);
  const targetIsOne = mapCardValueToNumber(target.value);
  const targetIsEleven = mapCardValueToNumber(target.value, false);

  if (sumAceIsOne + nextCardIsOne === targetIsOne) return true;
  if (sumAceIsOne + nextCardIsEleven === targetIsOne) return true;
  if (sumAceIsOne + nextCardIsOne === targetIsEleven) return true;
  if (sumAceIsOne + nextCardIsEleven === targetIsEleven) return true;

  if (sumAceIsEleven + nextCardIsOne === targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsEleven === targetIsOne) return true;
  if (sumAceIsEleven + nextCardIsOne === targetIsEleven) return true;
  if (sumAceIsEleven + nextCardIsEleven === targetIsEleven) return true;

  return false;
};

const getSum = (array: ICard[], aceIsOne = true): number =>
  array.reduce(
    (prev, curr) => (prev += mapCardValueToNumber(curr.value, aceIsOne)),
    0
  );
