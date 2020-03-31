import { useEffect, Dispatch } from 'react';
import { dealCards } from '../domain/game';
import { Actions } from '../Game/actions';
import { AppState } from '../Game/reducer';

export const useDealer = (
  state: AppState,
  deckId: string,
  remaining: number,
  areOtherTurns: boolean,
  dispatch: Dispatch<Actions>
) => {
  useEffect(() => {
    const dealStartingHand = async () => {
      const table = await dealCards(deckId, 4);
      const human = await dealCards(deckId, 6);
      const ai = await dealCards(deckId, 6);

      dispatch({
        type: 'DEALING_COMPLETE',
        payload: {
          table: table.cards,
          human: human.cards,
          ai: ai.cards,
          remaining: ai.remaining,
        },
      });
    };

    const dealHand = async () => {
      const human = await dealCards(deckId, 6);
      const ai = await dealCards(deckId, 6);

      dispatch({
        type: 'DEALING_COMPLETE',
        payload: {
          human: human.cards,
          ai: ai.cards,
          remaining: ai.remaining,
        },
      });
    };

    const isStartingTurn = state === 'DEALING' && remaining === 52;

    if (isStartingTurn) {
      dealStartingHand();
    } else if (areOtherTurns) {
      dealHand();
    }
  }, [state, deckId, remaining, areOtherTurns, dispatch]);
};
