export const mapNumberToCardValue = (value: number): string => {
  switch (value) {
    case 14:
      return 'king';
    case 13:
      return 'QUEEN';
    case 12:
      return 'JACK';
    case 11:
    case 1:
      return 'ACE';
    default:
      return value.toString();
  }
};
