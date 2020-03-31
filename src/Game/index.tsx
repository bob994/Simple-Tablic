import React, { useReducer, useEffect } from 'react';

import reducer, { initialState } from './reducer';
import { ICard } from '../types/ICard';
import Hand from './Hand';
import Table from './Table';

import { isMoveValid } from '../utils/isMoveValid';
import { useDealer } from '../hooks/useDealer';
import { useAi } from '../hooks/useAi';
import { useStartGame } from '../hooks/useStartGame';

const Game = () => {
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const { state, remaining, deckId, table, selected, human, ai } = gameState;

  const areOtherTurns =
    state === 'PLAYERS_TURN' && human.hand.length === 0 && remaining > 0;
  const isGameOver =
    state === 'PLAYERS_TURN' && human.hand.length === 0 && remaining === 0;

  useStartGame(dispatch);
  useDealer(state, deckId, remaining, areOtherTurns, dispatch);
  useAi(state, ai.hand, table, dispatch);

  useEffect(() => {
    if (isGameOver) {
      console.log('Human', human.taken);
      console.log('Ai', ai.taken);
    }
  }, [isGameOver, human.taken, ai.taken]);

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
