import { ICard } from '../types/ICard';

export interface State {
  state: 'SHUFFLING' | 'DEALING' | 'PLAYERS_TURN' | 'AIS_TURN';
  deckId: string;
  remaining: number;
  table: ICard[];
  selected: ICard[];
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
        table?: ICard[];
        human: ICard[];
        ai: ICard[];
        remaining: number;
      };
    }
  | {
      type: 'PLAY_CARD';
      payload: {
        card: ICard;
      };
    }
  | {
      type: 'SELECT_CARD';
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
        table: action.payload.table
          ? [...action.payload.table]
          : [...state.table],
        human: {
          ...state.human,
          hand: [...action.payload.human],
        },
        ai: {
          ...state.ai,
          hand: [...action.payload.ai],
        },
      };
    case 'PLAY_CARD':
      return {
        ...state,
        state: state.state === 'AIS_TURN' ? 'PLAYERS_TURN' : 'AIS_TURN',
        selected: [],
        table:
          state.selected.length === 0
            ? [...state.table, ...[action.payload.card]]
            : state.table.filter(
                card =>
                  !state.selected.some(selected => selected.code === card.code)
              ),
        human:
          state.state === 'PLAYERS_TURN'
            ? {
                taken:
                  state.selected.length === 0
                    ? [...state.human.taken]
                    : [
                        ...state.human.taken,
                        ...state.selected,
                        action.payload.card,
                      ],
                hand: state.human.hand.filter(
                  card => card.code !== action.payload.card.code
                ),
              }
            : { ...state.human },
        ai:
          state.state === 'AIS_TURN'
            ? {
                taken:
                  state.selected.length === 0
                    ? [...state.ai.taken]
                    : [
                        ...state.ai.taken,
                        ...state.selected,
                        action.payload.card,
                      ],
                hand: state.ai.hand.filter(
                  card => card.code !== action.payload.card.code
                ),
              }
            : { ...state.ai },
      };
    case 'SELECT_CARD':
      return {
        ...state,
        selected: state.selected.find(
          card => card.code === action.payload.card.code
        )
          ? state.selected.filter(
              card => card.code !== action.payload.card.code
            )
          : [...state.selected, action.payload.card],
      };
    default:
      return state;
  }
};
