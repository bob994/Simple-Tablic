import React, { useEffect, useReducer } from 'react';
import { startGame, dealCards } from '../domain/game';

import reducer, { State } from './reducer';
import { ICard } from '../types/ICard';
import Hand from './Hand';
import Table from './Table';

import { isMoveValid } from '../utils/isMoveValid';

const initialState: State = {
  state: 'SHUFFLING',
  deckId: '',
  remaining: 0,
  table: [],
  selected: [],
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
  const { state, remaining, deckId, table, selected, human, ai } = gameState;

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

  const playCard = (card: ICard) => {
    if (isMoveValid(selected, card))
      dispatch({ type: 'PLAY_CARD', payload: { card } });
  };

  const selectCard = (card: ICard) => {
    dispatch({ type: 'SELECT_CARD', payload: { card } });
  };

  if (state === 'SHUFFLING') return <>'Shuffling'</>;

  if (state === 'DEALING') return <>'Dealing'</>;

  return (
    <main className="game">
      <Hand cards={ai.hand} isAi />

      <Table cards={table} selectedCards={selected} onClick={selectCard} />

      <Hand cards={human.hand} onClick={playCard} />
    </main>
  );
};

export default Game;
