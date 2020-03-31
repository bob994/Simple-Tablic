import { ICard } from '../types/ICard';

export type ShuffllingComplete = {
  type: 'SHUFFLING_COMPLETE';
  payload: { deckId: string; remaining: number };
};

export type DealingComplete = {
  type: 'DEALING_COMPLETE';
  payload: {
    table?: ICard[];
    human: ICard[];
    ai: ICard[];
    remaining: number;
  };
};

export type PlayCard = {
  type: 'PLAY_CARD';
  payload: {
    card: ICard;
  };
};

export type SelectCard = {
  type: 'SELECT_CARD';
  payload: {
    card: ICard;
  };
};

export type Actions =
  | ShuffllingComplete
  | DealingComplete
  | PlayCard
  | SelectCard;
