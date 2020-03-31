import { ICard } from '../types/ICard';
import { Actions, PlayCard, SelectCard, DealingComplete } from './actions';

export type AppState = 'SHUFFLING' | 'DEALING' | 'PLAYERS_TURN' | 'AIS_TURN';

interface Taken {
  playerCard: string;
  selectedCards: string[];
}

interface State {
  state: AppState;
  deckId: string;
  remaining: number;
  table: ICard[];
  selected: ICard[];
  human: {
    hand: ICard[];
    taken: Taken[];
  };
  ai: {
    hand: ICard[];
    taken: Taken[];
  };
}

export const initialState: State = {
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

const deal = (state: State, action: DealingComplete): State => ({
  ...state,
  state: 'PLAYERS_TURN',
  remaining: action.payload.remaining,
  table: action.payload.table ? [...action.payload.table] : [...state.table],
  human: {
    ...state.human,
    hand: [...action.payload.human],
  },
  ai: {
    ...state.ai,
    hand: [...action.payload.ai],
  },
});

const playCard = (state: State, action: PlayCard): State => {
  const isPlayersTurn = state.state === 'PLAYERS_TURN';

  const editTable = () => {
    if (state.selected.length === 0) {
      return [...state.table, action.payload.card];
    }

    return state.table.filter(
      c => !state.selected.some(s => s.code === c.code)
    );
  };

  const editHand = (player: 'human' | 'ai', isPlayersTurn: boolean) => {
    if (isPlayersTurn && player === 'ai') return { ...state.ai };
    if (!isPlayersTurn && player === 'human') return { ...state.human };

    const taken = () => {
      if (state.selected.length === 0) {
        return [...state[player].taken];
      }

      return [
        ...state[player].taken,
        {
          playerCard: action.payload.card.value,
          selectedCards: [...state.selected.map(s => s.value)],
        },
      ];
    };

    return {
      taken: taken(),
      hand: state[player].hand.filter(c => c.code !== action.payload.card.code),
    };
  };

  return {
    ...state,
    state: isPlayersTurn ? 'AIS_TURN' : 'PLAYERS_TURN',
    selected: [],
    table: editTable(),
    human: editHand('human', isPlayersTurn),
    ai: editHand('ai', isPlayersTurn),
  };
};

const selectCard = (state: State, action: SelectCard): State => {
  const isSelected = state.selected.find(
    c => c.code === action.payload.card.code
  );

  return {
    ...state,
    selected: isSelected
      ? state.selected.filter(c => c.code !== action.payload.card.code)
      : [...state.selected, action.payload.card],
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
      return deal(state, action);
    case 'PLAY_CARD':
      return playCard(state, action);
    case 'SELECT_CARD':
      return selectCard(state, action);
    default:
      return state;
  }
};
