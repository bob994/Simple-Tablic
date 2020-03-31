import { useEffect, Dispatch } from 'react';
import { startGame } from '../domain/game';
import { Actions } from '../Game/actions';

export const useStartGame = (dispatch: Dispatch<Actions>) => {
  useEffect(() => {
    const shuffle = async () => {
      const response = await startGame();

      dispatch({ type: 'SHUFFLING_COMPLETE', payload: response });
    };

    shuffle();
  }, [dispatch]);
};
