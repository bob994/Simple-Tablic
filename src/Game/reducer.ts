import { ICard } from '../types/ICard';

export interface State {
  state: 'SHUFFLING' | 'DEALING' | 'PLAYERS_TURN';
  deckId: string;
  remaining: number;
  table: ICard[];
  human: {
    hand: ICard[];
    taken: ICard[];
  };
  ai: {
    hand: ICard[];
    taken: ICard[];
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
        table: ICard[];
        human: ICard[];
        ai: ICard[];
        remaining: number;
      };
    }
  | {
      type: 'PLAY';
      payload: {
        card: ICard;
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
        state: 'PLAYERS_TURN',
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
    case 'PLAY':
      return {
        ...state,
        table: [...state.table, ...[action.payload.card]],
        human: {
          ...state.human,
          hand: state.human.hand.filter(
            card => card.code !== action.payload.card.code
          ),
        },
      };
    default:
      return state;
  }
};
