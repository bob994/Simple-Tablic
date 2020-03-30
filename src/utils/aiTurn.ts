/* eslint-disable no-loop-func */
export const aiTurn = (cards: number[], card: number): number[] => {
  let cardsClone = [...cards];
  let result: number[] = [];
  let tmp: number[] = [];

  for (let i = 0; i < cardsClone.length; i++) {
    const c = cardsClone[i];

    const tmpSum = getSum(tmp);

    if (tmpSum + c < card) {
      tmp.push(c);
    }

    if (tmpSum + c > card) {
      continue;
    }

    if (tmpSum + c === card) {
      tmp.push(c);
      result = [...result, ...tmp];

      tmp.forEach(t => {
        const ri = result.findIndex(r => r === t);

        cardsClone.splice(ri, 1);
      });

      tmp = [];
      i = 0;
    }
  }

  return result;
};

const getSum = (array: number[]): number =>
  array.reduce((prev, curr) => (prev += curr), 0);
