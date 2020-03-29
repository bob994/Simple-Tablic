import { Card } from '../types/Card';

export interface State {
  state: 'SHUFFLING' | 'DEALING' | 'READY';
  deckId: string;
  remaining: number;
  table: Card[];
  human: {
    hand: Card[];
    taken: Card[];
  };
  ai: {
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
        human: Card[];
        ai: Card[];
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
        human: {
          ...state.human,
          hand: [...action.payload.human],
        },
        ai: {
          ...state.ai,
          hand: [...action.payload.ai],
        },
      };
    default:
      return state;
  }
};
