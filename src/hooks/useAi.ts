import { useEffect, Dispatch } from 'react';
import { AppState } from '../Game/reducer';
import { ICard } from '../types/ICard';
import { playTurn } from '../domain/ai';
import { Actions } from '../Game/actions';

export const useAi = (
  state: AppState,
  hand: ICard[],
  table: ICard[],
  dispatch: Dispatch<Actions>
) => {
  useEffect(() => {
    if (state !== 'AIS_TURN') return;

    const { card, combination } = playTurn(hand, table);

    if (combination.length > 0) {
      combination.forEach(card => {
        dispatch({
          type: 'SELECT_CARD',
          payload: {
            card: card,
          },
        });
      });
    }

    dispatch({
      type: 'PLAY_CARD',
      payload: {
        card: card,
      },
    });
  }, [state, hand, table, dispatch]);
};
