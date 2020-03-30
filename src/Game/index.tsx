import React, { useEffect, useReducer } from 'react';
import { startGame, dealCards } from '../domain/game';

import reducer, { State } from './reducer';
import { ICard } from '../types/ICard';
import Hand from './Hand';
import Table from './Table';

import { isMoveValid } from '../utils/isMoveValid';
import { mapCardValueToNumber } from '../utils/mapCardValueToNumber';
import { aiTurn } from '../utils/aiTurn';
import { playTurn } from '../domain/ai';

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
      let table:
        | {
            cards: ICard[];
            remaining: number;
          }
        | undefined;

      if (remaining === 52) {
        table = await dealCards(deckId, 4);
      }

      const human = await dealCards(deckId, 6);
      const ai = await dealCards(deckId, 6);

      dispatch({
        type: 'DEALING_COMPLETE',
        payload: {
          table: table?.cards,
          human: human.cards,
          ai: ai.cards,
          remaining: ai.remaining,
        },
      });
    };

    if (
      state === 'DEALING' ||
      (state === 'PLAYERS_TURN' && human.hand.length === 0 && remaining > 0)
    ) {
      deal();
    }
  }, [state, remaining, deckId, human.hand]);

  useEffect(() => {
    if (state === 'AIS_TURN') {
      const response = playTurn(ai.hand, table);

      const sortedValues = ai.hand
        .map(card => mapCardValueToNumber(card.value, false))
        .sort((a, b) => b - a);

      let maxCard: number = 0;
      let maxCombination: number[] = [];

      sortedValues.forEach(x => {
        const sortedTableValues = table
          .map(card => mapCardValueToNumber(card.value, false))
          .sort((a, b) => b - a)
          .filter(card => card <= x);

        const combo = aiTurn(sortedTableValues, x);

        if (combo.length > maxCombination.length) {
          maxCombination = [...combo];
          maxCard = x;
        }
      });

      if (maxCombination.length > 0) {
        maxCombination.forEach(card => {
          dispatch({
            type: 'SELECT_CARD',
            payload: {
              card: table.find(c => mapCardValueToNumber(c.value) === card)!,
            },
          });
        });

        dispatch({
          type: 'PLAY_CARD',
          payload: {
            card: ai.hand.find(c => mapCardValueToNumber(c.value) === maxCard)!,
          },
        });
      } else {
        dispatch({
          type: 'PLAY_CARD',
          payload: {
            card: ai.hand.find(
              c => mapCardValueToNumber(c.value) === sortedValues[0]
            )!,
          },
        });
      }
    }
  }, [state, ai.hand, table]);

  const playCard = (card: ICard) => {
    if (state !== 'PLAYERS_TURN') return;

    if (isMoveValid(card, selected))
      dispatch({ type: 'PLAY_CARD', payload: { card } });
  };

  const selectCard = (card: ICard) => {
    if (state !== 'PLAYERS_TURN') return;

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
