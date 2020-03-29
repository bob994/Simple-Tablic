import api from '../services/api';

export const startGame = async () => {
  const { deck_id: deckId, remaining } = await api.shuffleNewDeck();

  return {
    deckId,
    remaining,
  };
};

export const dealCards = async (deckId: string, n: number) => {
  const { success, deck_id, ...rest } = await api.drawCards(deckId, n);

  return rest;
};
