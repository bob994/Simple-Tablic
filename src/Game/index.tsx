import React, { useEffect, useReducer } from 'react';
import { startGame, dealCards } from '../domain/game';

import reducer, { State } from './reducer';

const initialState: State = {
  state: 'SHUFFLING',
  deckId: '',
  remaining: 0,
  table: [],
  player1: {
    hand: [],
    taken: [],
  },
  player2: {
    hand: [],
    taken: [],
  },
};

const Game = () => {
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const { state, remaining, deckId, table, player1, player2 } = gameState;

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
      const player1 = await dealCards(deckId, 6);
      const player2 = await dealCards(deckId, 6);

      dispatch({
        type: 'DEALING_COMPLETE',
        payload: {
          table: table.cards,
          player1: player1.cards,
          player2: player2.cards,
          remaining: player2.remaining,
        },
      });
    };

    if (state === 'DEALING') {
      deal();
    }
  }, [state, remaining, deckId]);

  if (state === 'SHUFFLING') return <>'Shuffling'</>;

  if (state === 'DEALING') return <>'Dealing'</>;

  return (
    <main className="game">
      <section className="player">
        {player1.hand.map(card => (
          <div key={card.code}>{card.code}</div>
        ))}
      </section>
      <section className="table">
        {table.map(card => (
          <div key={card.code}>{card.code}</div>
        ))}
      </section>
      <section className="player">
        {player2.hand.map(card => (
          <div key={card.code}>{card.code}</div>
        ))}
      </section>
    </main>
  );
};

export default Game;
