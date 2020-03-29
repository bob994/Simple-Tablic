import { Card } from '../types/Card';

export interface State {
  state: 'SHUFFLING' | 'DEALING' | 'READY';
  deckId: string;
  remaining: number;
  table: Card[];
  player1: {
    hand: Card[];
    taken: Card[];
  };
  player2: {
    hand: Card[];
    taken: Card[];
  };
}

type Actions =
  | {
      type: 'SHUFFLING_COMPLETE';
      payload: { deckId: string; remaining: number };
    }
  | {
      type: 'DEALING_COMPLETE';
      payload: {
        table: Card[];
        player1: Card[];
        player2: Card[];
        remaining: number;
      };
    };

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SHUFFLING_COMPLETE':
      return {
        ...state,
        state: 'DEALING',
        deckId: action.payload.deckId,
        remaining: action.payload.remaining,
      };
    case 'DEALING_COMPLETE':
      return {
        ...state,
        state: 'READY',
        remaining: action.payload.remaining,
        table: [...action.payload.table],
        player1: {
          ...state.player1,
          hand: [...action.payload.player1],
        },
        player2: {
          ...state.player2,
          hand: [...action.payload.player2],
        },
      };
    default:
      return state;
  }
};
