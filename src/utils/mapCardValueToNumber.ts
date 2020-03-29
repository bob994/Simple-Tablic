export const mapCardValueToNumber = (
  value: string,
  aceIsOne = false
): number => {
  switch (value) {
    case 'KING':
      return 14;
    case 'QUEEN':
      return 13;
    case 'JACK':
      return 12;
    case 'ACE':
      return aceIsOne ? 1 : 11;
    default:
      return Number(value);
  }
};
