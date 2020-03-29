import React, { useEffect, useReducer } from 'react';
import { startGame, dealCards } from '../domain/game';

import reducer, { State } from './reducer';
import { ICard } from '../types/ICard';
import Hand from './Hand';
import Table from './Table';

const initialState: State = {
  state: 'SHUFFLING',
  deckId: '',
  remaining: 0,
  table: [],
  human: {
    hand: [],
    taken: [],
  },
  ai: {
    hand: [],
    taken: [],
  },
};

const Game = () => {
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const { state, remaining, deckId, table, human, ai } = gameState;

  useEffect(() => {
    const shuffle = async () => {
      const response = await startGame();

      dispatch({ type: 'SHUFFLING_COMPLETE', payload: response });
    };

    shuffle();
  }, []);

  useEffect(() => {
    const deal = async () => {
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

    if (state === 'DEALING') {
      deal();
    }
  }, [state, remaining, deckId]);

  const playTurn = (card: ICard) => {
    // Check is valid

    dispatch({ type: 'PLAY', payload: { card } });
  };

  if (state === 'SHUFFLING') return <>'Shuffling'</>;

  if (state === 'DEALING') return <>'Dealing'</>;

  return (
    <main className="game">
      <Hand cards={ai.hand} isAi />

      <Table cards={table} />

      <Hand cards={human.hand} onClick={playTurn} />
    </main>
  );
};

export default Game;
